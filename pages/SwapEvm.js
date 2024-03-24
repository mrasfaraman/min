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
import {  getUSDamount , importEVMToken} from '../utils/function';
import MaroonSpinner from '../components/Loader/MaroonSpinner';

const EVM_Tokens = [
  
    {
      balance: "0.",
      coingekoId: "pancakeswap-token",
      decimals: "18",
      logo: "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1696512440",
      name: "PancakeSwap",
      rpc: "https://bsc.publicnode.com",
      symbol: "Cake",
      token_address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
    },
    {
      balance: "0.",
      coingekoId: "wbnb",
      decimals: "18",
      logo: "https://assets.coingecko.com/coins/images/12591/large/binance-coin-logo.png?1696512401",
      name: "Wrapped BNB",
      rpc: "https://bsc.publicnode.com",
      symbol: "WBNB",
      token_address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
    },
    {
        balance: "0.",
        coingekoId: "Ethereum Token",
        decimals: "18",
        logo: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        name: "Ethereum Token",
        rpc: "https://bsc.publicnode.com",
        symbol: "ETH",
        token_address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "Tether USD",
        decimals: "18",
        logo: "https://imgs.search.brave.com/azckPbVeZfKZarKX3sh6Qc7Ih61VJE-Y3VFbJVfttT0/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMzI1L2xh/cmdlL1RldGhlci5w/bmc_MTY5NjUwMTY2/MQ",
        name: "Tether USD",
        rpc: "https://bsc.publicnode.com",
        symbol: "USDT",
        token_address: "0x55d398326f99059fF775485246999027B3197955",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "binance-peg-xrp",
        decimals: "18",
        logo: "https://assets.coingecko.com/coins/images/15458/large/ryyrCapt_400x400.jpg?1696515105",
        name: "Binance-Peg XRP",
        rpc: "https://bsc.publicnode.com",
        symbol: "XRP",
        token_address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
    //   {
    //     balance: "0.",
    //     coingekoId: "USDC",
    //     decimals: "18",
    //     logo: "https://imgs.search.brave.com/N2fP45Mz-teafsRRVVLC8NlPpRdDhC2dTEedA6UVEbo/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvNjMxOS9s/YXJnZS91c2RjLnBu/Zz8xNjk2NTA2Njk0",
    //     name: "USDC",
    //     rpc: "https://bsc.publicnode.com",
    //     symbol: "anyUSDC",
    //     token_address: "0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2",
    //     wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
    //   },
      {
        balance: "0.",
        coingekoId: "SHIBA INU",
        decimals: "18",
        logo: "https://imgs.search.brave.com/TtNHBZ0ZFLziHQGuy9aG0I4vgRygqGY8jLIj_v_IDFQ/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMTE5Mzkv/bGFyZ2Uvc2hpYmEu/cG5nPzE2OTY1MTE4/MDA",
        name: "SHIBA INU",
        rpc: "https://bsc.publicnode.com",
        symbol: "SHIB",
        token_address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "tether",
        decimals: "6",
        logo: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
        name: "Tether",
        rpc: "https://eth.drpc.org",
        symbol: "USDT",
        token_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "BNB",
        decimals: "18",
        name: "BNB",
        logo: "https://imgs.search.brave.com/LIeV84--gK-9SOLfJxQ-YtBJMp5dh8pu8W26RmXH_hE/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvODI1L2xh/cmdlL2JuYi1pY29u/Ml8yeC5wbmc_MTY5/NjUwMTk3MA",
        rpc: "https://eth.drpc.org",
        symbol: "BNB",
        token_address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "staked-ether",
        decimals: "18",
        name: "Lido Staked Ether",
        logo: "https://imgs.search.brave.com/xjhEitr-gvv_j55YO6LXvt5RIga5JgOEH2Ffy-VUs7E/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMTM0NDIv/bGFyZ2Uvc3RldGhf/bG9nby5wbmc_MTY5/NjUxMzIwNg",
        rpc: "https://eth.drpc.org",
        symbol: "stETH",
        token_address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "usd-coin",
        decimals: "6",
        name: "USDC",
        logo: "https://imgs.search.brave.com/N2fP45Mz-teafsRRVVLC8NlPpRdDhC2dTEedA6UVEbo/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvNjMxOS9s/YXJnZS91c2RjLnBu/Zz8xNjk2NTA2Njk0",
        rpc: "https://eth.drpc.org",
        symbol: "USDC",
        token_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "shiba-inu",
        decimals: "18",
        name: "Shiba Inu",
        logo: "https://imgs.search.brave.com/TtNHBZ0ZFLziHQGuy9aG0I4vgRygqGY8jLIj_v_IDFQ/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMTE5Mzkv/bGFyZ2Uvc2hpYmEu/cG5nPzE2OTY1MTE4/MDA",
        rpc: "https://eth.drpc.org",
        symbol: "SHIB",
        token_address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "Wrapped TON Coin",
        decimals: "9",
        name: "Wrapped TON Coin",
        logo: "https://imgs.search.brave.com/iUyp2cBCy5fC5QOKFZPbCQZNpMZTmsbP-SH-6qlvkNQ/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMTIyNjAv/bGFyZ2UvRDkxOXg1/LXNfNDAweDQwMC5w/bmc_MTY5NjUxMjA5/MQ",
        rpc: "https://eth.drpc.org",
        symbol: "TONCOIN",
        token_address: "0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      },
      {
        balance: "0.",
        coingekoId: "TRON",
        decimals: "6",
        name: "TRON",
        logo:'https://imgs.search.brave.com/HWEiagS4vAddv9dOHWV33aR_AMoE15KolcWxJGAALN8/rs:fit:40:40:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY29pbmdlY2tv/LmNvbS9jb2lucy9p/bWFnZXMvMTA5NC9s/YXJnZS90cm9uLWxv/Z28ucG5nPzE2OTY1/MDIxOTM',
        rpc: "https://eth.drpc.org",
        symbol: "TRX",
        token_address: "0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5",
        wallet_address: "0xeB537669D85b53435D0fFb87CE425FF5B182e419"
      }
  ];


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
      const [loading, setLoading] = useState(false);
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

     
      
  
      const gettokenUsdValueTop = async (topToken ) => {
          setLoadingValue(true)
          try{
              let top = await getUSDamount(topToken?.symbol)
              await setTopUSDValue(top?.data)
              let getBalance = await importEVMToken(address.replace(/^"|"$/g, ''), activeNet?.nodeURL, activeNet?.networkName,  topToken?.address || topToken?.token_address);
              if(getBalance){
                  setBalance(getBalance?.token?.balance || getBalance?.data?.balance)
              }else{
                  setBalance(0)
              }
              console.log(">>>>>>>>>>>>>>>>>>>>>GET BALANCE",getBalance?.token?.balance || getBalance?.data?.balance)
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
          setTopValue(Number(ballance)?.toFixed(3)?.toString())
          console.log( Number(ballance),"*", bottomUSDValue?.amount)
          let calculate = topUSDValue?.amount * Number(ballance)
          let multiply ;
          if(calculate >= 1){

            multiply = Number(calculate * bottomUSDValue?.amount)
        }else{
              console.log("sadsad")
              multiply = Number(calculate / bottomUSDValue?.amount)
        
          }
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
                amountWei : Number(topValue) * 10 ** topToken?.decimals,
                decimals : topToken?.decimals,
                decimalsBottom : bottomToken?.decimals,
                chainID : activeNet?.networkId
            }
            
            navigation.navigate('ConfirmEvmSwapTransaction', {
                trxData: trxData,
              });
         }
      }
  
      const SwapCard = () => {
          const allTokens = EVM_Tokens.concat(Tokens);
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
          const allTokens = EVM_Tokens.concat(Tokens);
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
              {/* <View style={[styles.tokenImportBtnWrapper]}>
              <TouchableOpacity  onPress={() => swap()} style={[styles.tokenImportButton, { borderColor: theme.buttonBorder }]}>
                  <Text style={[styles.tokenImportButtonText, { color: theme.text }]}>Swap</Text>
              </TouchableOpacity>
              </View>  */}
              </View>
              }
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