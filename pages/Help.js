import React, {useContext, useEffect} from 'react';
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
import ListSearch from '../assets/images/list-search.png';
import ListSearchDark from '../assets/images/list-search-dark.png';
import HelpCoupon from '../assets/images/help-coupon.png';
import CopyTicket from '../assets/images/copy-ticket.png';
import HelpRight from '../assets/images/help-right.png';
import HelpRightDark from '../assets/images/help-right-dark.png';
import PaymentIssue from '../assets/images/payment-issue.png';
import AppIssue from '../assets/images/app-issue.png';
import HeadPhones from '../assets/images/headphones.png';
import MessageIcon from '../assets/images/chat-dots.png';
import {ThemeContext} from '../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Help = ({navigation}) => {
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
      <Header title={'Help & Support'} onBack={() => navigation.goBack()} />
      <View
        style={[styles.listSearchWrapper, {backgroundColor: theme.menuItemBG}]}>
        <Image
          source={theme.type == 'dark' ? ListSearch : ListSearchDark}
          alt="search"
        />
        <TextInput
          placeholder="What issue are you facing?"
          style={[styles.listSearchText, {color: theme.text}]}
          placeholderTextColor={theme.text}
        />
      </View>
      <View>
        <View
          style={[styles.helpCardWrapper, {backgroundColor: theme.menuItemBG}]}>
          <View style={styles.helpCardLeftFlex}>
            <View
              style={[
                styles.helpLeftIconWrapper,
                {backgroundColor: theme.helpLeftIconBG},
              ]}>
              <Image source={HelpCoupon} />
            </View>
            <Text style={[styles.helpLeftTexts, {color: theme.text}]}>
            {t('support_ticket')}
            </Text>
          </View>
          <View style={styles.helpCardRightFlex}>
            <Text style={[styles.cardRightText, {color: theme.emphasis}]}>
              #86391070
            </Text>
            <TouchableOpacity style={styles.cardRightCopy}>
              <Image source={CopyTicket} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('HelpAnswers')}>
          <View
            style={[
              styles.helpCardWrapper,
              {backgroundColor: theme.menuItemBG},
            ]}>
            <View style={styles.helpCardLeftFlex}>
              <View
                style={[
                  styles.helpLeftIconWrapper,
                  {backgroundColor: theme.helpLeftIconBG},
                ]}>
                <Image source={PaymentIssue} />
              </View>
              <Text style={[styles.helpLeftTexts, {color: theme.text}]}>
              {t('payment_issues')}
              </Text>
            </View>
            <View style={styles.helpCardRightFlex}>
              <View style={styles.cardRightCopy}>
                <Image source={theme.type == 'dark' ? HelpRight : Help} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={[
              styles.helpCardWrapper,
              {backgroundColor: theme.menuItemBG},
            ]}>
            <View style={styles.helpCardLeftFlex}>
              <View
                style={[
                  styles.helpLeftIconWrapper,
                  {backgroundColor: theme.helpLeftIconBG},
                ]}>
                <Image source={AppIssue} />
              </View>
              <Text style={[styles.helpLeftTexts, {color: theme.text}]}>
              {t('app_issues')}
              </Text>
            </View>
            <View style={styles.helpCardRightFlex}>
              <View style={styles.cardRightCopy}>
                <Image source={theme.type == 'dark' ? HelpRight : Help} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.helpMessageBtnWrapper}>
          <View style={styles.headPhoneImgFlex}>
            <View
              style={[
                styles.headPhoneImgWrapper,
                {backgroundColor: theme.helpLeftIconBG},
              ]}>
              <Image source={HeadPhones} width={24} height={24} />
            </View>
          </View>
          <Text style={[styles.helpMessageText, {color: theme.text}]}>
          {t('still_need_help_contact_our_support_team')}
          </Text>
          <TouchableOpacity
            style={[
              styles.messageButtonWrapper,
              {backgroundColor: theme.emphasis},
            ]}
            onPress={() => navigation.navigate('Chat')}>
            <Text style={[styles.messageButtonText, {color: '#fff'}]}>
            {t('message_us')}
            </Text>
            <View>
              <Image source={MessageIcon} width={20} height={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  mainWrapper: {
    // backgroundColor: '#280D2C',
    padding: 10,
  },
  listSearchWrapper: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 1000,
    // backgroundColor: "#362538",
    marginVertical: 16,
  },
  listSearchText: {
    // color: "#FFF",
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    textTransform: 'capitalize',
    width: '100%',
  },
  helpCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    // backgroundColor: '#362538',
    marginBottom: 10,
  },
  helpCardLeftFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  helpLeftIconWrapper: {
    padding: 8,
    // backgroundColor: '#f4345929',
    borderRadius: 8,
  },
  helpLeftTexts: {
    // color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  helpCardRightFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardRightText: {
    // color: '#F43459',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardRightCopy: {},
  helpMessageBtnWrapper: {
    marginTop: 25,
  },
  headPhoneImgFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headPhoneImgWrapper: {
    padding: 8,
    borderRadius: 8,
    // backgroundColor: '#f4345929',
  },
  helpMessageText: {
    // color: 'white',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 8,
  },
  messageButtonWrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    // backgroundColor: '#F43459',
    marginTop: 16,
    gap: 5,
  },
  messageButtonText: {
    // color: 'white',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
  },
});
