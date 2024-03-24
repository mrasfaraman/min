import React, {useContext ,useState, useEffect} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList
} from 'react-native';
import Coin from "../assets/images/asset_coin_icon.png"
import Wallet from "../assets/images/wallet.png"
import WalletDark from "../assets/images/wallet-dark.png"
import faceID from "../assets/images/face_id.png"
import Print from "../assets/images/print.png"
import Header from '../components/header';
import BottomMenu from '../components/BottomMenu';
import AddButton from '../components/AddButton';
import {ThemeContext} from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { sendEvmNative , sendSolNative} from '../utils/function';
import MaroonSpinner from '../components/Loader/MaroonSpinner';
import { Evm_estimatedGas , Sol_estimatedGas ,  Bitcoin_estimatedGas } from '../utils/function';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


const Buy = ({route, navigation }) => {
    const {theme} = useContext(ThemeContext);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [loader , setLoader] = useState(false)
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
        selectedNetwork
      } = useAuth();
      const Network = activeNet?.type;
    const [activeAccount, setActiveAccount] = useState();
    const [activeNet, setActiveNet] = useState()


    const getNetworkactive = async () => {
        let data = await JSON.parse(selectedNetwork)
        setActiveNet(data) 
      }
    

    const handleSend = async () => {
        const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        const btcAddressRegix = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
        const btcAddressRegixTest = /^(msZ|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
        try {
            if(!recipientAddress){
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Address Required',
                    textBody: 'Enter a valid address',
                  })
            }else if (amountToSend == '') {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Invalid Ammount',
                textBody: 'Enter a valid ammount',
              })
            }
             else if(route?.params?.amount <= amountToSend){
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Insufficient Funds',
                    textBody: 'Insufficient Funds to Continue',
                  })
            }
            else {
              if (activeNet?.type === 'solana') {
                if (solanaAddressRegex.test(recipientAddress)) {
                    try{
                        if(activeAccount?.secretKey || activeAccount?.privateKey ){
                            let trxData = {
                                privateKey :activeAccount?.secretKey || activeAccount?.privateKey ,
                                recipientAddress: recipientAddress,
                                from : activeAccount?.publicKey,
                                amount : amountToSend,
                                chain : activeNet?.nodeURL,
                                balance: route?.params?.amount,
                                balanceAmount: route?.params?.amount - amountToSend,
                                symbol : activeNet?.networkName
                            }
                            
                            navigation.navigate('ConfirmSolTransaction', {
                                trxData: trxData,
                              });

                            // setLoader(true)
                            // let response = await sendSolNative(activeAccount?.secretKey || activeAccount?.privateKey , recipientAddress , amountToSend);
                            // if(response){
                            //     setLoader(false)
                            //   
                            //     navigation.navigate("MainPage")
                            // }else{
                            //     
                            //     navigation.navigate("MainPage")
                            // }
                        }
                    }catch(error){
                        setLoader(false)
                    }

                //   console.log('Sending solana...',solanaAddressRegex.test(recipientAddress));
                //   console.log('>>>>', activeAccount?.privateKey);
                //   console.log('>>>>', recipientAddress);
                //   console.log('>>>>', amountToSend);
                } else {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid Address',
                    textBody: 'Address is Not valid',
                  })
                }
              }else if(activeNet?.type === 'btc'){
                  try{
                  // setLoader(true)
                  let trxData = {
                      privateKey : activeAccount?.privateKey,
                      recipientAddress: recipientAddress,
                      from : activeAccount?.address,
                      amount : amountToSend,
                      chain : activeNet?.nodeURL,
                      balance: route?.params?.amount,
                      balanceAmount: route?.params?.amount - amountToSend,
                      symbol : activeNet?.networkName
                  }
                  
                  navigation.navigate('ConfirmBtcTransaction', {
                      trxData: trxData,
                    });
         
              }catch(error){
                  setLoader(false)
              }
            
              }else if(activeNet?.type === 'tron'){
                try{
                // setLoader(true)
                let trxData = {
                    privateKey : activeAccount?.privateKey,
                    recipientAddress: recipientAddress,
                    from : activeAccount?.address,
                    amount : amountToSend,
                    chain : activeNet?.nodeURL,
                    balance: route?.params?.amount,
                    balanceAmount: route?.params?.amount - amountToSend,
                    symbol : activeNet?.networkName
                }
                
                navigation.navigate('ConfirmTronTransaction', {
                    trxData: trxData,
                  });
       
            }catch(error){
                setLoader(false)
            }
          
              }else if(activeNet?.type === 'doge'){
                try{
                // setLoader(true)
                let trxData = {
                    privateKey : activeAccount?.privateKey,
                    recipientAddress: recipientAddress,
                    from : activeAccount?.address,
                    amount : amountToSend,
                    chain : activeNet?.nodeURL,
                    balance: route?.params?.amount,
                    balanceAmount: route?.params?.amount - amountToSend,
                    symbol : activeNet?.networkName
                }
                
                navigation.navigate('ConfirmDogeTransaction', {
                    trxData: trxData,
                  });
       
            }catch(error){
                setLoader(false)
            }
          
              }else {
                if (evmAddressRegex.test(recipientAddress)) {
                    try{
                    // setLoader(true)
                    let trxData = {
                        privateKey : activeAccount?.privateKey,
                        recipientAddress: recipientAddress,
                        from : activeAccount?.address,
                        amount : amountToSend,
                        chain : activeNet?.nodeURL,
                        balance: route?.params?.amount,
                        balanceAmount: route?.params?.amount - amountToSend,
                        symbol : activeNet?.networkName
                    }
                    
                    navigation.navigate('ConfirmTransaction', {
                        trxData: trxData,
                      });
                    // let response = await sendEvmNative(activeAccount?.privateKey , recipientAddress , amountToSend , activeNet?.nodeURL);
                    // console.log('Sending evm...', response.transactionHash);
                    // if(response.transactionHash){
                    //     setLoader(false)
                
                    //     navigation.navigate("MainPage")
                    // }
                }catch(error){
                    setLoader(false)
                }
                //   console.log('>>>>', activeNet?.nodeURL);
                //   console.log('>>>>', activeAccount?.privateKey);
                //   console.log('>>>>', activeAccount);
                //   console.log('>>>>', recipientAddress);
                //   console.log('>>>>', amountToSend);
                } else {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Invalid Address',
                    textBody: 'Address is Not valid',
                  })
                }
              }
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: error.message,
              })
        }
    };

      
    const setMax = async () => {
        setLoader(true)
        try{
            let gasData = await Evm_estimatedGas('0x000000000000000000000000000000000000dEaD' , '0x000000000000000000000000000000000000dEaD' , 0 ,activeNet?.nodeURL)
            let  maxBalance = Number(route?.params?.amount) - Number(gasData.gasFeeInEther) -  0.000000000100
            setAmountToSend(maxBalance.toString())
            setLoader(false)
        }catch(error){
            setLoader(false)
        }
    }

    const setMaxSol = async () => {
        setLoader(true)
        try{
            let gasData = await Sol_estimatedGas(activeAccount?.secretKey || activeAccount?.privateKey, recipientAddress || '8xpkMJkyhXMP2vydfQJKxZHZgyhSvqdjsqhQf23XBxvy', route?.params?.amount)
            let  maxBalance = Number(route?.params?.amount) - Number(gasData.gasFeeInEther)
            setAmountToSend(maxBalance.toString())
            setLoader(false)
        }catch(error){
            setLoader(false)
        }
    }

    const setMaxbtc = async () => {
        setLoader(true)
        try{
            let gasData = await Bitcoin_estimatedGas(activeAccount?.privateKey, recipientAddress || 'n4WPxHScxzDUGnUgkBiHXUa8sqFefmot8h', route?.params?.amount)
           console.log("btcGas",gasData)
           if(gasData){
               let  maxBalance = Number(route?.params?.amount) - Number(gasData.result.fee) - 0.000001
               setAmountToSend(maxBalance.toString())
           }else{
            setAmountToSend('0')
           }
            setLoader(false)
        }catch(error){
            setLoader(false)
        }
    }

    const setMaxdoge = async () => {
        setLoader(true)
        try{
           if(route?.params?.amount){

               let  maxBalance = Number(route?.params?.amount) - 1

               console.log(maxBalance)
               setAmountToSend(maxBalance.toString())
           }else{
            setAmountToSend('0')
           }
            setLoader(false)
        }catch(error){
            setLoader(false)
        }
    }
    const setMaxtron = async () => {
        setLoader(true)
        try{
           if(route?.params?.amount){
               let  maxBalance = Number(route?.params?.amount) - 0.000001
               setAmountToSend(maxBalance.toString())
           }else{
            setAmountToSend('0')
           }
            setLoader(false)
        }catch(error){
            setLoader(false)
        }
    }

    useEffect(() => {
        getNetworkactive()
    }, [selectedNetwork,setActiveNet])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (route?.params) {
                //   console.log("Account >>>",route?.params?.account)
                  if(activeNet?.type === 'solana'){
                    setActiveAccount(route?.params?.account.solana)
                  }else if(activeNet?.type === 'btc'){
                    setActiveAccount(route?.params?.account.btc)
                  }else if(activeNet?.type === 'tron'){
                    setActiveAccount(route?.params?.account.tron)
                  }else if(activeNet?.type === 'doge'){
                    setActiveAccount(route?.params?.account.doge)
                  }else{
                    setActiveAccount(route?.params?.account.evm)
                  }
                //   console.log("Amount >>>",route?.params?.amount)
                //   console.log("Network >>>",route?.params?.network)
                }
        }, 1000);
        return () => clearTimeout(timeoutId);
      });

    useEffect(() => {
        if(route?.params?.recepentAddress){
            setRecipientAddress(route?.params?.recepentAddress)
        }
        if (route?.params) {
        //   console.log("Account >>>",route?.params?.account)
          if(activeNet?.type === 'solana'){
            setActiveAccount(route?.params?.account.solana)
          }else if(activeNet?.type === 'btc'){
            setActiveAccount(route?.params?.account.btc)
          }else if(activeNet?.type === 'tron'){
            setActiveAccount(route?.params?.account.tron)
          }else if(activeNet?.type === 'doge'){
            setActiveAccount(route?.params?.account.doge)
          }else{
            setActiveAccount(route?.params?.account.evm)
          }
        //   console.log("Amount >>>",route?.params?.amount)
        //   console.log("Network >>>",route?.params?.network)
        }
      }, [route?.params]);
    return (
        <ScrollView style={[styles.MainWrapper, {backgroundColor: theme.screenBackgroud}]}>
            <Header title="Send" onBack={() => navigation.goBack()} />
            <View>
                <Text style={[styles.buyAmount, {color: theme.text}]}>{route?.params?.amount.toFixed(5)}  {activeNet?.symbol}</Text>
            </View>
            {/* <View style={[styles.currencyDetailFlex, {backgroundColor: theme.menuItemBG}]}>
                <View style={styles.coinFlex}>
                    <Image source={Coin} />
                    <View>
                        <Text style={[styles.coinMainText, {color: theme.text}]}>Bitcoin</Text>
                        <Text style={[styles.coinSecText, {color: theme.text}]}>Bitcoin Mainet</Text>
                    </View>
                </View>
            </View> */}
            {loader ? 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MaroonSpinner />
          <Text>Loading...</Text>
        </View>:
        <>
        <View style={[styles.currencyDetailFlex, {backgroundColor: theme.menuItemBG}]}>
                <View style={styles.coinFlex}>
                    <Image source={theme.type == 'dark' ? Wallet : WalletDark} />
                    <View>
                        {/* <Text style={styles.coinMainText}>Debit Or Credit</Text> */}
                        <Text style={[styles.coinSecText, {color: theme.text}]}>{activeNet?.networkName} Account   </Text>
                    </View>
                </View>
            </View>
            <TextInput
                style={[styles.input, styles.coinSecText, { flex: 1, borderColor: theme.text, color: theme.text }]}
                onChangeText={setRecipientAddress}
                value={recipientAddress}
                placeholder="Recipient Address"
                placeholderTextColor="#666"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
               style={[styles.input, styles.coinSecText, { flex: 1, borderColor: theme.text, color: theme.text }]}
                onChangeText={setAmountToSend}
                value={amountToSend}
                placeholder="Amount to Send"
                keyboardType="numeric"
                placeholderTextColor="#666"
                />
            <TouchableOpacity
                onPress={activeNet?.type === 'solana' ? setMaxSol : activeNet?.type === 'btc' ? setMaxbtc : activeNet?.type === 'tron' ? setMaxtron :activeNet?.type === 'doge' ? setMaxdoge : setMax}
                style={{ marginRight: 10, paddingHorizontal: 20, paddingVertical: 11, backgroundColor: 'gray', borderRadius: 5  }}
            >
                <Text style={{ color: theme.buttonText }}>MAX</Text>
            </TouchableOpacity>
            </View>
            
           
                {activeNet ? 
            <View style={styles.tokenImportBtnWrapper}>
                <TouchableOpacity style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]} onPress={() => handleSend()}>
                    <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>Send</Text>
                </TouchableOpacity>
            </View>:""}
        </>    
        }
            
        </ScrollView>
    )
}

export default Buy;

const styles = StyleSheet.create({
    MainWrapper: {
        // backgroundColor: '#280D2C',
        padding: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        color: '#000', // Adjust based on your theme
    },
    buyAmount: {
        // color: "#fff",
        textAlign: "center",
        fontSize: 42,
        fontWeight: "700",
        marginVertical: 20
    },
    currencyDetailFlex: {
        // backgroundColor: "#362538",
        padding: 14,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 20
    },
    coinFlex: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 16
    },
    coinMainText: {
        // color: "#fff",
        fontSize: 22,
        fontWeight: "600",
    },
    coinSecText: {
        // color: "#fff",
        fontSize: 16,
        fontWeight: "400",
    },
    tokenImportBtnWrapper: {
        marginTop: 25
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
})