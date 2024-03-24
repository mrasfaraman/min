import React from 'react';
import { View, Text, Button } from 'react-native';
import { authenticateFingerprint } from '../utils/BiometricUtils';
const BiometricAuthenticationScreen = () => {
  const authenticateFingerprintHandler = () => {
    authenticateFingerprint(); // Function to authenticate fingerprint
    // return navigation.navigate('MainPage');
  };

//   const authenticateFaceIDHandler = () => {
//     authenticateFaceID(); // Function to authenticate Face ID
//   };

  return (
    <View>
      <Text>Authenticate Biometrics</Text>
      <Button title="Authenticate Fingerprint" onPress={authenticateFingerprintHandler} />
      {/* <Button title="Authenticate Face ID" onPress={authenticateFaceIDHandler} /> */}
    </View>
  );
};

export default BiometricAuthenticationScreen;
