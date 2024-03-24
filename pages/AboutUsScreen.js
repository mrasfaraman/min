import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import bg from '../assets/images/bg.png';
import { ThemeContext } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AboutUsScreen({ navigation }) {
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
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <Image source={bg} />
      </View>
      <View style={{  paddingHorizontal: 20, marginTop: 320 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 4, color: theme.text }}>
          About Wave
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10, textAlign: 'left', marginLeft: 20, color: theme.text }}>
          <Text style={{ marginRight: 10 }}>• </Text> Wave is a revolutionary financial management app designed to simplify your financial life.
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10, textAlign: 'left', marginLeft: 20, color: theme.text }}>
          <Text style={{ marginRight: 10 }}>• </Text> With Wave, you can effortlessly track your expenses, manage your budget, and achieve your financial goals.
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 10, textAlign: 'left', marginLeft: 20, color: theme.text }}>
          <Text style={{ marginRight: 10 }}>• </Text> Our mission is to empower individuals to take control of their finances and build a brighter financial future.
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
