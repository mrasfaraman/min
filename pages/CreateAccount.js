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
import eye from '../assets/images/eye-slash.png';
import eyeDark from '../assets/images/eye-slash-dark.png';
import lock from '../assets/images/lock.png';
import lockDark from '../assets/images/lock-dark.png';
import SubmitBtn from '../components/SubmitBtn';
import Header from '../components/header';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CreateWallet, CreateEVMWallet , CreateBitcoinAccount , CreatedogeAccount, CreatetronAccount,} from '../utils/function';

import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import MaroonSpinner from '../components/Loader/MaroonSpinner';
export default function CreateAccount({ navigation }) {
    const [showPassword, setShowPassword] = useState(true);
    const [loader, setLoader] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');

    const { theme } = useContext(ThemeContext);
    const {addAccount,setSelectedAccount} = useAuth();

    async function handleSubmit() {
    setLoader(true)
    try{
    let data = await CreateWallet()
    let EVMdata = await CreateEVMWallet()
    let Bitcoin_data = await CreateBitcoinAccount()
    let tron_data = await CreatetronAccount()
    let dogecoin_data = await CreatedogeAccount()
    const account_data = {
        solana : data,
        evm : EVMdata,
        btc : Bitcoin_data,
        tron : tron_data,
        doge : dogecoin_data
    }
    addAccount(account_data)
    Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Account Created',
        textBody: 'Your Account Sucessfully Created',
      })
    // await setSelectedAccount(account_data)
    setLoader(false)
    return navigation.navigate('MainPage');
    }catch(error){
        setLoader(false)
        Toast.show({
            type: ALERT_TYPE.INFO,
            title: 'Error',
            textBody: error.message,
          })
    }
    }


    useEffect(() => {
       
    }, [])

    return (
        <ScrollView style={{ backgroundColor: theme.screenBackgroud }}>
            <Header title={'Create Account'} onBack={() => navigation.goBack()} />
            <View style={[styles.content, styles.textContainer, { marginTop: '50%' }]}>
                <Text style={[styles.textStyle, { color: theme.text }]}>Create Accouont</Text>
                <Text
                    style={[styles.textStyle, styles.instruction, { color: theme.text }]}>
                    Create New Account
                </Text>
            </View>
            <View>
                {error && (
                    <Text style={[{ color: theme.emphasis, textAlign: 'center' }]}>
                        ! {error}
                    </Text>
                )}
            </View>
            {loader ? <MaroonSpinner /> :
            <SubmitBtn
            title="Create "
            onPress={() => handleSubmit()}
            />
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
