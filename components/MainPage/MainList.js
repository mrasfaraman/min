import React, { useContext, useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    TextInput
} from 'react-native';
import ListSearch from "../../assets/images/list-search.png"
import ListSearchDark from "../../assets/images/list-search-dark.png"
import ListCoinIcon from "../../assets/images/list-coin-icon.png"
import TwoCoinGraph from "../../assets/images/two-coin-graph.png"
import { ThemeContext } from '../../context/ThemeContext';

import { useAuth } from '../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';

import { importEVMToken, importSolToken } from '../../utils/function';
import MaroonSpinner from '../Loader/MaroonSpinner';


import Trancactions from '../Transactions/Transactions';
const MainList = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [pageSwitch, setPageSwitch] = useState("one")

    const { Tokens, selectedNetwork, Networks, selectedAccount, updateToken } = useAuth()
    const [activeNet, setActiveNet] = useState()
    const [address, setAddress] = useState();

    const getNetworkactive = async () => {
        let data = await JSON.parse(selectedNetwork)
        setActiveNet(data)
    }


    const tokenevmUpdate = async (item, index) => {
        let responce = await importEVMToken(address.replace(/^"|"$/g, ''), activeNet?.nodeURL, activeNet?.networkName, item.token_address);
        updateToken(index, responce.data)
        // if (!responce) {
        //   
        //   updateToken(index, item)
        // } else {
        // }
    }

    const tokensolUpdate = async (item, index) => {

        let responce = await importSolToken(address.replace(/^"|"$/g, ''), item.address);

        if (!responce) {
            item.balance = 0
            updateToken(index, item)
        } else {
            updateToken(index, responce.token)
        }
    }


    useEffect(() => {
        console.log(Tokens)
        const timeoutId = setTimeout(() => {
            Tokens.map((item, index) => {
                let solActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
                if (activeNet?.type === "solana") {
                    if (solActive) {
                        console.log("My Token is here ===> ", item)
                        console.log("My Token is here ===> index", index)
                        tokensolUpdate(item, index)
                    }
                } else if (item?.rpc == activeNet?.nodeURL) {
                    tokenevmUpdate(item, index)
                }
            })
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [selectedAccount, address ])



    useEffect(() => {
        getNetworkactive()
    }, [selectedNetwork, Networks])



    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        const timer = setTimeout(() => {
            setLoader(false)
        }, 4000);

        return () => clearTimeout(timer);
    }, [selectedAccount]);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setAddress(JSON.stringify(activeNet?.type === 'solana' ? selectedAccount.solana.publicKey : selectedAccount.evm.address));
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [activeNet, selectedAccount]);

    const sendTokenDetail = (tokenDetail) => {
        navigation.navigate("SendToken", { tokenData: tokenDetail, address: address })
    }

    const CoinDetailList = ({ item, index }) => {
        let solActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
        if (activeNet?.type === "solana") {
            if (!solActive) {
                return null
            }
        } else if (item?.rpc !== activeNet?.nodeURL) {
            return null
        }

        return (
            <TouchableOpacity onPress={() => sendTokenDetail(item)}>
                <LinearGradient
                    colors={[theme.menuItemBG, theme.gradientB]} // Color at 0% and 100%
                    start={{ x: 0, y: 0 }} // Corresponding to 135 degrees, this is the top left corner
                    end={{ x: 1, y: 1 }}   // Corresponding to 135 degrees, this is the bottom right corner
                    style={[styles.coinDetailWrapper, { borderTopColor: theme.buttonBorder }]}    // Set the style as needed
                >
                    {/* Your component content */}
                    <View style={styles.coinDetailOne}>
                        <View style={styles.listCoinIconWrapper}>
                            <Image style={styles.listCoinIconImg} source={{ uri: item.logo }} alt="picture" />
                        </View>
                        <View style={styles.oneTextWrapper}>
                            <Text style={[styles.oneTextSymbol, { color: theme.text }]}>{item.name} </Text>
                            {/* <Text style={[styles.oneTextPercentage, { color: theme.tokenImportBtn }]}>+1.6%</Text> */}
                        </View>
                    </View>

                    <View>
                        {/* <Image source={TwoCoinGraph} alt="grapg" /> */}
                    </View>

                    <View>
                        <Text style={[styles.thirdCoinListDollar, { color: theme.text }]}> {Number(item.balance).toFixed(3)}  {item.symbol.toUpperCase()}</Text>
                        <Text style={[styles.thirdCoinListCrypto, { color: theme.text }]}> {item.decimals} Decimal</Text>
                    </View>

                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
      <View style={styles.mainWrapper}>
       
        {activeNet?.type == 'evm' || activeNet?.type == 'solana' ? (
        <View style={styles.mainListHeader}>
          <TouchableOpacity
            style={[
              styles.listTab,
              {
                borderBottomColor:
                  pageSwitch == 'one' ? theme.text : theme.screenBackgroud,
              },
            ]}
            onPress={() => setPageSwitch('one')}>
            <Text style={[styles.listTabText, {color: theme.text}]}>
              Assets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.listTab,
              {
                borderBottomColor:
                  pageSwitch == 'two' ? theme.text : theme.screenBackgroud,
              },
            ]}
            onPress={() => setPageSwitch('two')}>
            <Text style={[styles.listTabText, {color: theme.text}]}>
              History
            </Text>
          </TouchableOpacity>
        </View>):(
        <View>
           <Text style={[styles.listTabText, {color: theme.text}]}>
              History
            </Text>
        </View>
        )}
      
        {activeNet?.type == 'evm' || activeNet?.type == 'solana' ? (
        <>
        {pageSwitch == 'one' && (
          <View>
            {address?.length === 23 ? (
              ''
            ) : (
              <>
                {loader ? (
                  <MaroonSpinner />
                ) : (
                  <>
                    {Tokens.length == 0 ?
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: theme.text}}> No Token Found</Text>
                      </View>
                     : 
                      <FlatList
                        data={Tokens}
                        renderItem={({item, index}) => (
                          <CoinDetailList item={item} index={index} />
                        )}
                      />
                }
                  </>
                )}
              </>
            )}
          </View>
        )}
        {pageSwitch == 'two' && (
          <View>
            {address?.length === 23 ? (
              ''
            ) : (
              <View>
                <Trancactions />
              </View>
            )}
          </View>
        )}
        </>
        ):(
          <>
          <View>
            {address?.length === 23 ? (
              ''
            ) : (
              <View>
                <Trancactions />
              </View>
            )}
          </View>
          </>
        )}

        
      </View>
    );
}

