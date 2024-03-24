import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import bg from '../assets/images/bg.png';
import { ThemeContext } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TermsScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Load selected language if needed
    const loadSelectedLanguage = async () => {
      try {
        // Code for loading language
      } catch (error) {
        console.error('Error loading selected language:', error);
      }
    };
    loadSelectedLanguage();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.screenBackgroud }}>
      <View style={{ marginTop: 35, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={bg} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: -50 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 4, color: theme.text }}>
          Terms and Conditions
        </Text>
        <Text style={{  fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, marginTop: 10, color: theme.text }}>
          <Text style={{ fontWeight: 'bold', marginRight: 8, color: theme.text, }}>• </Text> You must be at least 18 years old to use CryptoWallet.
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, color: theme.text, marginTop: 5, }}>
          <Text style={{ fontWeight: 'bold', marginRight: 8, color: theme.text }}>• </Text> CryptoWallet is intended for personal use only. Commercial use is prohibited.
        </Text>
        <Text style={{ marginTop: 5,fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, color: theme.text }}>
          <Text style={{ fontWeight: 'bold', marginRight: 8, color: theme.text }}>• </Text> You are responsible for security of your cryptocurrency assets stored in CryptoWallet.
        </Text>
        <Text style={{ marginTop: 5,fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, color: theme.text }}>
          <Text style={{ fontWeight: 'bold', marginRight: 8, color: theme.text }}>• </Text> Cryptocurrency markets are highly volatile. Invest only what you can afford to lose.
        </Text>
        <Text style={{ fontWeight:'bold',marginTop: 25,fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, color: theme.text }}>
          Please read these terms and conditions carefully before using CryptoWallet.
        </Text>
        <TouchableOpacity
          style={{ marginTop: 20, paddingVertical: 14, paddingHorizontal: 112, borderStyle: 'solid', borderWidth: 1, borderRadius: 1000, borderColor: theme.buttonBorder }}
          onPress={() => navigation.goBack()}>
          <Text style={{ textAlign: 'center', fontFamily: 'SF Pro Text', fontSize: 14, fontWeight: '600', color: theme.text }}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
