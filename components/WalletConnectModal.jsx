import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
    Button,
    Actionsheet,
    useDisclose,
    Text,
    Box,
    Center,
    NativeBaseProvider,
} from 'native-base';
import logo from '../assets/images/usdt.png';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import '@walletconnect/react-native-compat';
import { Core } from '@walletconnect/core';
import { Web3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet'
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';

function WalletConnectModal({ OpenDetail, detailOpen, sessionData , clearSession }) {
    const { theme } = useContext(ThemeContext);
    const { isOpen, onOpen, onClose } = useDisclose();
    const {
        wc,
        wallet,
        setWeb3Wallet,
        Session,
        saveSession,
        selectedAccount,
        setSelectedAccount,
        Accounts,
        addAccount,
        Networks,
        selectedNetwork
    } = useAuth();
    const modalApproved = async () => {
        wallet.on('call_request', async (error, payload) => {
            if (error) {
              console.error(error);
              return;
            }
            
            if (sessionData?.params?.request?.method === 'eth_sendTransaction') {
                try {
                let txHash = '0x1e9f9fe31e5274b0781ebdbe87b63c9d65b497013309ebd09ecf94eb236cde8d'
                const approveRequest = await wallet.approveRequest({
                    id: sessionData?.id,
                    result: txHash,
                })
                console.log(approveRequest);
              } catch (error) {
                console.error('Error handling eth_sendTransaction:', error);
              }
            }
          });
 
        //   OpenDetail(false)
        //   clearSession()
            
    }

    const modalReject = async () => {
        wallet.on('call_request', async (error, payload) => {
            if (error) {
              console.error(error);
              return;
            }
          
            if (sessionData?.params?.request?.method === 'eth_sendTransaction') {
              try {
                const rejection = await wallet.rejectRequest({
                  id: sessionData?.id,
                  error: { message: 'User rejected the transaction' },
                });
                console.log(rejection);
              } catch (error) {
                console.error('Error handling eth_sendTransaction:', error);
              }
            }
          });
          
            // OpenDetail(false)
            // clearSession()
       
    }

    useEffect(() => {
        console.log("TO", sessionData?.params?.request?.params[0]?.to)
        console.log("GAS", sessionData?.params?.request?.params[0]?.gas)
        console.log("VALUE", sessionData?.params?.request?.params[0]?.value)
        console.log("DATA", sessionData?.params?.request?.params[0]?.data)
        console.log("METHOD", sessionData?.params?.request?.method)
        console.log("Chain ID", sessionData?.params?.chainId)
        console.log("ID", sessionData?.id)
        console.log("Topic", sessionData?.topic)
        console.log("origin", sessionData?.verifyContext?.verified?.origin)
        console.log("verifyUrl", sessionData?.verifyContext?.verified?.verifyUrl)
        // console.log("verifyContext", sessionData?.verifyContext)


    }, [sessionData])

    return (
        <>
            {/* <Button onPress={onOpen} shadow={2}>
            Actionsheet
        </Button> */}
            <Actionsheet isOpen={detailOpen} onClose={() => OpenDetail(false)}>
                <Actionsheet.Content style={{ backgroundColor: theme.customizeBG }}>
                    <Box w="100%" h={320} px={4} justifyContent="center">
                        {/* <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
                            Transaction Detail
                        </Text> */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginVertical: 15,
                            }}>
                            <View style={styles.left}>
                                {/* <Image source={logo} /> */}
                                <View>
                                    <Text style={[styles.token, { color: theme.text }]}>Method</Text>
                                    <Text style={[styles.name, { color: theme.text }]}>
                                        {sessionData?.params?.request?.method}
                                    </Text>
                                </View>
                            </View>
                            {/*  */}
                            <View>
                                <View style={[styles.right, { color: theme.text }]}>
                                    <Text
                                        style={[
                                            styles.amount,
                                            { color: theme.text },
                                            styles.amountRed,
                                            { color: theme.amountRed },
                                        ]}>
                                      {sessionData?.params?.request?.params[0]?.value}
                                    </Text>
                                    {/* <Text style={[styles.amount, { color: theme.text }]}>
                                        {' '}
                                        USDT
                                    </Text> */}
                                </View>
                                {/* <Text style={[styles.BTCamount, { color: theme.text }]}>
                                    0.000000986 BTC
                                </Text> */}
                            </View>
                            {/*  */}
                        </View>
                        <View style={styles.line}>
                            <View style={styles.statusContainer}>
                                <Text style={{ color: theme.text }}>Network:</Text>
                                <View
                                    style={[
                                        styles.statusRed,
                                        { backgroundColor: theme.statusRed },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.statusTextRed,
                                            { color: theme.statusTextRed },
                                        ]}>
                                     { sessionData?.params?.chainId}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dateContainer}>
                                {/* <Text style={{ color: theme.text }}>Dapp:</Text> */}
                                <Text style={{ color: theme.text }}> {sessionData?.verifyContext?.verified?.origin}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: theme.wordBorder,
                                borderBottomWidth: 2,
                                marginVertical: 10,
                            }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingRight: 40 }}>
                            <Text style={[styles.senderLabel, { color: theme.text }]}>To:</Text>
                            <Text style={[styles.senderAddress, { color: theme.text }]}>
                                { sessionData?.params?.request?.params[0]?.to}
                            </Text>
                        </View>
                        <View style={styles.feeMainFlex}>
                            <View style={styles.feeSubFlex}>
                                <Text style={[styles.senderLabel, { color: theme.text }]}>Fee:</Text>
                                <Text style={[styles.senderAddress, { color: theme.text }]}>
                                    {sessionData?.params?.request?.params[0]?.gas}
                                </Text>
                            </View>
                            <View style={styles.feeSubFlex}>
                                {/* <Text style={[styles.senderLabel, { color: theme.text }]}>Fee:</Text> */}
                                <Text style={[styles.senderAddress, { color: theme.text }]}>
                                    {sessionData?.verifyContext?.verified?.verifyUrl}
                                </Text>
                            </View>
                        </View>
                            <Text style={[styles.senderLabel, { color: theme.text }]}>Data:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={[styles.senderAddress, { color: theme.text , width:380 , height :40}]}>
                                {sessionData?.params?.request?.params[0]?.data}
                            </Text>
                        </View>
                        <View style={styles.btnWrapperFlex}>
                            <TouchableOpacity
                                onPress={() => modalReject()}
                                style={[styles.btnWrpper, { backgroundColor: theme.emphasis }]}>
                                <Text style={styles.btnText}>Reject</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => modalApproved()}
                                style={[
                                    styles.btnWrpperNext,
                                    {
                                        borderColor: theme.emphasis,
                                        backgroundColor: theme.emphasis,
                                    },
                                ]}>
                                <Text style={styles.btnText}>
                                    Approved
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

