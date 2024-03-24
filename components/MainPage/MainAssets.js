import React, { useContext, useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import AssetGridColumn from '../../assets/images/asset-layout-grid.png';
import AssetGridColumnDark from '../../assets/images/asset-layout-grid-dark.png';
import AssetCoinIcon from '../../assets/images/asset_coin_icon.png';
import AssetGraph from '../../assets/images/asset_graph.png';
import AssetLasticon from '../../assets/images/asset_last_icon.png';
import { ThemeContext } from '../../context/ThemeContext';
import MaroonSpinner from '../Loader/MaroonSpinner';

import { useAuth } from '../../context/AuthContext';

const MainAssets = ({ navigation, address }) => {
  const [isGrid, setIsGrid] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { Tokens, selectedNetwork, Networks, selectedAccount } = useAuth()
  const [activeNet, setActiveNet] = useState()

  const getNetworkactive = async () => {
    let data = await JSON.parse(selectedNetwork)
    setActiveNet(data)
  }

  useEffect(() => {
    getNetworkactive()
  }, [selectedNetwork, Networks])

  const [loader, setLoader] = useState(false)
  // ///////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setLoader(true)
    const timer = setTimeout(() => {
      setLoader(false)
    }, 4000);

    // Clear the timer when the component unmounts or when the dependency array changes
    return () => clearTimeout(timer);
  }, [selectedAccount]);
  // ///////////////////////////////////////////////////////////////////////////////////////////////////

  const RenderCard = ({ item }) => {

    let solActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
    if (activeNet?.type === "solana") {
      if (!solActive) {
        return null
      }
    } else if (item?.rpc !== activeNet?.nodeURL) {
      return null
    }

    return (
      <View
        style={[
          styles.renderCardWrapper,
          { backgroundColor: theme.menuItemBG },
          theme.type != 'dark'
            ? { borderWidth: 1, borderColor: theme.buttonBorder }
            : {},
        ]}>
        <View style={styles.coinDetailWrapper}>
          <View>
            <Image style={styles.pancakeLeftImage} source={{ uri: item.logo }} />
          </View>
          <View>
            <Text style={[styles.assetCoinSymbol, { color: theme.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.assetCoinName, { color: theme.text }]}>
              {item.symbol}
            </Text>
          </View>
        </View>
        <View style={styles.graphWrapper}>
          <Image source={AssetGraph} />
        </View>
        <View style={styles.assetCardLastWrapper}>
          <View>
            <Text style={[styles.assetLastPrice, { color: theme.text }]}>
              {Number(item.balance).toFixed(4)}  {item.symbol.toUpperCase()}
            </Text>
            <Text style={[styles.assetLastStoke, { color: theme.text }]}>
              Decimal
            </Text>
          </View>
          <View>
            <View style={styles.assetLastRightImgWrapperFlex}>
              <Image source={AssetLasticon} />
              <Text style={[styles.assetLastSymbol, { color: theme.text }]}>
                {item.decimals}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const RenderCardGrid = ({ item }) => {
    let solsActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
    if (activeNet?.type === "solana") {
      if (!solsActive) {
        return null
      }
    } else if (item?.rpc !== activeNet?.nodeURL) {
      return null
    }

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
            <Image style={styles.pancakeLeftImage} source={{ uri: item.logo }} />
          </View>
          <View>
            <Text style={[styles.assetCoinSymbol, { color: theme.text }]}>
              {item.name}
            </Text>
            {/* <Text style={[styles.assetCoinName, {color: theme.amountGreen}]}>
              +4.48%
            </Text> */}
          </View>
        </View>
        <View style={styles.graphWrapperGrid}>
          <Image style={{ width: '100%' }} source={AssetGraph} />
        </View>
        <View style={styles.assetCardLastWrapper}>
          <View>
            <Text style={[styles.assetLastPrice, { color: theme.text }]}>
              {Number(item.balance).toFixed(3)} {item.symbol.toUpperCase()}
            </Text>
            <Text style={[styles.assetLastStoke, { color: theme.text }]}>
              {item.decimals}  Decimal
            </Text>
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
      {address?.length === 23 ? "" :
        <>
          <View style={styles.assetHeader}>
            <Text style={[styles.assetHeaderText, { color: theme.text }]}>
              Assets
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
                  style={{ paddingHorizontal: 70, paddingVertical: 3 }}
                  onPress={() => navigation.navigate('TokenList')}>
                  <Text style={[styles.assetAddBtnText, { color: theme.text }]}>
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
                    borderColor: theme.buttonBorder,
                    backgroundColor: theme.menuItemBG,
                  },
                ]}>
                <TouchableOpacity
                  style={{ padding: 11.47 }}
                  onPress={() => navigation.navigate('TokenList')}>
                  <Text style={[styles.assetAddBtnText, { color: theme.text }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {
              loader ? <MaroonSpinner /> : <FlatList
                data={Tokens}
                renderItem={({ item }) =>
                  isGrid ? <RenderCardGrid item={item} /> : <RenderCard item={item} />
                }
                horizontal={!isGrid}
              />
            }

          </View>
        </>
      }
    </View>
  );
};

export default MainAssets;

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
