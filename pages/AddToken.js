import React, {useContext, useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import Header from '../components/header';
import Token from '../components/AddToken/Token';
import NetWork from '../components/AddToken/Network';
import {ThemeContext} from '../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddToken = ({navigation}) => {
  const [currentTab, setCurrenTab] = useState('token');
  const {theme} = useContext(ThemeContext);
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
  return (
    <ScrollView
      style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
      <Header onBack={() => navigation.goBack()} title= {t('add_token_&_network')} />
      <View style={styles.AddGeaderWrapper}>
        <TouchableOpacity
          onPress={() => setCurrenTab('token')}
          style={[
            styles.addTabs,
            {borderBottomColor: theme.emphasis},
            currentTab == 'token' && {borderBottomWidth: 2},
          ]}>
          <Text style={[styles.addTabsText, {color: theme.text}]}>
            {t('token')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrenTab('network')}
          style={[
            styles.addTabs,
            {borderBottomColor: theme.emphasis},
            currentTab == 'network' && {borderBottomWidth: 2},
          ]}>
          <Text style={[styles.addTabsText, {color: theme.text}]}>
            {t('network')}
          </Text>
        </TouchableOpacity>
      </View>
      {currentTab == 'token' && <Token navigation={navigation} />}
      {currentTab == 'network' && <NetWork navigation={navigation} />}
    </ScrollView>
  );
};

export default AddToken;

const styles = StyleSheet.create({
  mainWrapper: {
    // backgroundColor: '#280D2C',
    padding: 10,
  },
  AddGeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addTabs: {
    width: '50%',
    padding: 25,
  },
  addTabsText: {
    textAlign: 'center',
    // color: "#FFF",
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  selectedTapBorder: {
    // borderBottomColor: "#F43459",
    // borderBottomWidth: 2,
  },
});
