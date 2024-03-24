import CheckBox from '@react-native-community/checkbox';
import React, { useState, useContext, useEffect } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import WalletIcon from '../assets/images/wallet.png';
import eyeDark from '../assets/images/eye-slash-dark.png';
import lock from '../assets/images/lock.png';
import lockDark from '../assets/images/lock-dark.png';
import SubmitBtn from '../components/SubmitBtn';
import Header from '../components/header';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import MaroonSpinner from '../components/Loader/MaroonSpinner';
import { getEVM_AccountImport, getSol_AccountImport ,getBitcoin_AccountImport , getdoge_AccountImport, gettron_AccountImport} from '../utils/function';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function ImportWallet({ navigation }) {
    const [showPassword, setShowPassword] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [loader , setLoader] = useState(false)
    const { theme } = useContext(ThemeContext);
    const {
        password,
        savePassword,
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

    const [activeNet, setActiveNet] = useState()
    const getNetwork = async () => {
        let data = await JSON.parse(selectedNetwork)
        setActiveNet(data)
    }

    useEffect(() => {
        getNetwork()
    }, [selectedNetwork, Networks])

    const validate = async (data) => {
        let retval = true
        for (let i = 0; i < Accounts.length; i++) {
            if (Accounts[i]?.evm?.privateKey == data) {
                Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: 'Already Exists',
                    textBody: 'This account already exists.',
                  })
                retval = false
            }
        }
        return retval
    }
    const validatebtc = async (data) => {
        let retval = true
        for (let i = 0; i < Accounts.length; i++) {
            if (Accounts[i]?.btc?.privateKey == data) {
                Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: 'Already Exists',
                    textBody: 'This account already exists.',
                  })
                retval = false
            }
        }
        return retval
    }
    const validatetron = async (data) => {
        let retval = true
        for (let i = 0; i < Accounts.length; i++) {
            if (Accounts[i]?.tron?.privateKey == data) {
                Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: 'Already Exists',
                    textBody: 'This account already exists.',
                  })
                retval = false
            }
        }
        return retval
    }
    const validatedoge = async (data) => {
        let retval = true
        for (let i = 0; i < Accounts.length; i++) {
            if (Accounts[i]?.doge?.privateKey == data) {
                Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: 'Already Exists',
                    textBody: 'This account already exists.',
                  })
                retval = false
            }
        }
        return retval
    }
    const validatesol = async (data) => {
        let retval = true
        for (let i = 0; i < Accounts.length; i++) {
            if (Accounts[i]?.solana?.secretKey == data) {
                Toast.show({
                    type: ALERT_TYPE.INFO,
                    title: 'Already Exists',
                    textBody: 'This account already exists.',
                  })
                retval = false
            }
        }
        return retval
    }

    async function handleSubmit() {
        setLoader(true)
        if (passwordInput == '' || passwordInput == undefined || passwordInput == null) {
            setLoader(false)
            return setError('Key is not valid!');
            setLoader(false)
        }
        if (activeNet?.type == 'solana') {
            console.log("sol")
            let solImport = await getSol_AccountImport(passwordInput)
            if (!solImport) {
                setLoader(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid',
                    textBody: 'Invalid Key.',
                  })
            }
            if (solImport.publicKey) {
                const account_data = {
                    solana: solImport,
                    evm: { address: "Account Not Available", privateKey: "----" },
                    btc:{ address: "Account Not Available", privateKey: "----" },
                    tron:{ address: "Account Not Available", privateKey: "----" },
                    doge:{ address: "Account Not Available", privateKey: "----" },
                }
               let validated = await validatesol(passwordInput)
          
                if (validated) {
                    addAccount(account_data)
                    setSelectedAccount(account_data)
                    setLoader(false)
                    return navigation.navigate('MainPage');
                }else{
                    setLoader(false)
                }
            }
        }else if(activeNet?.type == 'btc'){
            setLoader(true)
            let btcImport = await getBitcoin_AccountImport(passwordInput)
            if (!btcImport) {
                setLoader(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid Key',
                    textBody: 'Invalid Key 0x...',
                  })
            }
            if (btcImport.address) {
                const account_data = {
                    solana: { publicKey: "Account Not Available", secretKey: "----" },
                    evm : { address: "Account Not Available", privateKey: "----" },
                    btc: btcImport,
                    tron:{ address: "Account Not Available", privateKey: "----" },
                    doge:{ address: "Account Not Available", privateKey: "----" },
                }
                let validated = await validatebtc(passwordInput)
                if (validated) {
                    setLoader(false)
                    addAccount(account_data)
                    setSelectedAccount(account_data)
                    return navigation.navigate('MainPage');
                }else{
                    setLoader(false)
                }
            }
        }else if(activeNet?.type == 'doge'){
            setLoader(true)
            let dogeImport = await getdoge_AccountImport(passwordInput)
            if (!dogeImport) {
                setLoader(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid Key',
                    textBody: 'Invalid Key 0x...',
                  })
            }
            if (dogeImport.address) {
                const account_data = {
                    solana: { publicKey: "Account Not Available", secretKey: "----" },
                    evm : { address: "Account Not Available", privateKey: "----" },
                    btc: { address: "Account Not Available", privateKey: "----" },
                    tron:{ address: "Account Not Available", privateKey: "----" },
                    doge:dogeImport,
                }
                let validated = await validatedoge(passwordInput)
                if (validated) {
                    setLoader(false)
                    addAccount(account_data)
                    setSelectedAccount(account_data)
                    return navigation.navigate('MainPage');
                }else{
                    setLoader(false)
                }
            }
        }else if(activeNet?.type == 'tron'){
            setLoader(true)
            let tronImport = await gettron_AccountImport(passwordInput)
            if (!tronImport) {
                setLoader(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid Key',
                    textBody: 'Invalid Key 0x...',
                  })
            }
            if (tronImport.address) {
                const account_data = {
                    solana: { publicKey: "Account Not Available", secretKey: "----" },
                    evm : { address: "Account Not Available", privateKey: "----" },
                    btc: { address: "Account Not Available", privateKey: "----" },
                    tron:tronImport,
                    doge:{ address: "Account Not Available", privateKey: "----" },
                }
                let validated = await validatetron(passwordInput)
                if (validated) {
                    setLoader(false)
                    addAccount(account_data)
                    setSelectedAccount(account_data)
                    return navigation.navigate('MainPage');
                }else{
                    setLoader(false)
                }
            }
        }else {
            setLoader(true)
            let evmImport = await getEVM_AccountImport(passwordInput)
            if (!evmImport) {
                setLoader(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid Key',
                    textBody: 'Invalid Key 0x...',
                  })
            }
            if (evmImport.address) {
                const account_data = {
                    solana: { publicKey: "Account Not Available", secretKey: "----" },
                    evm: evmImport,
                    btc:{ address: "Account Not Available", privateKey: "----" },
                    tron:{ address: "Account Not Available", privateKey: "----" },
                    doge:{ address: "Account Not Available", privateKey: "----" },
                }
                let validated = await validate(passwordInput)
                if (validated) {
                    setLoader(false)
                    addAccount(account_data)
                    setSelectedAccount(account_data)
                    return navigation.navigate('MainPage');
                }else{
                    setLoader(false)
                }
            }
        }
    }


    useEffect(() => {
        if (password == null || password == undefined || password == '') {
            return navigation.navigate('Home');
        }
    }, [password])

    return (
        <ScrollView style={{ backgroundColor: theme.screenBackgroud }}>
            <Header onBack={() => navigation.goBack()} title="Import Account" />

            <View style={[styles.content, styles.textContainer, { marginTop: '50%' }]}>
                <Text style={[styles.textStyle, { color: theme.text }]}>Import Accouont</Text>
                <Text
                    style={[styles.textStyle, styles.instruction, { color: theme.text }]}>
                    Import Account Using {activeNet?.networkName} Private Key
                </Text>
            </View>
            <View style={[styles.input, { backgroundColor: theme.textInputBG }]}>
                <View style={styles.inputLock}>
                    <Image source={theme.type == 'dark' ? WalletIcon : WalletIcon} />
                    <TextInput
                        style={{ color: theme.text, width: "100%" }}
                        placeholder="Private Key"
                        placeholderTextColor={theme.text}
                        onChangeText={newText => setPasswordInput(newText)}
                        defaultValue={passwordInput}
                        secureTextEntry={showPassword}
                    />
                </View>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {/* <Image source={theme.type == 'dark' ? eye : eyeDark} /> */}
                </TouchableOpacity>
            </View>
            <View>
                {error && (
                    <Text style={[{ color: theme.emphasis, textAlign: 'center' }]}>
                        ! {error}
                    </Text>
                )}
            </View>
            {loader ?
            <MaroonSpinner/> 
            :
            <>
            <SubmitBtn
                title="Import Wallet"
                // onPress={() => navigation.navigate('ResetPasswordScreen')}
                onPress={() => handleSubmit()}
                />
                <TouchableOpacity onPress={()=>{ navigation.navigate('ImportWalletMnemonic') }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin:10 }}>
                    <Text style={{ color: theme.text }}> Import Using Mnemonic </Text>
                </View>
                </TouchableOpacity>
            </>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // screen: {
    //   backgroundColor: '#280D2C',
    // },

    content: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 70,
        gap: 32,
    },
    textContainer: {
        gap: 0,
        marginBottom: 30,
        textAlign: 'center',
    },
    textStyle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        // color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 15,
    },
    instruction: {
        // marginTop: 0,
        fontSize: 14,
        fontWeight: '400',
        marginTop: 12,
    },
    input: {
        flexDirection: 'row',
        // backgroundColor: '#351739',
        alignItems: 'center',
        padding: 14,
        paddingVertical: 5,
        justifyContent: 'space-between',
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    inputLock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '80%',
    },
    placeHolderColor: {
        color: 'white',
    },
    checkInput: {
        // backgroundColor: '#280D2C',
        marginHorizontal: 0,
        justifyContent: 'flex-start',
    },
    checkText: {
        // color: '#FFF',
        fontFamily: 'SF Pro Text',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        marginLeft: 10,
    },
    emphasis: {
        // color: '#F43459',
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});
