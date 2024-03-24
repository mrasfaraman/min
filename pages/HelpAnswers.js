import React, {useContext} from 'react';
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
import HeadPhones from '../assets/images/headphones.png';
import MessageIcon from '../assets/images/chat-dots.png';
import {ThemeContext} from '../context/ThemeContext';

const HelpAnswers = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const data = [
    {
      question: 'q. What payment methods are supported?',
      answer:
        'Amet lectus dui et tellus velit cursus vitae id. Tincidunt eu tincidunt turpis ac.',
    },
    {
      question: 'q. What payment methods are supported?',
      answer:
        'Amet lectus dui et tellus velit cursus vitae id. Tincidunt eu tincidunt turpis ac.',
    },
  ];
  const MessageCard = ({val}) => {
    console.log('My ', val?.item?.question);
    return (
      <View style={[styles.messageCardWrapper, {backgroundColor: theme.menuItemBG}]}>
        <Text style={[styles.questionText, {color: theme.text}]}>{val?.item?.question}</Text>
        <Text style={[styles.answerText, {color: theme.text}]}>{val?.item?.answer}</Text>
      </View>
    );
  };
  return (
    <ScrollView
      style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
      <Header title={'Help & Support'} onBack={() => navigation.goBack()} />
      <View
        style={[styles.listSearchWrapper, {backgroundColor: theme.menuItemBG}]}>
        <Image source={theme.type == 'dark' ? ListSearch : ListSearchDark} alt="search" />
        <TextInput
          placeholder="What issue are you facing?"
          style={[styles.listSearchText, {color: theme.text}]}
          placeholderTextColor={theme.text}
        />
      </View>
      <View>
        <FlatList data={data} renderItem={data => <MessageCard val={data} />} />
      </View>
      <View style={styles.helpMessageBtnWrapper}>
        <View style={styles.headPhoneImgFlex}>
          <View style={[styles.headPhoneImgWrapper, {backgroundColor: theme.helpLeftIconBG}]}>
            <Image source={HeadPhones} width={24} height={24} />
          </View>
        </View>
        <Text style={[styles.helpMessageText, {color: theme.text}]}>
          still need help? contact our support team
        </Text>
        <TouchableOpacity style={[styles.messageButtonWrapper, {backgroundColor: theme.emphasis}]}>
          <Text style={[styles.messageButtonText, {color: '#fff'}]}>Message Us</Text>
          <View>
            <Image source={MessageIcon} width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HelpAnswers;

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
    borderRadius: 100,
    // backgroundColor: "#362538",
    marginVertical: 16,
  },
  listSearchText: {
    // color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    textTransform: 'capitalize',
    width: '100%',
  },
  messageCardWrapper: {
    padding: 12,
    borderRadius: 12,
    // backgroundColor: '#362538',
    marginBottom: 12,
    gap: 8,
  },
  questionText: {
    // color: '#FFF',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  answerText: {
    // color: '#FFF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  //
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
    // backgroundColor: 'rgba(244, 52, 89, 0.16)',
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
