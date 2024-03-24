import React, {useState, useContext} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Header from '../components/header';
import {ThemeContext} from '../context/ThemeContext';

const LANGUAGES = [
  {
    language: 'English',
    lang: 'Eng',
    flag: require('../assets/images/Eng.png'),
  },
  {
    language: 'Indian',
    lang: 'Indian',
    flag: require('../assets/images/Indian.png'),
  },
  {
    language: 'Spain',
    lang: 'Spain',
    flag: require('../assets/images/Spain.png'),
  },
  {
    language: 'French',
    lang: 'French',
    flag: require('../assets/images/French.png'),
  },
  {
    language: 'Russian',
    lang: 'Russian',
    flag: require('../assets/images/Russian.png'),
  },
  {
    language: 'Arabic',
    lang: 'Arabic',
    flag: require('../assets/images/Arabic.png'),
  },
  {
    language: 'German',
    lang: 'German',
    flag: require('../assets/images/German.png'),
  },
  {
    language: 'Chinese',
    lang: 'Chinese',
    flag: require('../assets/images/Chinese.png'),
  },
  {
    language: 'English',
    lang: 'UK',
    flag: require('../assets/images/UK.png'),
  },
];
export default function LanguageScreen({navigation}) {
  const [language, setLanguage] = useState('Eng');
  const {theme} = useContext(ThemeContext);

  function renderItem({item}) {
    // const {flag} = item;
    return (
      <TouchableOpacity
        onPress={() => setLanguage(item.lang)}
        style={
          language === item.lang
            ? [
                {
                  backgroundColor: theme.menuItemBG,
                  borderColor: theme.langItmBorder,
                },
                styles.item,
                styles.selected,{ borderColor: theme.emphasis}
              ]
            : [
                {
                  backgroundColor: theme.menuItemBG,
                  borderColor: theme.langItmBorder,
                },
                styles.item,
              ]
        }>
        <View style={styles.itemLeft}>
          <Image source={item.flag} />
          <Text style={{color: theme.text}}>{item.language}</Text>
        </View>
        <View>
          <RadioButton value={item.lang} color={theme.emphasis} />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
      <Header
        title={'Language'}
        skipOption={false}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={[styles.input, {backgroundColor: theme.menuItemBG}]}>
          <Image
            style={styles.imgStyle}
            source={theme.type == 'dark' ? require('../assets/images/search-md.png') : require('../assets/images/list-search-dark.png')}
          />
          <TextInput
            style={[styles.searchInput, {color: theme.text}]}
            placeholder="Search"
            placeholderTextColor={theme.text}
          />
        </View>
        <RadioButton.Group
          onValueChange={lang => setLanguage(lang)}
          value={language}>
          <FlatList data={LANGUAGES} renderItem={renderItem} />
        </RadioButton.Group>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // screen: {
  //   // backgroundColor: '#280D2C',
  // },
  container: {
    marginVertical: 24,
    marginHorizontal: 16,
    gap: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    // border: 1px solid #313843;
    borderWidth: 1,
    borderStyle: 'solid',
    // borderColor: '#313843',
    // marginVertical: 12,
    marginBottom: 12,
    // backgroundColor: '#362538',
  },
  itemLeft: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    // justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
    // gap: 188,
    // alignSelf: 'stretch',
  },
  selected: {
    borderRadius: 16,
    // border: '2px solid var(--Secodary, #F43459)',
    borderWidth: 2,
    // borderColor: '#F43459',
    borderStyle: 'solid',

    // backgroundColor: '#362538',
  },
  input: {
    flexDirection: 'row',
    // backgroundColor: '#362538',
    alignItems: 'center',
    padding: 14,
    paddingVertical: 0,
    justifyContent: 'flex-start',
    borderRadius: 1000,
  },
  imgStyle: {
    width: 24,
    height: 24,
  },
  searchInput: {
    minWidth: '100%',
    // color: 'white',
  },
});
