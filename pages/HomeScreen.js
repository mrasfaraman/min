import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View,TouchableHighlight, StyleSheet } from 'react-native';
import bg from '../assets/images/bg.png';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { password } = useAuth();

  if (password) {
    navigation.navigate('LoginScreen');
  }

  const { t } = useTranslation();
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

  return (
    <ScrollView 
      style={[styles.screen, {backgroundColor: theme.screenBackgroud}]}>
      <View style={styles.bgImg}>
        <Image source={bg} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.textStyle, {color: theme.text}]}>
         {t('the_only_crypto_wallet_you’d_ever_need')}
        </Text>
        <TouchableOpacity
          style={[styles.buttonStyle, {borderColor: theme.buttonBorder}]}
          onPress={() => navigation.navigate('CreateWalletScreen')}>
          <Text style={[styles.btnText, {color: theme.text}]}>           
           {t('get_started')}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40, flexWrap:'wrap', }}>
        <Text style={[styles.textStyle, styles.terms, {color: theme.text}]}>
            {t('by_tapping_get_started_you_agree_and_consent_to_our')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Term')}>
          <Text style={[styles.emphasis, {color: theme.emphasis}]}>
              {t('terms_&_service')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.emphasis, {color: theme.emphasis}]}>
            {' '}{t('and')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <Text style={[styles.emphasis, {color: theme.emphasis}]}>
              {t('privacy_policy')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // justifyContent: 'space-between',
    // alignContent: 'space-between',
  },
  emphasis: {
    // color: '#F43459',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bgImg: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  textStyle: {
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  content: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 70,
    gap: 32,
  },
  buttonStyle: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    // gap: 12,
    // width: 360,
    // borderColor: '#FF003C',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 1000,
  },
  btnText: {
    textAlign: 'center',
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
  },
});
