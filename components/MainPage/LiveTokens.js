import React, {useContext, useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import AssetGridColumn from '../../assets/images/asset-layout-grid.png';
import AssetGridColumnDark from '../../assets/images/asset-layout-grid-dark.png';
import AssetCoinIcon from '../../assets/images/asset_coin_icon.png';
import AssetGraph from '../../assets/images/asset_graph.png';
import AssetLasticon from '../../assets/images/asset_last_icon.png';
import {ThemeContext} from '../../context/ThemeContext';
import MaroonSpinner from '../Loader/MaroonSpinner';
// import { fetchCoins } from '../../utils/function';
import Sparkline from '../Sparkline ';
import {useAuth} from '../../context/AuthContext';
import {LineChart} from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import i18n from '../../pages/i18n';


const LiveToken = ({navigation,address}) => {
  const [coins, setCoins] = useState([]);
  const [symbol, setSymbol] = useState('')
  const [switchEnables, setSwitchEnables] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(true); // State to trigger screen reload

  const getSwitchData = async () => {
    const existingDataJson = await AsyncStorage.getItem('switchs');
    let existingData = existingDataJson ? JSON.parse(existingDataJson) : [];
    setSwitchEnables(existingData);
  };

  useEffect(() => {
    const intervalId = setInterval(getSwitchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {

    const loadSelectedS = async () => {
      try {
        const currencyS = await AsyncStorage.getItem('selectedS');
        if (currencyS) {
          setSymbol(currencyS);
          console.log("code is :", currencyS)
          // setReloadFlag(prevFlag => !prevFlag); // Trigger reload on initial load
        }
      } catch (error) {
        console.error('Error loading selected currency S:', error);
      }
    };
    navigation.addListener('focus', ()=>{

      loadSelectedS();
    } )
  }, [navigation]); 
  useEffect(() => {
    const loadSelectedCode = async () => {
      try {
        const currencyCode = await AsyncStorage.getItem('selectedCode');
        if (currencyCode) {
          setCurrencycode(currencyCode);
          console.log('code is :', currencyCode);
          setReloadFlag(prevFlag => !prevFlag); // Trigger reload on initial load
        }
      } catch (error) {
        console.error('Error loading selected currency code:', error);
      }
    };
    navigation.addListener('focus', () => {
      loadSelectedCode();
    });
  }, [navigation]);

  useEffect(() => {
    const getCoinsData = async () => {
      if (!currencycode) return; // Ensure currency code is available before fetching data
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: currencycode,
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: true,
              price_change_percentage: '24h',
            },
          },
        );
        setCoins(response.data);
      } catch (error) {
        console.log('Error fetching coins:', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
          console.log('Response status:', error.response.status);
          console.log('Response headers:', error.response.headers);
        }
      }
    };
  
    getCoinsData();
  }, [currencycode, reloadFlag]);
  
  const [currencycode, setCurrencycode] = useState('');

  useEffect(() => {
    // loadSelectedCode();

    const setInitialLoader = () => {
      setLoader(true);
      const timer = setTimeout(() => {
        setLoader(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    setInitialLoader(); // Call initial loader when component mounts

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Currency Code:', currencycode); // Log currency code when screen gains focus
    });
    return unsubscribe;
  }, [navigation]);

  const [isGrid, setIsGrid] = useState(false);
  const {theme} = useContext(ThemeContext);
  const {selectedAccount} = useAuth();
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
  const [loader, setLoader] = useState(false);
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [selectedAccount]);
  ////////////////////////////////////////////////////////////////////////////////////////
  /////////////
  // Box Grid
  const RenderCard = ({item, index}) => {
    let enabled = switchEnables.find(i => i.index === index)?.switch;
    if (enabled == undefined) {
    } else if (!enabled) {
      return;
    }
    
    return (
      <View
        style={[
          styles.renderCardWrapper,
          {backgroundColor: theme.menuItemBG},

          theme.type != 'dark'
            ? {borderWidth: 1, borderColor: theme.buttonBorder}
            : {},
        ]}>
        <View style={styles.coinDetailWrapper}>
          <View>
            <Image
              style={styles.pancakeLeftImage}
              source={{uri: item?.image}}
            />
          </View>
          <View>
            <Text style={[styles.assetCoinSymbol, {color: theme.text}]}>
              {item?.name?.substring(0, 12)}
            </Text>

            <Text style={[styles.assetCoinName, {color: theme.amountGreen}]}>
              24h: {item?.price_change_percentage_24h}%
            </Text>
          </View>
        </View>
        <View style={styles.graphWrapper}>
          {/* <Image source={AssetGraph} /> */}
          <LineChart
            style={{height: 50, width: 150}}
            data={item?.sparkline_in_7d?.price}
            svg={{stroke: 'green', strokeWidth: 2}}
            contentInset={{top: 0, bottom: 0}}
          />
          {/* <Text style={[styles.assetCoinName, { color: theme.text }]}>
          {item?.symbol.toUpperCase()}
        </Text> */}
        </View>
        <View style={styles.assetCardLastWrapper}>
          <View>
            <Text style={[styles.assetLastPrice, {color: theme.text}]}>
              {item?.symbol?.toUpperCase()} {symbol}{item?.current_price}
            </Text>
            <Text style={[styles.assetLastStoke, {color: theme.text}]}>
              {item?.last_updated}
            </Text>
          </View>
          <View>
            <View style={styles.assetLastRightImgWrapperFlex}>
              <Image source={{uri: item?.image}} />
              {/* <Text style={[styles.assetLastSymbol, { color: theme.text }]}>
            {item?.last_updated}
          </Text> */}
            </View>
          </View>
        </View>
      </View>
    );
  };
  // Box Row
  const RenderCardGrid = ({item, index}) => {
    let enabled = switchEnables.find(i => i.index === index)?.switch;
    if (enabled == undefined) {
    } else if (!enabled) {
      return;
    }
    return (
      <View
        style={[
          styles.renderCardWrapperGrid,
          {backgroundColor: theme.menuItemBG, marginBottom: 10},
          theme.type != 'dark'
            ? {borderWidth: 1, borderColor: theme.buttonBorder}
            : {},
        ]}>
        <View style={styles.coinDetailWrapper}>
          <View>
            <Image
              style={styles.pancakeLeftImage}
              source={{uri: item?.image}}
            />
          </View>
          <View>
            <Text style={[styles.assetCoinSymbol, {color: theme.text}]}>
              {item?.name}
            </Text>
            <Text style={[styles.assetCoinName, {color: theme.amountGreen}]}>
              24h: {item?.price_change_percentage_24h}%
            </Text>
          </View>
        </View>
        <View style={styles.graphWrapperGrid}>
          {/* <Image style={{ width: '100%' }} source={AssetGraph} /> */}
          <Sparkline data={item?.sparkline_in_7d.price} />
        </View>
        <View style={styles.assetCardLastWrapper}>
          <View>
            <Text style={[styles.assetLastPrice, {color: theme.text}]}>
              {symbol}{item?.current_price}
            </Text>
            {/* <Text style={[styles.assetLastStoke, { color: theme.text }]}>
              {item.market_cap}
            </Text> */}
          </View>
          {/* <View>
            <View style={styles.assetLastRightImgWrapperFlex}>
              <Image source={AssetLasticon} />
              <Text style={[styles.assetLastSymbol, {color: theme.text}]}>
                ETH
              </Text>
            </View>
          </View> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.assetMainWrapper}>
      {address?.length === 23 ? (
        ''
      ) : (
        <>
          <View style={styles.assetHeader}>
            <Text style={[styles.assetHeaderText, {color: theme.text}]}>
            {t('hot')} 🔥
            </Text>
            {isGrid && (
              <View
                style={[
                  styles.assetAddBtn,
                  {
                    borderColor: theme.buttonBorder,
                    backgroundColor: theme.menuItemBG,
                  },
                ]}>
                <TouchableOpacity
                  style={{paddingHorizontal: 70, paddingVertical: 3}}
                  onPress={() => navigation.navigate('TokenList')}>
                  <Text style={[styles.assetAddBtnText, {color: theme.text}]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={() => setIsGrid(!isGrid)}>
              <Image
                source={
                  theme.type == 'dark' ? AssetGridColumn : AssetGridColumnDark
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.assetPlusFlex}>
            {!isGrid && (
              <View
                style={[
                  styles.assetAddBtn,
                  {
                    borderColor: theme.addButtonBorder,
                    backgroundColor: theme.addButtonBG,
                  },
                ]}>
                <TouchableOpacity
                  style={{padding: 11.47}}
                  onPress={() => navigation.navigate('TokenList')}>
                  <Text
                    style={[
                      styles.assetAddBtnText,
                      {
                        color:
                          theme.name == 'theme3'
                            ? theme.screenBackgroud
                            : theme.text,
                      },
                    ]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {loader ? (
              <MaroonSpinner />
            ) : (
              <FlatList
                data={coins}
                keyExtractor={item => item.id}
                renderItem={({item, index}) =>
                  isGrid ? (
                    <RenderCardGrid item={item} index={index} />
                  ) : (
                    <RenderCard item={item} index={index} />
                  )
                }
                horizontal={!isGrid}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default LiveToken;

const styles = StyleSheet.create({
  assetMainWrapper: {
    marginTop: 25,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center ',
  },
  assetHeaderText: {
    // color: "#FFF",
    fontSize: 15.293,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 17.205,
  },
  pancakeLeftImage: {
    width: 46,
    height: 46,
  },
  assetPlusFlex: {
    marginTop: 10,
    flexDirection: 'row',
  },
  assetAddBtn: {
    // padding: 11.47,
    borderRadius: 30,
    borderWidth: 1,
    // borderColor: '#FF003C',
    // backgroundColor: "#362538",
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  assetAddBtnText: {
    // color: "white"
  },
  // //////////////////// Render Cards ////////////////////
  renderCardWrapper: {
    width: 184.472,
    height: 185.428,
    padding: 11.47,
    borderRadius: 30.586,
    // backgroundColor: "#362538",
    marginHorizontal: 5,
  },
  renderCardWrapperGrid: {
    // width: 184.472,
    // height: 185.428,
    padding: 11.47,
    borderRadius: 20.586,
    // backgroundColor: "#362538",
    marginHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  coinDetailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  assetCoinSymbol: {
    // color: "#FFF",
    fontSize: 17.205,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 17.205,
  },
  assetCoinName: {
    // color: "#FFF",
    fontSize: 13.381,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 17.205,
  },
  graphWrapper: {
    marginTop: 10,
    marginBottom: 15,
  },
  graphWrapperGrid: {
    // marginTop: 10,
    // marginBottom: 15,
    width: 70,
  },
  assetCardLastWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  assetLastPrice: {
    // color: "#FFF",
    fontSize: 19.116,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 22.94,
  },
  assetLastStoke: {
    // color: "#FFF",
    fontSize: 11.47,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 15.293,
  },
  assetLastRightImgWrapperFlex: {
    flexDirection: 'row',
    gap: 4,
  },
  assetLastSymbol: {
    // color: "#FFF",
    fontSize: 11.47,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 15.293,
  },
});
