import React, { useContext, useEffect, useState , useRef } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Button,
    FlatList,
    TextInput,
    Keyboard
} from 'react-native';
import Header from "../components/header";
import SwapCurrencyIcon from "../assets/images/swap_currency_icon.png"
import SwapCurrencyBtcLarge from "../assets/images/swap_btc_large.png"
import SwapDrop from "../assets/images/swap_drop.png"
import SwapingIcon from "../assets/images/swaping_icon.png"
import SwapingIconDark from "../assets/images/swaping_icon_dark.png"
import ChooseChannel from "../components/ChooseChannel";
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {  getUSDamount , importSolToken} from '../utils/function';
import MaroonSpinner from '../components/Loader/MaroonSpinner';
// let ethereum = [
//                 { 
//                     coingekoId: "SHIBA INU",
//                     decimals: "18",
//                     logo: "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1696511800",
//                     name: "SHIBA INU",
//                     rpc: "https://eth.drpc.org",
//                     symbol: "SHIB",
//                     token_address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
//                 },
//                 { 
//                     coingekoId: "Tether USD",
//                     decimals: "6",
//                     logo: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
//                     name: "Tether USD",
//                     rpc: "https://eth.drpc.org",
//                     symbol: "USDT",
//                     token_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
//                 },
//                 { 
//                     coingekoId: "Token BNB",
//                     decimals: "6",
//                     logo: "https://etherscan.io/token/images/bnb_28_2.png",
//                     name: "Token BNB",
//                     rpc: "https://eth.drpc.org",
//                     symbol: "BNB",
//                     token_address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
//                 }
//             ]
let solanaTokens = [
    { 
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    coingekoId: "usd-coin",
    decimals: 6,
    logo: "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    name: "USDC",
    symbol: "usdc"
    },
    {
    token_address: "BvAZ2ay2KjBcGi49KspWtY3DAatBN7enmqaon1TuR8ES",
    coingekoId: "tapp-coin",
    decimals: 6,
    logo: "https://assets.coingecko.com/coins/images/33526/large/200_by_200_tapp_logo.png?1702138352",
    name: "Tapp Coin",
    symbol: "tpx"
    }
]

const fetchSolData = async () => {
    try {
      const response = await fetch('https://token.jup.ag/all');
      const data = await response.json();
      return data.slice(0, 20);
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error; // or handle error as needed
    }
  };
