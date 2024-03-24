import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import bg from '../assets/images/bg.png';
import { ThemeContext } from '../context/ThemeContext';

export default function PrivacyPolicyScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const loadSelectedLanguage = async () => {
      try {
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
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: -75 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 4, color: theme.text }}>
        Privacy Policy
        </Text>
        <Text style={{  fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, marginTop: 10, color: theme.text }}>
          <Text style={{ fontWeight: 'bold', marginRight: 8, color: theme.text, }}>• </Text> Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application. Please read this Privacy Policy carefully.
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, color: theme.text, marginTop: 5, }}>
          <Text style={{ fontWeight: 'bold', marginRight: 8, color: theme.text }}>• </Text>  We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy.
        </Text>
        <Text style={{ fontWeight:'bold',marginTop: 10,fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, color: theme.text, textAlign:'center' }}>
        Contact Us:
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 2, marginLeft: 16, color: theme.text, marginTop: 5, }}>
           If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
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