export default WalletConnectModal;

const styles = StyleSheet.create({
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        justifyContent: 'center',
    },
    token: {
        // color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    name: {
        // color: '#FFF',
        fontFamily: 'Inter',
    },
    right: {
        // color: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
    },
    amount: {
        // color: '#fff',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    amountRed: {
        // color: '#FF2238',
    },
    BTCamount: {
        // color: '#FFF',
        fontFamily: 'Inter',
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusRed: {
        borderRadius: 4,
        // backgroundColor: '#26161B',
        borderWidth: 1,
        padding: 2,
        paddingHorizontal: 4,
    },
    statusTextRed: {
        // color: '#FC3044',
        fontFamily: 'SF Pro Text',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: 8,
    },
    senderLabel: {
        // color: '#937F96',
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'capitalize',
    },
    senderAddress: {
        // color: '#FFF',
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    feeMainFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    feeSubFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    btnWrapperFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginVertical: 15,
    },
    btnWrpper: {
        padding: 12,
        borderRadius: 100,
        borderWidth: 1,
        // borderColor: '#F43459',
        flex: 1,
    },
    btnWrpperNext: {
        padding: 12,
        borderRadius: 100,
        borderWidth: 1,
        // borderColor: '#F43459',
        flex: 1,
        // backgroundColor: '#F43459',
    },
    btnText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});