const Swap = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [address, setAddress] = useState();
    const [activeNet, setActiveNet] = useState()
    const [activeAccount, setActiveAccount] = useState();
    const [topToken, setTopToken] = useState(null);
    const [bottomToken, setBottomToken] = useState(null);
    const [solTokens, setSolTokens] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingValue, setLoadingValue] = useState(false);
    const [loadingValue2, setLoadingValue2] = useState(false);

    const [ballance, setBalance] = useState(0);

    const selectTopToken = (data) => {
        setTopToken(data)
        setModalVisible(!modalVisible)
    };

    const [topValue, setTopValue] = useState('0');
    const [topUSDValue, setTopUSDValue] = useState({});
    const [bottomValue, setBottomValue] = useState('0');
    const [bottomUSDValue, setBottomUSDValue] = useState({});
    const topInputRef = useRef(null);
    const bottomInputRef = useRef(null);
    const selectBottomToken = (data) => {
        setBottomToken(data)
        setModalVisible2(!modalVisible2)
    };


    const {
        wc,
        wallet,
        setWeb3Wallet,
        Session,
        saveSession,
        selectedAccount,
        setSelectedAccount,
        Accounts,
        addAccount,
        Networks,
        selectedNetwork,
        Tokens,
        removeToken
    } = useAuth();

    const data = Tokens;

    const Network = activeNet?.type;
    const getNetworkactive = async () => {
        let data = await JSON.parse(selectedNetwork)
        setActiveNet(data)
    }

    // const tokenSolList = async () => {
    //     let responce = await fetchSolTokens()
    //     console.log(">>>>>>>>>>>>>>",responce)
    // }

    useEffect(() => {
        fetchSolData().then(data => {
        //  console.log(data)
         setSolTokens(data)
         setLoading(false);
        }).catch(error => {
         setLoading(false);
         console.error(error);
        });
      }, []);
    

    const gettokenUsdValueTop = async (topToken ) => {
        setLoadingValue(true)
        try{
            let top = await getUSDamount(topToken?.symbol)
            await setTopUSDValue(top?.data)
            let getBalance = await importSolToken(address?.replace(/^"|"$/g, '') , topToken?.address || topToken?.token_address)
            if(getBalance){
                setBalance(getBalance?.token?.balance)
            }else{
                setBalance(0)
            }
            console.log(">>>>>>>>>>>>>>>>>>>>>GET BALANCE",getBalance?.token?.balance)
            console.log("top", top?.data?.amount)
            setLoadingValue(false)
        }catch(error){
            setLoadingValue(false)
        }
    } 
    const gettokenUsdValueBottom = async (bottomToken) => {
        setLoadingValue2(true)
        try{
            setLoadingValue2(false)
            let bottom = await getUSDamount(bottomToken?.symbol)
            await setBottomUSDValue(bottom?.data)
            console.log("bottom", bottom?.data?.amount)
        }catch(error){
            setLoadingValue2(false)
        }
    } 

    useEffect(()=>{
        gettokenUsdValueBottom(bottomToken)
    },[bottomToken])
    
    useEffect(()=>{
        gettokenUsdValueTop(topToken)
    },[topToken])

    useEffect(()=>{
        setTopValue('0')
        setBottomValue('0')
    },[topUSDValue,bottomUSDValue])


    const convertTop = async (event) => {
        let one = topUSDValue?.amount


        let text = event.nativeEvent.text;
        setTopValue(text)
        console.log( Number(text),"*", bottomUSDValue?.amount)
        let calculate = Number(text) * topUSDValue?.amount
        let multiply =  calculate / bottomUSDValue?.amount 
        console.log(multiply)
        setBottomValue(multiply.toString())
        topInputRef.current.focus();
    }
   
    
    
    const convertbottom = async (event) => {
        let text = event.nativeEvent.text;
        console.log(text)
        setBottomValue(text)
        console.log( Number(text) ,"/", topUSDValue?.amount)
        let calculate =  Number(text) * bottomUSDValue?.amount
        let multiply = calculate / topUSDValue?.amount
        console.log(calculate)
        setTopValue(multiply.toString())
        bottomInputRef.current.focus();
    }




    const onMaxValue = async () => {
        setTopValue(ballance?.toString())
        console.log( Number(ballance),"*", bottomUSDValue?.amount)
        let calculate = topUSDValue?.amount * Number(ballance)
        let multiply = calculate * bottomUSDValue?.amount
        console.log(multiply)
        setBottomValue(multiply.toString())
    }
    

    useEffect(() => {
        getNetworkactive()
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setAddress(JSON.stringify(Network === 'solana' ? selectedAccount.solana.publicKey : selectedAccount.evm.address));
            setActiveAccount(JSON.stringify(Network === 'solana' ? selectedAccount.solana : selectedAccount.evm));
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [Network, selectedAccount]);

    const swap = () => {
       if(activeNet?.type == 'solana'){
        let trxData = {
            privateKey : activeAccount,
            from : activeAccount?.address,
            inToken : topToken,
            outToken : bottomToken,
            inAmount : Number(topValue),
            outAmount : bottomValue,
            inAmountUSD : topUSDValue,
            outAmountISD : bottomUSDValue,
            chain : activeNet?.nodeURL,
            symbol : activeNet?.networkName,
            address: address?.replace(/^"|"$/g, ''),
            amountWei : Number(topValue) * Math.pow(10, topToken?.decimals),
            decimals : topToken?.decimals
        }
        
        navigation.navigate('ConfirmSolSwapTransaction', {
            trxData: trxData,
          });
       }else{
        console.log("Evm<<<",activeAccount)
       }
    }

    const SwapCard = () => {
        const allTokens = solTokens.concat(Tokens);
        return (
            <View style={[styles.swapCardWrapper, { backgroundColor: theme.menuItemBG }]}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={[styles.modalView, { backgroundColor: theme.screenBackgroud, color: theme.text }]}>
                        <View style={[styles.amountInpWrapperFlex, { width: '100%', marginBottom: 30, backgroundColor: theme.screenBackgroud, color: theme.text, justifyContent: 'space-between' }]}>
                            <View style={styles.amountImageLeftFlex}>
                                <Text style={[styles.amountSwapLable, { color: theme.text }]}>Token List</Text>
                            </View>
                            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }}>
                                <Text style={[styles.amountSwapValue, { color: theme.text, backgroundColor: 'transparent' }]} >x</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <FlatList
                            data={data}
                            keyExtractor={(item, index) => item.id || index.toString()}
                            renderItem={({ item }) => {
                                let solActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
                                if (activeNet?.type === "solana") {
                                    if (!solActive) {
                                        return null
                                    }
                                } else if (item?.rpc !== activeNet?.nodeURL) {
                                    return null
                                } else if (item === bottomToken) return null;
                                return (
                                    <TouchableOpacity onPress={() => selectTopToken(item)}>
                                        <View
                                            style={[
                                                styles.panCakeCardWrapper,
                                                { borderBottomColor: theme.pancakeBorderBottom },
                                            ]}
                                        >
                                            <View style={styles.pancakeCardLeft}>
                                                <View
                                                    style={[
                                                        styles.pancakeLeftImgWrapper,
                                                        { backgroundColor: theme.pancakeImgBG },
                                                    ]}
                                                >
                                                    <Image style={styles.pancakeLeftImage} source={{ uri: item.logo }} />
                                                </View>
                                            </View>
                                            <View style={styles.pancakeCardRight}>
                                                <Text style={[styles.pancakeRightUpperText, { color: theme.text }]}>
                                                    {item.coingekoId}
                                                </Text>
                                                <Text style={[styles.pancakeRightLowerText, { color: theme.text }]}>
                                                    {item.address || item.token_address}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        /> */}
                        <FlatList
                            data={allTokens}
                            keyExtractor={(item, index) => item.id || index.toString()}
                            renderItem={({ item }) => {
                                let solActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
                                if (activeNet?.type === "solana") {
                                    if (!solActive) {
                                        return null
                                    }
                                } else if (item?.rpc !== activeNet?.nodeURL) {
                                    return null
                                } else if (item === bottomToken) return null;
                                return (
                                    <TouchableOpacity onPress={() => selectTopToken(item)}>
                                        <View
                                            style={[
                                                styles.panCakeCardWrapper,
                                                { borderBottomColor: theme.pancakeBorderBottom },
                                            ]}
                                        >
                                            <View style={styles.pancakeCardLeft}>
                                                <View
                                                    style={[
                                                        styles.pancakeLeftImgWrapper,
                                                        { backgroundColor: theme.pancakeImgBG },
                                                    ]}
                                                >
                                                    <Image style={styles.pancakeLeftImage} source={{ uri: item.logoURI ||  item.logo }} />
                                                </View>
                                            </View>
                                            <View style={styles.pancakeCardRight}>
                                                <Text style={[styles.pancakeRightUpperText, { color: theme.text }]}>
                                                    {item.name}
                                                </Text>
                                                <Text style={[styles.pancakeRightLowerText, { color: theme.text }]}>
                                                    {item.address || item.token_address}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                       
                         
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={async () => { await navigation.navigate('AddToken'); setModalVisible(!modalVisible) }}>
                                <Text style={{ color: theme.text }}>Add Token</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* <View style={[styles.swapHeaderFlex]}>
                    <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                        <View style={styles.dropDownFlex}>
                            <Text style={[styles.swapHeaderText, { color: theme.text }]}>Select Token</Text>
                            <View style={styles.swapLeftSubFlex}>
                                <View>
                                    <Image source={SwapDrop} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View> */}
                {topToken == null ?
                <>
             
                     <View style={[styles.swapHeaderFlex]}>
                    <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                        <View style={styles.dropDownFlex}>
                            <Text style={[styles.swapHeaderText, { color: theme.text }]}>Select Token</Text>
                            <View style={styles.swapLeftSubFlex}>
                                <View>
                                    <Image source={SwapDrop} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                
                    <View style={styles.amountWrapper}>
                        <View style={styles.amountInpWrapperFlex}>
                            <View style={styles.amountImageLeftFlex}>
                                <Text style={[styles.amountSwapLable, { color: theme.text }]}>No Token Selected</Text>
                            </View>
                            <Text style={[styles.amountSwapValue, { color: theme.text }]}>-</Text>
                        </View>
                    </View>
                </>
                    :
                    // <View style={styles.amountWrapper}>
                    //     <View style={styles.amountInpWrapperFlex}>
                    //         <View style={styles.amountImageLeftFlex}>
                    //             <View>
                    //                 <Image  style={styles.pancakeLeftImage} source={{ uri: topToken?.logo }}  />
                    //             </View>
                    //             <Text style={[styles.amountSwapLable, {color: theme.text}]}>{topToken?.coingekoId}</Text>
                    //         </View>
                    //         <Text style={[styles.amountSwapValue, {color: theme.text}]}>0</Text>
                    //     </View>
                    // </View>
                    <>
                         <View style={[styles.swapHeaderFlex]}>
                    <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                        <View style={styles.dropDownFlex}>
                            <Text style={[styles.swapHeaderText, { color: theme.text }]}>{topToken?.coingekoId || topToken?.name}</Text>
                            <View style={styles.swapLeftSubFlex}>
                                <View>
                                    <Image source={SwapDrop} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={styles.amountWrapper}>
                        <View style={styles.amountInpWrapperFlex}>
                            <View style={styles.amountImageLeftFlex}>
                                <View>
                                    <Image style={styles.pancakeLeftImage} source={{ uri: topToken?.logo || topToken.logoURI}} />
                                </View>
                                <Text style={[styles.amountSwapLable, { color: theme.text }]}>{topToken?.coingekoId || topToken?.symbol}</Text>
                            </View>
                            {/* <TextInput
                            style={[styles.input, styles.coinSecText, { flex: 1, borderColor: theme.text, color: theme.text }]}
                                onChangeText={(e)=>{convertTop()}}
                                value={topValue}
                                placeholder="0"
                                keyboardType="numeric"
                                placeholderTextColor="#666"
                                /> */}
                            <TextInput
                                ref={topInputRef}
                                style={[styles.amountSwapValue, { color: theme.text, width: '50%', textAlign: "right" }]}
                                // value={topValue} 
                                onChange={convertTop}
                                keyboardType="numeric"
                                placeholder={topValue}
                            />
                        </View>
                    </View>
                    </>

                }
                {loadingValue ? <MaroonSpinner/> :
       
                <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' , justifyContent:'space-between'}}>
                <Text style={{marginTop:10}}> $ {topUSDValue?.amount}</Text>
                {topToken == null ? "" :
                 <TouchableOpacity
                     onPress={()=>{onMaxValue()}}
                     style={{ marginRight: 5, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'gray', borderRadius: 5  }}
                 >
                     <Text style={{ color: theme.buttonText }}>MAX</Text>
                 </TouchableOpacity>}
                 </View>
                </View>
                }
            </View>
        )
    }   

    const SwapCard2 = () => {
        const allTokens = solTokens.concat(Tokens);
        return (
            <View style={[styles.swapCardWrapper, { backgroundColor: theme.menuItemBG }]}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => {
                        setModalVisible2(!modalVisible2);
                    }}>
                    <View style={[styles.modalView, { backgroundColor: theme.screenBackgroud, color: theme.text }]}>
                        <View style={[styles.amountInpWrapperFlex, { width: '100%', marginBottom: 30, backgroundColor: theme.screenBackgroud, color: theme.text, justifyContent: 'space-between' }]}>
                            <View style={styles.amountImageLeftFlex}>
                                <Text style={[styles.amountSwapLable, { color: theme.text }]}>Token List</Text>
                            </View>
                            <TouchableOpacity onPress={() => { setModalVisible2(!modalVisible2) }}>
                                <Text style={[styles.amountSwapValue, { color: theme.text, backgroundColor: 'transparent' }]} >x</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={allTokens}
                            keyExtractor={(item, index) => item.id || index.toString()}
                            renderItem={({ item }) => {
                                // Skip rendering the item if it matches topToken

                                let solActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
                                if (activeNet?.type === "solana") {
                                    if (!solActive) {
                                        return null
                                    }
                                } else if (item?.rpc !== activeNet?.nodeURL) {
                                    return null
                                } else if (item === topToken) return null;
              
                                return (
                                    <TouchableOpacity onPress={() => selectBottomToken(item)}>
                                        <View
                                            style={[
                                                styles.panCakeCardWrapper,
                                                { borderBottomColor: theme.pancakeBorderBottom },
                                            ]}
                                        >
                                            <View style={styles.pancakeCardLeft}>
                                                <View
                                                    style={[
                                                        styles.pancakeLeftImgWrapper,
                                                        { backgroundColor: theme.pancakeImgBG },
                                                    ]}
                                                >
                                                    <Image style={styles.pancakeLeftImage} source={{ uri: item.logo || item.logoURI}} />
                                                </View>
                                            </View>
                                            <View style={styles.pancakeCardRight}>
                                                <Text style={[styles.pancakeRightUpperText, { color: theme.text }]}>
                                                    {item.coingekoId || item.name}
                                                </Text>
                                                <Text style={[styles.pancakeRightLowerText, { color: theme.text }]}>
                                                    {item.address || item.token_address}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        {/* <FlatList
                            data={data}
                            keyExtractor={(item, index) => item.id || index.toString()}
                            renderItem={({ item }) => {
                                // Skip rendering the item if it matches topToken

                                let solActive = item?.rpc === undefined ? activeNet?.type === "solana" : false;
                                if (activeNet?.type === "solana") {
                                    if (!solActive) {
                                        return null
                                    }
                                } else if (item?.rpc !== activeNet?.nodeURL) {
                                    return null
                                } else if (item === topToken) return null;

                                return (
                                    <TouchableOpacity onPress={() => selectBottomToken(item)}>
                                        <View
                                            style={[
                                                styles.panCakeCardWrapper,
                                                { borderBottomColor: theme.pancakeBorderBottom },
                                            ]}
                                        >
                                            <View style={styles.pancakeCardLeft}>
                                                <View
                                                    style={[
                                                        styles.pancakeLeftImgWrapper,
                                                        { backgroundColor: theme.pancakeImgBG },
                                                    ]}
                                                >
                                                    <Image style={styles.pancakeLeftImage} source={{ uri: item.logo }} />
                                                </View>
                                            </View>
                                            <View style={styles.pancakeCardRight}>
                                                <Text style={[styles.pancakeRightUpperText, { color: theme.text }]}>
                                                    {item.coingekoId}
                                                </Text>
                                                <Text style={[styles.pancakeRightLowerText, { color: theme.text }]}>
                                                    {item.address || item.token_address}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        /> */}

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={async () => { await navigation.navigate('AddToken'); setModalVisible2(!modalVisible2) }}>
                                <Text style={{ color: theme.text }}>Add Token</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                
                {bottomToken == null ?
                <>
                <View style={[styles.swapHeaderFlex]}>
                    <TouchableOpacity onPress={() => { setModalVisible2(true) }}>
                        <View style={styles.dropDownFlex}>
                            <Text style={[styles.swapHeaderText, { color: theme.text }]}>Select Token</Text>
                            <View style={styles.swapLeftSubFlex}>
                                <View>
                                    <Image source={SwapDrop} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={styles.amountWrapper}>
                        <View style={styles.amountInpWrapperFlex}>
                            <View style={styles.amountImageLeftFlex}>
                                <Text style={[styles.amountSwapLable, { color: theme.text }]}>No Token Selected</Text>
                            </View>
                            <Text style={[styles.amountSwapValue, { color: theme.text }]}>-</Text>
                        </View>
                    </View>
                </>
                    :
                    // <View style={styles.amountWrapper}>
                    //     <View style={styles.amountInpWrapperFlex}>
                    //         <View style={styles.amountImageLeftFlex}>
                    //             <View>
                    //                 <Image  style={styles.pancakeLeftImage} source={{ uri: bottomToken?.logo }}  />
                    //             </View>
                    //             <Text style={[styles.amountSwapLable, {color: theme.text}]}>{bottomToken?.coingekoId}</Text>
                    //         </View>
                    //         <Text style={[styles.amountSwapValue, {color: theme.text}]}>0</Text>
                    //     </View>
                    // </View>
                    <>
                    <View style={[styles.swapHeaderFlex]}>
                    <TouchableOpacity onPress={() => { setModalVisible2(true) }}>
                        <View style={styles.dropDownFlex}>
                            <Text style={[styles.swapHeaderText, { color: theme.text }]}>{bottomToken?.coingekoId || bottomToken?.name}</Text>
                            <View style={styles.swapLeftSubFlex}>
                                <View>
                                    <Image source={SwapDrop} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={[styles.amountInpWrapperFlex , { marginTop:15}]}>
                        <View style={styles.amountImageLeftFlex}>
                            <View>
                                <Image style={styles.pancakeLeftImage} source={{ uri: bottomToken?.logo || bottomToken?.logoURI }} />
                            </View>
                            <Text style={[styles.amountSwapLable, { color: theme.text }]}>{bottomToken?.coingekoId || bottomToken?.symbol}</Text>
                        </View>
                   
                        <TextInput
                            ref={bottomInputRef}
                            style={[styles.amountSwapValue, { color: theme.text, width: '50%', textAlign: "right" }]}
                            // value={bottomValue} 
                            onChange={convertbottom}
                            keyboardType="numeric"
                            placeholder={bottomValue}
                            />

                    </View>
                </>
                }
                   {loadingValue2 ? <MaroonSpinner/> :
             
                <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' , justifyContent:'space-between'}}>
                <Text style={{marginTop:10}}> $ {bottomUSDValue?.amount}</Text>
                {bottomToken == null ? "" :
                 <TouchableOpacity
                     onPress={()=>{onMaxValue()}}
                     style={{ marginRight: 5, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'gray', borderRadius: 5  }}
                 >
                     <Text style={{ color: theme.buttonText }}>MAX</Text>
                 </TouchableOpacity>}
                 </View>
                </View>
                }
            </View>
        )
    }


    return (
        <ScrollView style={[styles.mainWrapper, { backgroundColor: theme.screenBackgroud }]}>
            <Header title={'Swap'} onBack={() => navigation.goBack()} />
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 , marginBottom:20 }}>
                <Text style={{ color: theme.text, fontSize: 30 }}>{activeNet?.type.toUpperCase()} SWAP</Text>
            </View>
            {loading ? <MaroonSpinner/> :
            <View>

           
            <View style={[styles.swapWrapper]}>
                <SwapCard />
                <View style={styles.swapBtnFlexWrapper}>
                    <TouchableOpacity onPress={() => { setTopToken(bottomToken), setBottomToken(topToken) }} style={[styles.swapBtn, { backgroundColor: theme.rightArrowBG }]}>
                        <Image source={theme.type == 'dark' ? SwapingIcon : SwapingIconDark} />
                    </TouchableOpacity>
                </View>
            </View>
            <SwapCard2 />
            <View style={[styles.gasFlexWrapper,{ marginTop: 80 , marginBottom:50}]}>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text }]}>Balance</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>{ballance} {topToken?.symbol}</Text>
                </View>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text }]}>Received Amount</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>{bottomValue ? bottomValue : 0 } {bottomToken?.symbol}</Text>
                </View>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text}]}>Slippage tolerance</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>1%</Text>
                </View>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text}]}>Receiving address</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>{address?.replace(/^"|"$/g, '').substring(0,30)}</Text>
                </View>
            </View>
            {/* <View style={ { marginTop: 20 }}>
            <ChooseChannel />
            </View> */}
            {topValue > ballance ?
            
            <View style={[styles.tokenImportBtnWrapper]}>
                <TouchableOpacity  style={[styles.tokenImportButton, { borderColor: 'gray', backgroundColor:'gray' }]}>
                    <Text style={[styles.tokenImportButtonText, { color: theme.text }]}>Insufficient Funds</Text>
                </TouchableOpacity>
            </View>
            
            :
<>
{ballance == 0 ?
     <View style={[styles.tokenImportBtnWrapper]}>
     <TouchableOpacity  style={[styles.tokenImportButton, { borderColor: 'gray', backgroundColor:'gray' }]}>
         <Text style={[styles.tokenImportButtonText, { color: theme.text }]}>Insufficient Funds</Text>
     </TouchableOpacity>
 </View>
:
            <View style={[styles.tokenImportBtnWrapper]}>
            <TouchableOpacity  onPress={() => swap()} style={[styles.tokenImportButton, { borderColor: theme.buttonBorder }]}>
                <Text style={[styles.tokenImportButtonText, { color: theme.text }]}>Swap</Text>
            </TouchableOpacity>
            </View> }
</>
            
            }
            </View>}
        </ScrollView>
    )
}

