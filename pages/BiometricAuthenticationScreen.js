import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {authenticateFingerprint} from '../utils/BiometricUtils';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BiometricAuthenticationScreen = () => {
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

  const authenticateFingerprintHandler = () => {
    authenticateFingerprint(); // Function to authenticate fingerprint
    // return navigation.navigate('MainPage');
  };

  //   const authenticateFaceIDHandler = () => {
  //     authenticateFaceID(); // Function to authenticate Face ID
  //   };

  return (
    <View>
      <Text> {t('authenticate_biometrics')}</Text>
      <Button
        title="Authenticate Fingerprint"
        onPress={authenticateFingerprintHandler}
      />
      {/* <Button title="Authenticate Face ID" onPress={authenticateFaceIDHandler} /> */}
    </View>
  );
};

export default BiometricAuthenticationScreen;
