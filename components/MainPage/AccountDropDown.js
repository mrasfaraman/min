import React, { useContext, useState , useEffect} from "react";
import { Menu, HamburgerIcon, Box, Pressable, Center, NativeBaseProvider } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {useTranslation} from 'react-i18next';
import i18n from '../../pages/i18n';

import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from "../../context/AuthContext";
function AccountDropDown() {
    const { theme } = useContext(ThemeContext);
    const [selectedAcount, setSelectedAccounts] = useState("Account 1")
    const { Accounts, setSelectedAccount , selectedAccount} = useAuth()
    const Network = 'solana'
    const {t} = useTranslation();
    useEffect(() => {
      const loadSelectedLanguage = async () => {
        try {
          const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
          if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage); 
          }
        } catch (error) {
          console.error('Error loading selected language:', error);
        }
      };
      loadSelectedLanguage();
    }, []);


    const changeNetwork = async (account, index) => {
        setSelectedAccount(account)
        setSelectedAccounts("Account  " + `${index + 1}`)
    }

    useEffect(()=>{
        setSelectedAccount(Accounts[0])
    },[])
    
    const validate = async () => {
        for (let i = 0; i < Accounts.length; i++) {
            if(Accounts[i] == selectedAccount){
                setSelectedAccounts("Account  " + `${i + 1}`)
            }
        }
    }
 
    useEffect(()=>{
        validate()
    },[selectedAccount])
    
    return (
        <Box w="100%" alignItems="center">
            <Menu w="150" trigger={triggerProps => {
                return <Pressable style={{ alignContent: "center" }} accessibilityLabel="More options menu" {...triggerProps}>
                    <Text style={[styles.userAccount, { color: theme.text }]}>
                        {selectedAcount}
                    </Text>
                </Pressable>;
            }}>

                {Accounts.map((account, index) => (
                    <TouchableOpacity
                        onPress={() => changeNetwork(account, index)}>
                        <View style={{ padding: 10 }}>
                            <Text style={[styles.userAccount, { color: 'black' }]}>
                            {t('account')}
 {index + 1}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
                {/* {JSON.stringify(Network == 'evm' ? account.evm.address : account.solana.publicKey)} */}
            </Menu>
        </Box>)
}


export default AccountDropDown;


const styles = StyleSheet.create({
    userAccount: {
        // color: '#FFF',
        textAlign: "center",
        fontFamily: 'SF Pro Text',
        fontSize: 11.47,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 15.293,
        letterSpacing: -0.229,
    },
})