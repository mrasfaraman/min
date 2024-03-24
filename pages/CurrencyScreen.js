import React, {useState, useContext, useEffect} from 'react';
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
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCIES = [
  {
    currency: 'AUD $',
    currencyname: 'aud',
    symbol: '$',
  },
  {
    currency: 'CAD $',
    currencyname: 'cad',
    symbol: '$',
  },
  {
    currency: 'USD $',
    currencyname: 'usd',
    symbol: '$',
  },
  {
    currency: 'EUR €',
    currencyname: 'eur',
    symbol: '€',
  },
  {
    currency: 'YEN ¥',
    currencyname: 'yen',
    symbol: '¥',
  },
  {
    currency: 'HKD $',
    currencyname: 'hkd',
    symbol: '$',
  },
  {
    currency: 'GBP £',
    symbol: '£', // Changed symbol
    currencyname: 'gbp',
  },
  {
    currency: 'DKK KR',
    symbol: 'KR',
    currencyname: 'dkk',
  },
];
export default function CurrencyScreen({navigation}) {
  const [currency, setCurrency] = useState('USD $');
  const [currencycode, setCurrencycode] = useState('usd');
  const [currencyS, setCurrencyS] = useState('$');

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

  useEffect(() => {
    const loadSelectedCurrency = async () => {
      try {
        const selectedCurrency = await AsyncStorage.getItem('selectedCurrency');
        if (selectedCurrency) {
          setCurrency(selectedCurrency);
        }
      } catch (error) {
        console.error('Error loading selected currency:', error);
      }
    };
    loadSelectedCurrency();
  }, []);

  const handleCurrencyChange = async (curr) => {
    try {
      await AsyncStorage.setItem('selectedCurrency', curr);

      console.log('Selected Currency:', curr);
      setCurrency(curr);
    } catch (error) {
      console.error('Error storing selected currency:', error);
    }
  };



  const handleCurrencycode = async (curr) => {
    try {
      await AsyncStorage.setItem('selectedCode', curr);

      console.log('Selected Currency code:', curr);
      setCurrencycode(curr);
    } catch (error) {
      console.error('Error storing selected currency code:', error);
    }
  };

  useEffect(() => {
    const loadSelectedCurrencyS = async () => {
      try {
        const selectedCurrencyS = await AsyncStorage.getItem('selectedS');
        if (selectedCurrencyS) {
          setCurrencyS(selectedCurrencyS);
        }
      } catch (error) {
        console.error('Error loading selected currency S:', error);
      }
    };
    loadSelectedCurrencyS();
  }, []);
  const handleCurrencycodeS = async (curr) => {
    try {
      await AsyncStorage.setItem('selectedS', curr);

      console.log('Selected Currency S:', curr);
      setCurrencyS(curr);
    } catch (error) {
      console.error('Error storing selected currency S:', error);
    }
  };
  function renderItem({item}) {
    // const {flag} = item;
    return (
      <TouchableOpacity
        onPress={() =>{
          
          handleCurrencyChange(item.currency)
          handleCurrencycode(item.currencyname)
          handleCurrencycodeS(item.symbol)
        }}
        style={
          currency === item.currency
            ? [
                {
                  borderColor: theme.langItmBorder,
                  backgroundColor: theme.menuItemBG,
                },
                styles.item,
                styles.selected,
                {
                  borderColor: theme.emphasis,
                  backgroundColor: theme.menuItemBG,
                },
              ]
            : [
                styles.item,
                {
                  borderColor: theme.langItmBorder,
                  backgroundColor: theme.menuItemBG,
                },
              ]
        }>
        <View style={styles.itemLeft}>
          <Text style={{color: theme.text}}>{item.currency}</Text>
        </View>
        <View>
          <RadioButton value={item.currency} color={theme.emphasis} />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
      <Header
        title={t('currency')}
        skipOption={false}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={[styles.input, {backgroundColor: theme.menuItemBG}]}>
          <Image
            style={styles.imgStyle}
            source={
              theme.type == 'dark'
                ? require('../assets/images/search-md.png')
                : require('../assets/images/list-search-dark.png')
            }
          />
          <TextInput
            style={[styles.searchInput, {color: theme.text}]}
            placeholder="Search"
            placeholderTextColor={theme.text}
          />
        </View>
        <RadioButton.Group
          onValueChange={curr => setCurrency(curr)}
          value={currency}>
          <FlatList data={CURRENCIES} renderItem={renderItem} />
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
