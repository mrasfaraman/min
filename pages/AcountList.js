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
import { Fab } from 'native-base';
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
import { Button } from 'react-native-paper';

const AccountList = ({navigation}) => {

  const {theme} = useContext(ThemeContext);
  const {
    Tokens , removeToken ,
    wc,
    wallet,
    setWeb3Wallet,
    Session,
    removeAccount,
    saveSession,
    selectedAccount,
    setSelectedAccount,
    Accounts,
    addAccount,
    Networks,
    selectedNetwork
  } = useAuth();
  const [loader, setLoader] = useState(false)

  
  const RenderCardGrid = ({ item  , index}) => {
    // console.log(item)
    return (
      <View
        style={[
          styles.renderCardWrapperGrid,
          { backgroundColor: theme.menuItemBG, marginBottom: 10 },
          theme.type != 'dark'
            ? { borderWidth: 1, borderColor: theme.buttonBorder }
            : {},
        ]}>
        <View style={[styles.coinDetailWrapper , {paddingTop:10, paddingBottom:7}]}>
          <View>
           <Text>{index + 1}.</Text>
          </View>
          <View>
          
          <Text style={[styles.assetCoinSymbol, { color: 'red' }]}>
            {item.name ? item?.name : `Account ${index + 1}`}
            </Text>
            <Text style={[styles.assetCoinSymbol, { color: theme.text , fontSize:12 }]}>
            EVM : {item?.evm?.address?.substring(0,25)}...
            </Text>
            <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:10}]}>
            Solana : {item?.solana?.publicKey?.substring(0,25)}...
            </Text>
            <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:10}]}>
            Bitcoin : {item?.btc?.address?.substring(0,25)}...
            </Text>
            <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:10}]}>
            Tron : {item?.tron?.address?.substring(0,25)}...
            </Text>
            <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:10}]}>
            Doge Chain : {item?.doge?.address?.substring(0,25)}...
            </Text>
          </View>
        </View>
      {index == 0 ? '' :
        <View style={styles.assetCardLastWrapper}>
          <View>
         <Button onPress={()=>{
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Confirmation',
              textBody: 'Are You Sure You Want to Delete Account?',
              button: 'Delete',
              onPressButton: () => {
                setSelectedAccount(Accounts[index - 1])
                removeAccount(index)
                Dialog.hide();
              }
            })
          }}>
            Delate
         </Button>
          </View>
        </View>
      }
      </View>
    );
  };


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
        <Header onBack={() => navigation.goBack()} title="Account List" />
          <View style={{position:'fixed'}} >
          <Fab
            renderInPortal={false}
            shadow={2}
            size="lg"
            icon={<Image source={require('../assets/images/plusIcon.png')} />}
            onPress={() => navigation.navigate('CreateAccount')}
            style={{backgroundColor: theme.emphasis}}
            />
          </View>

        <View style={styles.bottomMenuMargin}>
        {
              loader ? <MaroonSpinner /> : 
              <FlatList
                data={Accounts}
                keyExtractor={(item) => item.id}
                renderItem={({ item , index}) =><RenderCardGrid item={item} index={index}/> }
              />
            }
        </View>
        
      </ScrollView>
            {/* <View style={{position:'fixed'}} > */}
                {/* <BottomMenu navigation={navigation} /> */}
            {/* </View> */}
    </View>
  );
};

export default AccountList;

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
    fontSize: 11.381,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 10.205,
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
