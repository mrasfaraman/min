import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {enrollFingerprint} from '../utils/BiometricUtils';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BiometricEnrollmentScreen = ({navigation}) => {
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
  const {t} = useTranslation();
  enrollFingerprint(); // Function to enroll fingerprint
  const enrollFingerprintHandler = () => {};

  //   const enrollFaceIDHandler = () => {
  //     enrollFaceID(); // Function to enroll Face ID
  //   };

  return (
    <View>
      <Text> {t('enroll_biometrics')}</Text>
      <Button title="Enroll Fingerprint" onPress={enrollFingerprintHandler} />
      {/* <Button title="Enroll Face ID" onPress={enrollFaceIDHandler} /> */}
    </View>
  );
};

export default BiometricEnrollmentScreen;
