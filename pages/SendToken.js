import React, { useContext, useState, useEffect } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList
} from 'react-native';
import Coin from "../assets/images/asset_coin_icon.png"
import Wallet from "../assets/images/wallet.png"
import WalletDark from "../assets/images/wallet-dark.png"
import faceID from "../assets/images/face_id.png"
import Print from "../assets/images/print.png"
import Header from '../components/header';
import BottomMenu from '../components/BottomMenu';
import AddButton from '../components/AddButton';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { sendEvmNative, Evm_estimatedGas, sendEvmToken, sendSolToken } from '../utils/function';
import MaroonSpinner from '../components/Loader/MaroonSpinner';

import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


const BuyNonNative = ({ route, navigation }) => {
    const { tokenData } = route?.params;
    const { theme } = useContext(ThemeContext);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [loader, setLoader] = useState(false)
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
    const Network = activeNet?.type;
    const [activeAccount, setActiveAccount] = useState();
    const [address, setAddress] = useState();
    const [activeNet, setActiveNet] = useState()
    // useEffect(() => {
    //     console.log("aaaaaaaaaaaaaaaaa", tokenData)
    // }, [])

    // 
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         setAddress(JSON.stringify(Network === 'solana' ? selectedAccount.solana.publicKey : selectedAccount.evm.address));
    //         setActiveAccount(JSON.stringify(Network === 'solana' ? selectedAccount.solana : selectedAccount.evm));
    //     }, 1000);
    //     return () => clearTimeout(timeoutId);
    // }, [Network, selectedAccount]);

    // const SendToken = () => {
    //     console.log("Actived Account ===> ", activeAccount)
    //     console.log("Address Or Private Key ===> ", address)
    //     console.log("AActivate Net ===> ", activeNet)

    // }
    //   

    // useEffect(() => {
    //     console.log("Data For Token Send ===> ", tokenData)
    //     console.log("My Selected Account on Token ", selectedAccount)
    //     console.log("My Selected NetWork on Token ", selectedNetwork)
    //     let accountKeys = Object.keys(selectedAccount)
    //     console.log(accountKeys)
    //     let parseNetwork = JSON.parse(selectedNetwork);
    //     accountKeys.map((key, index) => {
    //         console.log("Account filte working ==> key ", key)
    //         console.log("Account filte working ==> type", parseNetwork.type)

    //         if (key == parseNetwork.type) {
    //             console.log("Account filte working now never", parseNetwork.type)
    //             console.log("selected Accout now here ===> ", selectedAccount?.parseNetwork?.type)

    //         }
    //     })
    //     // setAccountTypes()
    // }, [])
    const getNetworkactive = async () => {
        let data = await JSON.parse(selectedNetwork)
        setActiveNet(data)
    }
    const handleSend = async () => {
        const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        try {
            if (amountToSend == '') {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid Amount',
                    textBody: 'Enter a valid Ammount',
                  })
            } else if (route?.params?.amount <= amountToSend) {
          
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Insufficient Funds',
                    textBody: 'Insufficient Funds to Continue',
                  })
            } else {
         
                if (activeNet?.type === 'solana') {
                    if (solanaAddressRegex.test(recipientAddress)) {
                        try {
                            // setLoader(true)
                            // privateKey, recipientAddress, tokenMintAddress, amount

                            // let finalamount = amountToSend * Math.pow(10, tokenData?.decimals)
                            let key = selectedAccount?.solana?.secretKey || selectedAccount?.solana?.privateKey
                            let trxData = {
                                privateKey : key,
                                recipientAddress: recipientAddress,
                                from : selectedAccount?.solana?.publicKey,
                                amount : amountToSend,
                                amountWei : amountToSend * Math.pow(10, tokenData?.decimals),
                                balance: tokenData?.balance,
                                balanceAmount: tokenData?.balance - amountToSend,
                                symbol : activeNet?.networkName,
                                tokenAddress :tokenData?.address,
                                tokenSymbol : tokenData?.symbol
                            }
                            
                            navigation.navigate('ConfirmErc20SolTransaction', {
                                trxData: trxData,
                              });
                            // let response = await sendSolToken(selectedAccount?.solana?.secretKey || selectedAccount?.solana?.privateKey , recipientAddress, tokenData?.address, finalamount);
                            // console.log("My place ===> ", response)
                            // if (response) {
                            //     setLoader(false)
                 
                            //     navigation.navigate("MainPage")
                            // } else {
                     
                            //     navigation.navigate("MainPage")
                            // }
                        } catch (error) {
                            setLoader(false)
                        }
                        //   console.log('Sending solana...',solanaAddressRegex.test(recipientAddress));
                        //   console.log('>>>>', activeAccount?.privateKey);
                        //   console.log('>>>>', recipientAddress);
                        //   console.log('>>>>', amountToSend);
                    } else {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Invalid Address',
                            textBody: 'Address is Not Valid',
                          })
                    }
                } else {
                  
                    if (evmAddressRegex.test(recipientAddress)) {
                        try {
                            // setLoader(true)
                            
                            let trxData = {
                                privateKey : selectedAccount?.evm?.privateKey,
                                recipientAddress: recipientAddress,
                                from : selectedAccount?.evm?.address,
                                amount : amountToSend,
                                amountWei : amountToSend * Math.pow(10, tokenData?.decimals),
                                chain : activeNet?.nodeURL,
                                balance: tokenData?.balance,
                                balanceAmount: tokenData?.balance - amountToSend,
                                symbol : activeNet?.networkName,
                                tokenAddress : tokenData?.token_address,
                                tokenSymbol : tokenData?.symbol
                            }
                            
                            navigation.navigate('ConfirmErc20Transaction', {
                                trxData: trxData,
                              });
                            // let response = await sendEvmToken(selectedAccount?.evm?.privateKey, recipientAddress, amountToSend * Math.pow(10, tokenData?.decimals), tokenData?.token_address, activeNet?.nodeURL);
                            // // console.log(' evm...Send ', response);
                            // if (response?.transactionHash) {
                            //     setLoader(false)
            
                            //     navigation.navigate("ConfirmErc20Transaction")
                            // }
                        } catch (error) {
                            setLoader(false)
                        }
                        //   console.log('>>>>', activeNet?.nodeURL);
                        //   console.log('>>>>', activeAccount?.privateKey);
                        //   console.log('>>>>', activeAccount);
                        //   console.log('>>>>', recipientAddress);
                        //   console.log('>>>>', amountToSend);
                    } else {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Invalid Address',
                            textBody: 'Address is Not Valid',
                          })
                    }
                }
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody:  error.message,
              })
        }
    };
    const setMax = async () => {
        setLoader(true)
        try{
            // let gasData = await Evm_estimatedGas('0x000000000000000000000000000000000000dEaD' , '0x000000000000000000000000000000000000dEaD' , 0 ,activeNet?.nodeURL)
            let  maxBalance = Number(tokenData?.balance).toFixed(2)
            setAmountToSend(maxBalance.toString())
            setLoader(false)
        }catch(error){
            setLoader(false)
        }
    }
    useEffect(() => {
        getNetworkactive()
    }, [selectedNetwork, setActiveNet])
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (route?.params) {
                console.log("Account >>>", route?.params?.account)
                if (activeNet?.type === 'solana') {
                    setActiveAccount(route?.params?.account?.solana)
                } else {
                    // setActiveAccount(route?.params?.account?.evm)
                }
                //   console.log("Amount >>>",route?.params?.amount)
                //   console.log("Network >>>",route?.params?.network)
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    });
    useEffect(() => {
        if (route?.params?.recepentAddress) {
            setRecipientAddress(route?.params?.recepentAddress)
        }
        if (route?.params) {
            //   console.log("Account >>>",route?.params?.account)
            if (activeNet?.type === 'solana') {
                setActiveAccount(route?.params?.account?.solana)
            } else {
                setActiveAccount(route?.params?.account?.evm)
            }
            //   console.log("Amount >>>",route?.params?.amount)
            //   console.log("Network >>>",route?.params?.network)
        }
    }, [route?.params]);
    return (
        <ScrollView style={[styles.MainWrapper, { backgroundColor: theme.screenBackgroud }]}>
            <Header title="Send" onBack={() => navigation.goBack()} />
            <View>
                <Text style={[styles.buyAmount, { color: theme.text }]}>{Number(tokenData?.balance).toFixed(3)} {tokenData?.symbol} </Text>
            </View>
            <View style={[styles.currencyDetailFlex, { backgroundColor: theme.menuItemBG }]}>
                <View style={styles.coinFlex}>
                    <Image width={50} height={50} source={{ uri: tokenData?.logo }} />
                    <View>
                        <Text style={[styles.coinMainText, { color: theme.text }]}>{tokenData?.name}</Text>
                        <Text style={[styles.coinSecText, { color: theme.text, textTransform: "uppercase" }]}>{tokenData?.balance} {tokenData?.symbol}</Text>
                    </View>
                </View>
            </View>
            {loader ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <MaroonSpinner />
                    <Text>Loading...</Text>
                </View> :
                <>
                    <View style={[styles.currencyDetailFlex, { backgroundColor: theme.menuItemBG }]}>
                        <View style={styles.coinFlex}>
                            <Image source={theme.type == 'dark' ? Wallet : WalletDark} />
                            <View>
                                {/* <Text style={styles.coinMainText}>Debit Or Credit</Text> */}
                                <Text style={[styles.coinSecText, { color: theme.text }]}>{activeNet?.networkName} Account   </Text>
                            </View>
                        </View>
                    </View>
                    <TextInput
                        style={[styles.input, styles.coinSecText, { borderColor: theme.text, color: theme.text }]}
                        onChangeText={setRecipientAddress}
                        value={recipientAddress}
                        placeholder="Recipient Address"
                        placeholderTextColor="#666"
                    />
                    {/* <TextInput
                        style={[styles.input, styles.coinSecText, { borderColor: theme.text, color: theme.text }]}
                        onChangeText={setAmountToSend}
                        value={amountToSend}
                        placeholder="Amount to Send"
                        keyboardType="numeric"
                        placeholderTextColor="#666"
                    /> */}
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                        style={[styles.input, styles.coinSecText, { flex: 1, borderColor: theme.text, color: theme.text }]}
                            onChangeText={setAmountToSend}
                            value={amountToSend}
                            placeholder="Amount to Send"
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            />
                        <TouchableOpacity
                            onPress={setMax}
                            style={{ marginRight: 10, paddingHorizontal: 20, paddingVertical: 11, backgroundColor: 'gray', borderRadius: 5  }}
                        >
                            <Text style={{ color: theme.buttonText }}>MAX</Text>
                        </TouchableOpacity>
                        </View>
                    <View style={styles.tokenImportBtnWrapper}>
                        <TouchableOpacity style={[styles.tokenImportButton, { borderColor: theme.buttonBorder }]} onPress={() => handleSend()}>
                            <Text style={[styles.tokenImportButtonText, { color: theme.text }]}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </ScrollView>
    )
}
export default BuyNonNative;
const styles = StyleSheet.create({
    MainWrapper: {
        // backgroundColor: '#280D2C',
        padding: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        color: '#000', // Adjust based on your theme
    },
    buyAmount: {
        // color: "#fff",
        textAlign: "center",
        fontSize: 42,
        fontWeight: "700",
        marginVertical: 20
    },
    currencyDetailFlex: {
        // backgroundColor: "#362538",
        padding: 14,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 20
    },
    coinFlex: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 16
    },
    coinMainText: {
        // color: "#fff",
        fontSize: 22,
        fontWeight: "600",
    },
    coinSecText: {
        // color: "#fff",
        fontSize: 16,
        fontWeight: "400",

    },
    tokenImportBtnWrapper: {
        marginTop: 25
    },
    tokenImportButton: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        // borderColor: "#FF003C",
        borderWidth: 1,
        borderRadius: 100,
    },
    tokenImportButtonText: {
        // color: "#FFF",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        textTransform: "capitalize",
        textAlign: "center"
    }
})