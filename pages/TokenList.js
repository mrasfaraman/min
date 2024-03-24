import React, {useContext , useEffect , useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Alert,
  Switch,
} from 'react-native';
import ListSearch from '../assets/images/list-search.png';
import ListSearchDark from '../assets/images/list-search-dark.png';
import PancakeImage from '../assets/images/pancake-image.png';
import Header from '../components/header';
import BottomMenu from '../components/BottomMenu';
import AddButton from '../components/AddButton';
import {ThemeContext} from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { fetchCoins } from '../utils/function';
import MaroonSpinner from '../components/Loader/MaroonSpinner';
import { LineChart } from 'react-native-svg-charts';
import Sparkline from '../components/Sparkline ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const TokenList = ({navigation}) => {

  const {theme} = useContext(ThemeContext);
  const {Tokens , removeToken , selectedAccount , selectedNetwork} = useAuth();
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(false)
  const [StateStorage, setStateStorage] = useState([])
  const data = Tokens;
  
  // State to hold the value of the switch
  const [isEnabled, setIsEnabled] = useState(false);
  const [switchEnables, setSwitchEnables] = useState([]);
  
  const [activeNet, setActiveNet] = useState()
  const getNetworkactive = async () => {
    let data = await JSON.parse(selectedNetwork)
    setActiveNet(data)
  }

  useEffect(() => {
    getNetworkactive()
  }, [selectedNetwork, setActiveNet])
  useEffect(() => {
    getNetworkactive()
  }, [])

  const saveOrUpdateData = async (dataObject) => {
    try {
      // Retrieve the existing data from AsyncStorage
      const existingDataJson = await AsyncStorage.getItem('switchs');
      let existingData = existingDataJson ? JSON.parse(existingDataJson) : [];
  
      // Find the index of the object with the same 'index' as the newData object
      const dataIndex = existingData.findIndex(item => item.index === dataObject.index);
  
      if (dataIndex !== -1) {
        // Object exists, toggle its 'switch' value
        existingData[dataIndex].switch = !existingData[dataIndex].switch;
      } else {
        // Object doesn't exist, add it with its 'switch' value set initially
        existingData.push(dataObject);
      }
  
      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem('switchs', JSON.stringify(existingData));
      setStateStorage(existingData)
      // console.log('Data saved/updated successfully:', existingData);
    } catch (error) {
      // console.error('Failed to save or update data:', error);
    }
  };

  // Function to handle the toggle switch
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const getSwitchData = async () => {
  const existingDataJson = await AsyncStorage.getItem('switchs');
  let existingData = existingDataJson ? JSON.parse(existingDataJson) : [];
  setSwitchEnables(existingData)
  }
  useEffect(()=>{
    getSwitchData()
  },[isEnabled])

  const PanCakeCard = (item) => {
    item = item.item
    const handleDelete = (data) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Confirmation',
        textBody: 'Are you sure you want to delete?',
        button: 'Delete',
        onPressButton: () => {
          removeToken(data.index)
          Dialog.hide();
        }
      })
  };

   
    return (
      <TouchableOpacity onPress={()=>handleDelete(item)}>
      <View
        style={[
          styles.panCakeCardWrapper,
          {borderBottomColor: theme.pancakeBorderBottom},
        ]}>
        <View style={styles.pancakeCardLeft}>
          <View
            style={[
              styles.pancakeLeftImgWrapper,
              {backgroundColor: theme.pancakeImgBG},
            ]}>
            {/* <Image style={styles.pancakeLeftImage} source={{uri:item.logo}} /> */}
            <Image style={styles.pancakeLeftImage} source={{ uri: item.item.logo }} />
          </View>
        </View>
        <View style={styles.pancakeCardRight}>
          <Text style={[styles.pancakeRightUpperText, {color: theme.text}]}>
            {item.item.coingekoId}
          </Text>
          <Text style={[styles.pancakeRightLowerText, {color: theme.text}]}>
            {item.item.address || item.item.token_address}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  
  const RenderCardGrid = ({ item  , index}) => {
    let enabled = switchEnables.find(i => i.index === index)?.switch ?? true;
    const handleSwitchToggle = async () => {
      await saveOrUpdateData({ index: index, switch: !enabled });
      getSwitchData()
      setSwitchEnables(current => 
        current.map(i => 
          i.index == index ? { ...i, switch: !enabled } : i
        )
      );
    };
    return (
      <View
        style={[
          styles.renderCardWrapperGrid,
          { backgroundColor: theme.menuItemBG, marginBottom: 10 },
          theme.type != 'dark'
            ? { borderWidth: 1, borderColor: theme.buttonBorder }
            : {},
        ]}>
        <View style={styles.coinDetailWrapper}>
          <View>
            <Image style={styles.pancakeLeftImage} source={{ uri: item?.image }} />
          </View>
          <View>
            <Text style={[styles.assetCoinSymbol, { color: theme.text }]}>
              {item?.name}
            </Text>
            <Text style={[styles.assetCoinName, {color: theme.amountGreen}]}>
            24h: {item?.price_change_percentage_24h}%
            </Text>
          </View>
        </View>
        <View style={styles.graphWrapperGrid}>
          {/* <Image style={{ width: '100%' }} source={AssetGraph} /> */}
          {/* <Sparkline data={item?.sparkline_in_7d.price} /> */}
        </View>
        <View style={styles.assetCardLastWrapper}>
          <View>
          <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={enabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSwitchToggle}
          value={enabled}
        />
           {/* <Text>{isEnabled ? 'Switch is ON' : ' OFF'}</Text> */}
            {/* <Text style={[styles.assetLastPrice, { color: theme.text }]}>
            ${item?.current_price}
            </Text> */}
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

  useEffect(() => {
    const getCoinsData = async () => {
      const coinData = await fetchCoins();
      setCoins(coinData);
    };
    getCoinsData();
  }, []);
  useEffect(() => {
    setLoader(true)
      const timer = setTimeout(() => {
      setLoader(false)
    }, 4000);
    return () => clearTimeout(timer);
  }, [selectedAccount]);

  return (
    <View>
      <ScrollView
        style={[styles.MainWrapper, {backgroundColor: theme.screenBackgroud}]}>
        <Header onBack={() => navigation.goBack()} title="Token List" />
        {/* <View
          style={[
            styles.listSearchWrapper,
            {backgroundColor: theme.menuItemBG},
          ]}>
          <Image source={theme.type == 'dark' ? ListSearch : ListSearchDark} alt="search" />
          <TextInput
            placeholder="Search"
            style={[styles.listSearchText, {color: theme.text}]}
            placeholderTextColor={theme.text}
          />
        </View> */}
          <View style={{position:'fixed'}} >
{activeNet?.type == 'solana' && (
  <AddButton navigation={navigation} />
)}
{activeNet?.type == 'evm' && (
  <AddButton navigation={navigation} />
)}
          </View>

        <View style={styles.bottomMenuMargin}>
        {
              loader ? <MaroonSpinner /> : 
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item , index}) =><RenderCardGrid item={item} index={index}/> }
              />
            }
          {/* <FlatList data={data} renderItem={item => <PanCakeCard item={item} />} /> */}

        </View>
        
      </ScrollView>
            {/* <View style={{position:'fixed'}} > */}
                {/* <BottomMenu navigation={navigation} /> */}
            {/* </View> */}
    </View>
  );
};

export default TokenList;

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
  MainWrapper: {
    // backgroundColor: '#280D2C',
    padding: 10,
    minHeight: '100%'
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
    // color: "#FFF",
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    textTransform: 'capitalize',
  },

  // //////////////////////// PanCake Wrapper /////////////////////////

  panCakeCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    // borderBottomColor: "#3E1844",
    borderBottomWidth: 1,
    gap: 12,
  },
  pancakeCardLeft: {},
  pancakeLeftImgWrapper: {
    width: 56,
    height: 56,
    borderRadius: 100,
    // backgroundColor: "#00FFF0",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pancakeLeftImage: {
    width: 46,
    height: 46,
  },
  pancakeRightUpperText: {
    // color: "#FFF",
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  pancakeRightLowerText: {
    // color: "#FFF",
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  bottomMenuMargin: {
    marginBottom: 20,
    marginTop:20
  },
});