export default MainList;

const styles = StyleSheet.create({
    mainWrapper: {
        marginTop: 20,
        paddingBottom: 80
    },
    mainListHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
    },
    listTab: {
        paddingVertical: 10,
        paddingHorizontal: 11,
        width: "50%",
        borderBottomColor: "transparent",
        borderBottomWidth: 2,
    },
    listTabText: {
        // color: "#FFF",
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 17.205,
        textTransform: "capitalize",
        textAlign: "center"
    },
    listSearchWrapper: {
        // paddingVertical: 0,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderRadius: 100,
        // backgroundColor: "#362538",
        marginBottom: 16
    },
    listSearchText: {
        // color: "#FFF",
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        textTransform: "capitalize",
    },
    // /////////////////////////// CoinDetailList //////////////////////////
    coinDetailWrapper: {
        flex: 1,
        paddingVertical: 13.381,
        paddingHorizontal: 19.116,
        marginBottom: 10,
        // borderTopColor: "#FF003C",
        borderTopWidth: 1,
        borderTopLeftRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    coinDetailOne: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
    },
    listCoinIconWrapper: {
        width: 50.53,
        height: 50.53,
        borderRadius: 100
    },
    listCoinIconImg: {
        width: "100%",
        height: "100%"
    },
    oneTextWrapper: {},
    oneTextSymbol: {
        // color: "#FFF",
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 22.9
    },
    oneTextPercentage: {
        // color: "#009F53",
        fontSize: 14.337,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 19.116
    },
    thirdCoinListDollar: {
        // color: "#FFF",
        fontSize: 16.249,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 22.94,
    },
    thirdCoinListCrypto: {
        // color: "#FFF",
        fontSize: 14.337,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 19.116,
    }
})