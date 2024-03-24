import React, {useContext , useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Share
} from 'react-native';
import Coin from '../assets/images/asset_coin_icon.png';
import Wallet from '../assets/images/wallet.png';
import WalletDark from "../assets/images/wallet-dark.png"
import faceID from '../assets/images/face_id.png';
import Print from '../assets/images/print.png';
import Header from '../components/header';
import BottomMenu from '../components/BottomMenu';
import AddButton from '../components/AddButton';
import {ThemeContext} from '../context/ThemeContext';
import { SafeAreaView } from 'react-native';
import QRCodeGenerator from '../components/QRCodeGenerator/QRCodeGenerator';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubmitBtn from '../components/SubmitBtn';


const Sell = ({route,navigation}) => {
  const {theme} = useContext(ThemeContext);
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
  const shareAddress = async (evmAddress) => {
    try {
      await Share.share({
        message: `Here's my Wallet Address: ${evmAddress}`,
      });
    } catch (error) {
      console.error('Error sharing EVM address:', error);
    }
  };
  
  useEffect(() => {
    if (route?.params) {
      console.log("Account >>>",route?.params?.account)
      console.log("Network >>>",route?.params?.network)
      // console.log("Recepent Address >>>",route?.params?.recepentAddress)
    }
  }, [route?.params]);
  return (
    <ScrollView
      style={[styles.MainWrapper, {backgroundColor: theme.screenBackgroud}]}>
      <Header title={t('receive')} onBack={() => navigation.goBack()} />
      <SafeAreaView style={{marginTop:60}}>
      <QRCodeGenerator evmAddress={route?.params?.account.replace(/^"|"$/g, '')} />
    </SafeAreaView>
      <View style={{marginBottom:50}}>
        <Text style={[styles.buyAmount, {color: theme.text}]}>{t('scan_qr')}</Text>
      </View>
      {/* <View
        style={[
          styles.currencyDetailFlex,
          {backgroundColor: theme.menuItemBG},
        ]}>
        <View style={styles.coinFlex}>
          <Image source={Coin} />
          <View>
            <Text style={[styles.coinMainText, {color: theme.text}]}>
              Bitcoin
            </Text>
            <Text style={[styles.coinSecText, {color: theme.text}]}>
              Bitcoin Mainet
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.currencyDetailFlex,
          {backgroundColor: theme.menuItemBG},
        ]}>
      </View> */}
      <View style={styles.coinFlex}>
        <Image source={theme.type == 'dark' ? Wallet : WalletDark} />
        <View>
          <Text style={styles.coinMainText}>{t('wallet_address')}</Text>
          <Text style={[styles.coinSecText, {color: theme.text}]}>
            {route?.params?.account.replace(/^"|"$/g, '')}
          </Text>
        </View>
      </View>
      <View style={styles.tokenImportBtnWrapper}>
      <SubmitBtn
          title={t('share')}
          onPress={() =>
            shareAddress(route?.params?.account.replace(/^"|"$/g, ''))
          }
          containerStyle={{marginHorizontal: 0}}
        />
        {/* <TouchableOpacity
          style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]}
          onPress={() =>
            shareAddress(route?.params?.account.replace(/^"|"$/g, ''))
          }>
          <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>
            Share
          </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default Sell;

const styles = StyleSheet.create({
  MainWrapper: {
    // backgroundColor: '#280D2C',
    padding: 10,
  },
  buyAmount: {
    // color: "#fff",
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '700',
    marginVertical: 20,
  },
  currencyDetailFlex: {
    // backgroundColor: "#362538",
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  coinFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  coinMainText: {
    // color: "#fff",
    fontSize: 22,
    fontWeight: '600',
  },
  coinSecText: {
    // color: "#fff",
    fontSize: 16,
    fontWeight: '400',
  },
  tokenImportBtnWrapper: {
    marginTop: 25,
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
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
