import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/header';
import {ThemeContext} from '../context/ThemeContext';
import PrivateKeyModal from '../components/setting/PrivateKeyModal';
import {useAuth} from '../context/AuthContext';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {enrollFingerprint} from '../utils/BiometricUtils';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({navigation}) {
  const [darkMode, setDarkMode] = useState(false);
  const {theme, switchTheme} = useContext(ThemeContext);
  const {selectedAccount} = useAuth();
  const [selectedAccountKey, setSelectedAccountKey] = useState();
  const {t} = useTranslation();
  const [currency, setCurrency] = useState('');
  const [name, setName] = useState();

  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSelectedAccountKey(selectedAccount);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedAccount]);

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
    const loadName = async () => {
      try {
        const Name = await AsyncStorage.getItem('selectedName');
        if (Name) {
          setName(Name);
        }
      } catch (error) {
        console.error('Error loading selected Name:', error);
      }
    };
    loadName();
  }, []);

  const handleName = async () => {
    try {
      const Name = await AsyncStorage.getItem('selectedName');
      if (Name) {
        setName(Name);
      }
    } catch (error) {
      console.error('Error loading selected Name:', error);
    }
  };

  useEffect(() => {
    const loadSelectedCurrency = async () => {
      try {
        const currencyName = await AsyncStorage.getItem('selectedCurrency');
        if (currencyName) {
          setCurrency(currencyName);
        }
      } catch (error) {
        console.error('Error loading selected currency:', error);
      }
    };
    loadSelectedCurrency();
  }, []);
  // useEffect(() => {
  //   const loadSelectedCode = async () => {
  //     try {
  //       const currencyCode = await AsyncStorage.getItem('selectedCode');
  //       if (currencyCode) {
  //         setCurrency(currencyCode);
  //       }
  //     } catch (error) {
  //       console.error('Error loading selected currency code:', error);
  //     }
  //   };
  //   loadSelectedCode();
  // }, []);
  // Function to handle currency change
  // const handleCurrencyCode = async () => {
  //   try {
  //     const currencyCode = await AsyncStorage.getItem('selectedCode');
  //     if (currencyCode) {
  //       setCurrencycode(currencyCode);
  //     }
  //   } catch (error) {
  //     console.error('Error loading selected currency code:', error);
  //   }
  // };
  const handleCurrencyChange = async () => {
    try {
      const currencyName = await AsyncStorage.getItem('selectedCurrency');
      if (currencyName) {
        setCurrency(currencyName);
      }
    } catch (error) {
      console.error('Error loading selected currency:', error);
    }
  };
  // Subscribe to navigation focus event
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleCurrencyChange();
      handleName()
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (theme.type == 'light') {
      setDarkMode(false);
    } else setDarkMode(true);
  }, [theme.type]);
  
  return (
    <View style={{flex: 1, backgroundColor: theme.screenBackgroud}}>
      <SafeAreaView>
        <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
          <Header
            title={t('settings')}
            skipOption={false}
            onBack={() => navigation.goBack()}
          />
          <View style={[styles.container]}>
            <View style={styles.Menu}>
              <Text style={[styles.header, {color: theme.text}]}>
                {t('themes')}
              </Text>
              <View
                style={[
                  styles.menuItemBig,
                  {backgroundColor: theme.menuItemBG},
                ]}>
                <View style={styles.leftItem}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/palette.png')
                        : require('../assets/images/palette-dark.png')
                    }
                  />
                  <Text style={[styles.menuItemText, {color: theme.text}]}>
                    {t('mode')}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setDarkMode(!darkMode);
                    theme.type == 'dark'
                      ? switchTheme('theme2')
                      : switchTheme('theme1');
                  }}
                  style={[
                    styles.rightItem,
                    {backgroundColor: theme.rightArrowBG},
                  ]}>
                  <View
                    style={
                      darkMode
                        ? [{backgroundColor: theme.mode}, styles.mode]
                        : ''
                    }>
                    <Image source={require('../assets/images/moon.png')} />
                  </View>
                  <View
                    style={
                      !darkMode
                        ? [{backgroundColor: theme.mode}, styles.mode]
                        : ''
                    }>
                    <Image source={require('../assets/images/sun.png')} />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ThemesScreen')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/palette.png')
                          : require('../assets/images/palette-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('themes')}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.rightArrow,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/arrow-right.png')
                          : require('../assets/images/arrow-right-dark.png')
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.Menu}>
              <Text style={[styles.header, {color: theme.text}]}>
                {t('general')}
              </Text>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Themes')}>
              <View
                style={[
                  styles.menuItemBig,
                  { backgroundColor: theme.menuItemBG },
                  styles.menuItem,
                ]}>
                <View style={styles.leftItem}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/wallet.png')
                        : require('../assets/images/wallet-dark.png')
                    }
                  />
                  <Text style={[styles.menuItemText, { color: theme.text }]}>
                    Connect Wallet
                  </Text>
                </View>

                <View
                  style={[
                    styles.rightArrow,
                    { backgroundColor: theme.rightArrowBG },
                  ]}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/arrow-right.png')
                        : require('../assets/images/arrow-right-dark.png')
                    }
                  />
                </View>
              </View>
            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateAccount')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/wallet.png')
                          : require('../assets/images/wallet-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('create_new_account')}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.rightArrow,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/arrow-right.png')
                          : require('../assets/images/arrow-right-dark.png')
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ImportWallet')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/wallet.png')
                          : require('../assets/images/wallet-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('import_account')}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.rightArrow,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/arrow-right.png')
                          : require('../assets/images/arrow-right-dark.png')
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AddToken')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/wallet.png')
                          : require('../assets/images/wallet-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('import_token_network')}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.rightArrow,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/arrow-right.png')
                          : require('../assets/images/arrow-right-dark.png')
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Networks')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/wallet.png')
                          : require('../assets/images/wallet-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('networks')}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.rightArrow,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/arrow-right.png')
                          : require('../assets/images/arrow-right-dark.png')
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {selectedAccountKey?.solana?.secretKey != '----' && (
                <PrivateKeyModal
                  privateKey={selectedAccountKey?.solana?.secretKey}
                  label="Solana"
                />
              )}
              {selectedAccountKey?.evm?.privateKey != '----' && (
                <PrivateKeyModal
                  privateKey={selectedAccountKey?.evm?.privateKey}
                  label="Evm"
                />
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPasswordScreen')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/lock.png')
                          : require('../assets/images/lock-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('reset_password')}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.rightArrow,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/arrow-right.png')
                          : require('../assets/images/arrow-right-dark.png')
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={async () => await enrollFingerprint()}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/lock.png')
                          : require('../assets/images/lock-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('set_biometric_verification')}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.rightArrow,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/arrow-right.png')
                          : require('../assets/images/arrow-right-dark.png')
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CurrencyScreen')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/currency-dollar-circle.png')
                          : require('../assets/images/currency-dollar-circle-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('currency')}
                    </Text>
                  </View>

                  <View style={[styles.rightItemWithText, {color: theme.text}]}>
                    <Text style={[styles.rightItemText, {color: theme.text}]}>
                      {currency}  
                    </Text>
                    <View
                      style={[
                        styles.rightItem,
                        {backgroundColor: theme.rightArrowBG},
                      ]}>
                      <View
                        style={[
                          styles.rightArrow,
                          {backgroundColor: theme.rightArrowBG},
                        ]}>
                        <Image
                          source={
                            theme.type == 'dark'
                              ? require('../assets/images/arrow-right.png')
                              : require('../assets/images/arrow-right-dark.png')
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LanguageScreen')}>
                <View
                  style={[
                    styles.menuItemBig,
                    {backgroundColor: theme.menuItemBG},
                    styles.menuItem,
                  ]}>
                  <View style={styles.leftItem}>
                    <Image
                      source={
                        theme.type == 'dark'
                          ? require('../assets/images/translate.png')
                          : require('../assets/images/translate-dark.png')
                      }
                    />
                    <Text style={[styles.menuItemText, {color: theme.text}]}>
                      {t('language')}
                    </Text>
                  </View>

                  <View style={[styles.rightItemWithText, {color: theme.text}]}>
                    {/* <Image source={require('../assets/images/Eng.png')} /> */}
                    <Text style={[styles.rightItemText, {color: theme.text}]}>
                      {name}
                    </Text>
                    <View
                      style={[
                        styles.rightItem,
                        {backgroundColor: theme.rightArrowBG},
                      ]}>
                      <View
                        style={[
                          styles.rightArrow,
                          {backgroundColor: theme.rightArrowBG},
                        ]}>
                        <Image
                          source={
                            theme.type == 'dark'
                              ? require('../assets/images/arrow-right.png')
                              : require('../assets/images/arrow-right-dark.png')
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Themes')}>
                {/* <View
                style={[
                  styles.menuItemBig,
                  { backgroundColor: theme.menuItemBG },
                  styles.menuItem,
                ]}>
                <View style={styles.leftItem}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/gift.png')
                        : require('../assets/images/gift-dark.png')
                    }
                  />
                  <Text style={[styles.menuItemText, { color: theme.text }]}>
                    Invite Friends
                  </Text>
                </View>

                <View
                  style={[
                    styles.rightArrow,
                    { backgroundColor: theme.rightArrowBG },
                  ]}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/arrow-right.png')
                        : require('../assets/images/arrow-right-dark.png')
                    }
                  />
                </View>
              </View> */}
              </TouchableOpacity>
            </View>
            <View style={styles.Menu}>
            <Text style={[styles.header, {color: theme.text}]}>Others</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Themes')}>
              <View
                style={[
                  styles.menuItemBig,
                  {backgroundColor: theme.menuItemBG},
                  styles.menuItem,
                ]}>
                <View style={styles.leftItem}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/thumbs-up.png')
                        : require('../assets/images/thumbs-up-dark.png')
                    }
                  />
                  <Text style={[styles.menuItemText, {color: theme.text}]}>
                    Rate Our App
                  </Text>
                </View>

                <View
                  style={[
                    styles.rightArrow,
                    {backgroundColor: theme.rightArrowBG},
                  ]}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/arrow-right.png')
                        : require('../assets/images/arrow-right-dark.png')
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Help')}>
              <View
                style={[
                  styles.menuItemBig,
                  {backgroundColor: theme.menuItemBG},
                  styles.menuItem,
                ]}>
                <View style={styles.leftItem}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/headphone.png')
                        : require('../assets/images/headphone-dark.png')
                    }
                  />
                  <Text style={[styles.menuItemText, {color: theme.text}]}>
                    Customer Support
                  </Text>
                </View>

                <View
                  style={[
                    styles.rightArrow,
                    {backgroundColor: theme.rightArrowBG},
                  ]}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/arrow-right.png')
                        : require('../assets/images/arrow-right-dark.png')
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
              <View
                style={[
                  styles.menuItemBig,
                  {backgroundColor: theme.menuItemBG},
                  styles.menuItem,
                ]}>
                <View style={styles.leftItem}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/info-circle.png')
                        : require('../assets/images/info-circle-dark.png')
                    }
                  />
                  <Text style={[styles.menuItemText, {color: theme.text}]}>
                    About App
                  </Text>
                </View>

                <View style={[styles.rightItemWithText, {color: theme.text}]}>
                  <Text style={[styles.rightItemText, {color: theme.text}]}>
                    v4.30.0
                  </Text>
                  <View
                    style={[
                      styles.rightItem,
                      {backgroundColor: theme.rightArrowBG},
                    ]}>
                    <View
                      style={[
                        styles.rightArrow,
                        {backgroundColor: theme.rightArrowBG},
                      ]}>
                      <Image
                        source={
                          theme.type == 'dark'
                            ? require('../assets/images/arrow-right.png')
                            : require('../assets/images/arrow-right-dark.png')
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Themes')}>
              <View
                style={[
                  styles.menuItemBig,
                  {backgroundColor: theme.menuItemBG},
                  styles.menuItem,
                ]}>
                <View style={styles.leftItem}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/share.png')
                        : require('../assets/images/share-dark.png')
                    }
                  />
                  <Text style={[styles.menuItemText, {color: theme.text}]}>
                    Share App
                  </Text>
                </View>

                <View
                  style={[
                    styles.rightArrow,
                    {backgroundColor: theme.rightArrowBG},
                  ]}>
                  <Image
                    source={
                      theme.type == 'dark'
                        ? require('../assets/images/arrow-right.png')
                        : require('../assets/images/arrow-right-dark.png')
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // screen: {
  //   // backgroundColor: '#280D2C',
  // },
  container: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  Menu: {
    marginVertical: 12,
  },
  header: {
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  menuItemBig: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    // backgroundColor: '#362538',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  menuItem: {
    paddingVertical: 14,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 100,
    // backgroundColor: '#4E3B51',
    padding: 4,
  },
  rightItemWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  rightItemText: {
    // backgroundColor: '#362538',
    // color: "white"
  },
  menuItemText: {
    // color: '#FFF',
    marginLeft: 12,
    fontFamily: 'SF Pro Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  mode: {
    borderRadius: 1000,
    // backgroundColor: '#F43459',
    padding: 4,
  },
  rightArrow: {
    width: 20,
    height: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 1000,
    // backgroundColor: '#4E3B51',
  },
});