export default Swap;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        color: '#000', // Adjust based on your theme
    },
    coinSecText: {
        // color: "#fff",
        fontSize: 16,
        fontWeight: "400",
    },
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
        marginTop: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    mainWrapper: {
        // backgroundColor: '#280D2C',
        padding: 10,
    },
    swapCardWrapper: {
        padding: 24,
        borderRadius: 16,
        // backgroundColor: "#362538"
    },
    swapWrapper: {
        marginTop: 20
    },
    swapHeaderFlex: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dropDownFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    swapHeaderText: {
        // color: "#FFF",
        fontSize: 12,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    swapLeftSubFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    currencyIconWrapper: {
        width: 18,
        height: 18
    },
    swapIconImage: {
        width: "100%",
        height: "100%"
    },
    swapCurrencyName: {
        // color: "#FFF",
        fontSize: 12,
        fontWeight: "700",
        textTransform: "uppercase",
    },
    amountWrapper: {
        marginTop: 16
    },
    amountInpWrapperFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        // marginTop: 8
    },
    amountImageLeftFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,

    },
    amountSwapLable: {
        // color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
    },
    amountSwapValue: {
        // color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
        // textTransform: "uppercase",
    },
    swapBtnFlexWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: -15,
        zIndex: 99
    },
    swapBtn: {
        width: 48,
        height: 48,
        borderRadius: 100,
        // backgroundColor: "#4E3B51",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    // 
    gasFlexWrapper: {
        marginVertical: 10
    },
    gasFeeFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        paddingHorizontal: 4
    },
    gasFeeLabel: {
        // color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    gasFee: {
        // color: "#F43459",
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    // 
    tokenImportBtnWrapper: {
        marginBottom: 35
    },
    tokenImportButton: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        // borderColor: "#FF003C",
        borderWidth: 1,
        borderRadius: 100,
    },
    tokenImportButtonText: {
        // color: "#FFF",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        textTransform: "capitalize",
        textAlign: "center"
    }
    //
})