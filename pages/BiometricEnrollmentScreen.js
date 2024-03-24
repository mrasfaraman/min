import React from 'react';
import { View, Text, Button } from 'react-native';
import { enrollFingerprint } from '../utils/BiometricUtils';

const BiometricEnrollmentScreen = ({navigation}) => {
    enrollFingerprint(); // Function to enroll fingerprint
  const enrollFingerprintHandler = () => {
   
  };

//   const enrollFaceIDHandler = () => {
//     enrollFaceID(); // Function to enroll Face ID
//   };

  return (
    <View>
      <Text>Enroll Biometrics</Text>
      <Button title="Enroll Fingerprint" onPress={enrollFingerprintHandler} />
      {/* <Button title="Enroll Face ID" onPress={enrollFaceIDHandler} /> */}
    </View>
  );
};

export default BiometricEnrollmentScreen;
