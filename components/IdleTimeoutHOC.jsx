import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { authenticateFingerprint } from '../utils/BiometricUtils'; // Import the authenticate function
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const FINGERPRINT_STORAGE_KEY = 'fingerprintData';

const IdleTimeoutHOC = (props) => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [isLocked, setIsLocked] = useState(false);
  const navigation = useNavigation();

  const handleInteraction = () => {
    setLastInteractionTime(Date.now());
    if (isLocked) {
      setIsLocked(false); 
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const idleTime = Date.now() - lastInteractionTime;
      const idleMinutes = idleTime / (1000 * 60);
      if (idleMinutes >= 5 && !isLocked) { // Change this to 1 minute
        setIsLocked(true);
        handleUnlockWithFingerprint(); // Automatically trigger fingerprint authentication
      }
    }, 60000); // 1 minute in milliseconds

    // Clean up timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [lastInteractionTime, isLocked]);

  const handleUnlockWithFingerprint = async () => {
    try {
      const storedFingerprintData = await AsyncStorage.getItem(FINGERPRINT_STORAGE_KEY);
      if (!storedFingerprintData) {
        throw new Error('No fingerprint data found. Please enroll your fingerprint first.');
      }
      const authenticationSuccess = await authenticateFingerprint();
      if (authenticationSuccess) {
        setIsLocked(false);
      } else {
        setIsLocked(true); // Lock again if authentication fails
        throw new Error('Fingerprint authentication failed.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleInteraction}>
      <View style={{ flex: 1 }}>
        {!isLocked && props.children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IdleTimeoutHOC;
