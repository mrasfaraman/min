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
    Button,
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
import {  getEVM_AccountImportMnemonic ,getSol_AccountImportMnemonic ,getBitcoin_AccountImportMnemonic , getdoge_AccountImportMnemonic , gettron_AccountImportMnemonic} from '../utils/function';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function ImportWalletMnemonic({ navigation }) {
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
            if (Accounts[i]?.evm?.address == data) {
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
            if (Accounts[i]?.btc?.address == data) {
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
            if (Accounts[i]?.tron?.address == data) {
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
            if (Accounts[i]?.doge?.address == data) {
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
            if (Accounts[i]?.solana?.publicKey == data) {
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



    useEffect(() => {
        if (password == null || password == undefined || password == '') {
            return navigation.navigate('Home');
        }
    }, [password])



    const [mnemonicWords, setMnemonicWords] = useState(Array(12).fill(''));

    const handleMnemonicChange = (text, index) => {
      if (text.includes(' ')) {
        const words = text.split(' ').filter(Boolean);
        setMnemonicWords(words.concat(Array(12 - words.length).fill('')));
      } else {
        setMnemonicWords(mnemonicWords.map((word, i) => (i === index ? text : word)));
      }
    };
    const areAllMnemonicWordsPresent = () => {
        return mnemonicWords.every(word => word.trim() !== '');
      };
    const handleSubmitMnemonic = async () => {
        if (areAllMnemonicWordsPresent()) {
            console.log(mnemonicWords.join(' '));

            setLoader(true)
       
            if (activeNet?.type == 'solana') {
                console.log("sol")
                let solImport = await getSol_AccountImportMnemonic(mnemonicWords.join(' '))
                console.log(solImport)
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
                        tron: { address: "Account Not Available", privateKey: "----" },
                        doge: { address: "Account Not Available", privateKey: "----" }
                    }
                   let validated = await validatesol(solImport.publicKey)
              
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
                let btcImport = await getBitcoin_AccountImportMnemonic(mnemonicWords.join(' '))
                console.log(btcImport)
                if (!btcImport) {
                    setLoader(false)
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Invalid Words',
                        textBody: 'Invalid Words ',
                      })
                }
                if (btcImport.address) {
                    const account_data = {
                        solana: { publicKey: "Account Not Available", secretKey: "----" },
                        evm: { address: "Account Not Available", privateKey: "----" },
                        btc: btcImport,
                        tron: { address: "Account Not Available", privateKey: "----" },
                        doge: { address: "Account Not Available", privateKey: "----" }
                    }
                    let validated = await validatebtc(btcImport.address)
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
                let tronImport = await gettron_AccountImportMnemonic(mnemonicWords.join(' '))
                console.log(tronImport)
                if (!tronImport) {
                    setLoader(false)
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Invalid Words',
                        textBody: 'Invalid Words ',
                      })
                }
                if (tronImport.address) {
                    const account_data = {
                        solana: { publicKey: "Account Not Available", secretKey: "----" },
                        evm: { address: "Account Not Available", privateKey: "----" },
                        btc: { address: "Account Not Available", privateKey: "----" },
                        tron: tronImport,
                        doge: { address: "Account Not Available", privateKey: "----" }
                    }
                    let validated = await validatetron(tronImport.address)
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
                let dogeImport = await getdoge_AccountImportMnemonic(mnemonicWords.join(' '))
                console.log(dogeImport)
                if (!dogeImport) {
                    setLoader(false)
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Invalid Words',
                        textBody: 'Invalid Words ',
                      })
                }
                if (dogeImport.address) {
                    const account_data = {
                        solana: { publicKey: "Account Not Available", secretKey: "----" },
                        evm: { address: "Account Not Available", privateKey: "----" },
                        btc: { address: "Account Not Available", privateKey: "----" },
                        tron: { address: "Account Not Available", privateKey: "----" },
                        doge: dogeImport
                    }
                    let validated = await validatedoge(dogeImport.address)
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
                let evmImport = await getEVM_AccountImportMnemonic(mnemonicWords.join(' '))
                // console.log(evmImport)
                if (!evmImport) {
                    setLoader(false)
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Invalid Words',
                        textBody: 'Invalid Words ',
                      })
                }
                if (evmImport.address) {
                    const account_data = {
                        solana: { publicKey: "Account Not Available", secretKey: "----" },
                        evm: evmImport,
                        btc: { address: "Account Not Available", privateKey: "----" },
                        tron: { address: "Account Not Available", privateKey: "----" },
                        doge: { address: "Account Not Available", privateKey: "----" }
                    }
                    let validated = await validate(evmImport.address)
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



          } else {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Insert All Words',
                textBody: 'Please Fill All Fields',
              })
          }

      console.log(mnemonicWords.join(' '));
    };


    return (
        <ScrollView style={{ backgroundColor: theme.screenBackgroud }}>
            <Header onBack={() => navigation.goBack()} title="Import Account" />

            <View style={[styles.content, styles.textContainer, { marginTop: '20%' , marginBottom:'10%' }]}>
                <Text style={[styles.textStyle, { color: theme.text }]}>Import Accouont Using Mnemonic</Text>
                <Text
                    style={[styles.textStyle, styles.instruction, { color: theme.text }]}>
                    Import Account Using {activeNet?.networkName} Mnemonic Words
                </Text>
            </View>
            {/* <View style={[styles.input, { backgroundColor: theme.textInputBG }]}>
                <View style={styles.inputLock}>
                    <Image source={theme.type == 'dark' ? WalletIcon : WalletIcon} />
                    <TextInput
                        style={{ color: theme.text, width: "100%" }}
                        placeholder="Mnemonic Words"
                        placeholderTextColor={theme.text}
                        onChangeText={newText => setPasswordInput(newText)}
                        defaultValue={passwordInput}
                        secureTextEntry={showPassword}
                    />
                </View>
            </View> */}






<View style={styles.container}>
  <View style={styles.column}>
    {Array.from({ length: 6 }).map((_, index) => (
      <TextInput
        key={`input-${index*2}`}
        value={mnemonicWords[index*2]}
        onChangeText={(text) => handleMnemonicChange(text, index*2)}
          style={[styles.input ,{ color: theme.text , backgroundColor:'gray' , borderColor:'red' , border : 1}]}
        placeholder={`${index*2 + 1}`}
      />
    ))}
  </View>
  <View style={styles.column}>
    {Array.from({ length: 6 }).map((_, index) => (
      <TextInput
        key={`input-${index*2+1}`}
        value={mnemonicWords[index*2+1]}
        onChangeText={(text) => handleMnemonicChange(text, index*2+1)}
          style={[styles.input ,{ color: theme.text , backgroundColor:'gray' , borderColor:'red' , border : 1}]}
        placeholder={`${index*2 + 2}`}
      />
    ))}
  </View>
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
            <SubmitBtn
                title="Import Wallet"
                // onPress={() => navigation.navigate('ResetPasswordScreen')}
                onPress={() => handleSubmitMnemonic()}
            />
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:30
      },
      column: {
        // Adjust the width as necessary to fit your design
        width: '50%',
      },
      input: {
        marginVertical: 8,
        // Further style your TextInput components as necessary
      },
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
