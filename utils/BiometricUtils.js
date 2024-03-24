// BiometricUtils.js
import TouchID from 'react-native-touch-id';
// import FaceID from 'react-native-faceid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FINGERPRINT_STORAGE_KEY = 'fingerprintData';
const FACEID_STORAGE_KEY = 'faceIdData';

export const enrollFingerprint = async () => {
  try {
    const enrollment = await TouchID.isSupported();
    if (!enrollment) {
      throw new Error('Fingerprint not supported on this device.');
    }
    const touchIdData = await TouchID.authenticate('Scan your fingerprint to enroll.');
    await AsyncStorage.setItem(FINGERPRINT_STORAGE_KEY, JSON.stringify(touchIdData));
    console.log('Fingerprint enrolled successfully:', touchIdData);
    return true
  } catch (error) {
    console.error('Error enrolling fingerprint:', error);
    return false
  }
};

export const authenticateFingerprint = async () => {
  try {
    const touchIdData = await AsyncStorage.getItem(FINGERPRINT_STORAGE_KEY);
    if (!touchIdData) {
      throw new Error('No fingerprint data found. Please enroll your fingerprint first.');
    }
    await TouchID.authenticate('Scan your fingerprint to authenticate.');
    return true
  } catch (error) {
    return false
  }
};

// export const enrollFaceID = async () => {
//   try {
//     const faceIdData = await FaceID.authenticate();
//     await AsyncStorage.setItem(FACEID_STORAGE_KEY, JSON.stringify(faceIdData));
//     console.log('Face ID enrolled successfully:', faceIdData);
//   } catch (error) {
//     console.error('Error enrolling Face ID:', error);
//   }
// };

// export const authenticateFaceID = async () => {
//   try {
//     const faceIdData = await AsyncStorage.getItem(FACEID_STORAGE_KEY);
//     if (!faceIdData) {
//       throw new Error('No Face ID data found. Please enroll Face ID first.');
//     }
//     await FaceID.authenticate();
//     console.log('Face ID authentication successful.');
//   } catch (error) {
//     console.error('Face ID authentication failed:', error);
//   }
// };
