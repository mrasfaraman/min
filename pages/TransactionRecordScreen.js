import React, { useState, useContext , useEffect } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
// import {Image} from 'react-native-svg';
import Header from '../components/header';
import TransactionDetail from '../components/TransactionDetail';
import BottomMenu from '../components/BottomMenu';
import {ThemeContext} from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getEvmTrx , getsolTrxsignatures , getsolTrx} from '../utils/function';
import MaroonSpinner from '../components/Loader/MaroonSpinner';
import Trancactions from '../components/Transactions/Transactions';

function convertEpochToLocalStandardTime(epochTime) {
  // Create a new Date object using the epoch time
  const date = new Date(epochTime * 1000); // JavaScript uses milliseconds

  // Format the date and time in a readable format
  // Example: "MM/DD/YYYY, HH:MM:SS AM/PM"
  const formattedDate = date.toLocaleString();

  return formattedDate;
}
function extractFirstWord(inputString) {
  // Find the index of the first parenthesis
  const indexOfParenthesis = inputString.indexOf('(');

  // Extract and return the substring from the start to the first parenthesis
  if (indexOfParenthesis !== -1) {
    return inputString.substring(0, indexOfParenthesis);
  } else {
    // In case there is no parenthesis, return the whole string or handle as needed
    return inputString;
  }
}

export default function TransactionRecordScreen({ navigation }) {
  const {theme} = useContext(ThemeContext);
  const [trx ,setTrx] = useState([])
  const [soltrx ,setsolTrx] = useState([])
  const [detailOpen, setDetailOpen] = useState(false)
  const [Loader, setLoader] = useState(false)
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

  // const Network = activeNet?.type;
  // const [activeAccount, setActiveAccount] = useState();
  // const [activeNet, setActiveNet] = useState()
  // const [net, setNet] = useState()

  // const getNetworkactive = async () => {
  //     let data = await JSON.parse(selectedNetwork)
  //     setActiveNet(data) 
  // }
  
  // useEffect(() => {
  //   getNetworkactive()
  // }, [selectedNetwork,setActiveNet , selectedAccount])

  // useEffect(() => {
  //   const timeoutId = setTimeout( async () => {
  //     let data = await JSON.parse(selectedNetwork)
  //     try{
  //       setLoader(true)
  //       setNet(data?.type)

  //           if(data?.type === 'solana'){
  //             let responce = await getsolTrxsignatures(selectedAccount?.solana?.publicKey)
  //             let solTrx = []
  //             for (let i = 0; i < responce.length; i++) {
  //               let signatureDetail = await getsolTrx(responce[i].signature)
  //               console
  //               solTrx.push(signatureDetail);
  //             }
  //             console.log(solTrx,'solTrx');
  //             setsolTrx(solTrx)
  //             setLoader(false)
  //           }else{
  //             let response = await getEvmTrx(selectedAccount?.evm?.address , data?.nodeURL)
  //            if(!response){
  //             setTrx([])
  //             setLoader(false)
  //            }else{
  //             setTrx(response.transactions)
  //             setLoader(false)
  //            }
  //           }
  //       }catch(error){
       
  //       }
  // }, 3000);
  // return () => clearTimeout(timeoutId);
  // }, [selectedAccount]);

  // const OpenDetail = (val) => {
  //   setDetailOpen(val)
  // }


  // const renderTransactions =  ({ item }) => {
  //   const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
  //   const functionName = extractFirstWord(tx?.functionName);
  //   let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
  
  //   return (
  //     <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} onPress={() => console.log(time , functionName , currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress)}>
           
  //       <View style={styles.row}>
  //         <View style={styles.left}>
  //           {/* <Image source={logo} /> */}
  //           <Text style={[styles.token, {color: theme.text}]}>{tx?.functionName ? functionName : sendOrReceived}</Text>
  //           {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
  //           <View>
  //             {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
  //             {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
  //           </View>
  //         </View>
  //         <View>
  //         <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
  //           <View style={[styles.right, {color: theme.text}]}>
  //             <Text
  //               style={
  //                 tx?.value === '-'
  //                   ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
  //                   : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
  //               }
  //               >
  //               {(tx?.value / 10 ** 18).toFixed(4)}
  //             </Text>
  //             <Text style={[styles.amount, {color: theme.text}]}> {currencySymbol}</Text>
  //           </View>
            
  //           {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
  //         </View>
  //       </View>
  //       <View style={styles.line}>
  //         <View style={styles.statusContainer}>
  //           <Text style={{ color: theme.text }}>Status:</Text>
  //           <View
  //             style={
  //               status === 'Success'
  //                 ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
  //                   : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
  //             }>
  //             <Text
  //               style={
  //                 status === 'Completed'
  //                   ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
  //                   : status === 'Cancelled'
  //                     ? [styles.statusTextRed, {color: theme.statusTextRed}]
  //                     : [styles.statusTextYellow, {color: theme.statusTextYellow}]
  //               }>
  //               {status}
  //             </Text>
  //           </View>
  //         </View>
  //         <View style={styles.dateContainer}>
  //           <Text style={{ color: theme.text }}>Date:</Text>
  //           <Text style={{ color: theme.text }}> {time}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const renderSolTransactions =  ({ item }) => {
  //   console.log(">>>>>> SOL Trxxx" , item)
  //   console.log(">>>>>> SOL Trxxx" , item?.transaction_info)

  //   return (
  //     <>
  //     {item == undefined ? "" :
  //     <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} onPress={() => console.log("---")}>
           
  //       <View style={styles.row}>
  //         <View style={styles.left}>
          
          
  //         <View>
  //         <Text style={[styles.token, {color: theme.text}]}>{item?.transaction_info?.toAddress == "https://solscan.io/account/"+selectedAccount?.solana?.publicKey ? "Received" : "Send" }</Text>
          
  //           </View>
  //         </View>
  //         <View>
  //         <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
  //           <View style={[styles.right, {color: theme.text}]}>  
  //             <Text
  //               style={
  //                 item?.transaction_info?.amount === '-'
  //                   ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
  //                   : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
  //               }
  //               >
  //               {item?.transaction_info?.amount}
  //             </Text>
  //             <Text style={[styles.amount, {color: theme.text}]}> {item?.transaction_info?.symbol.toUpperCase()}</Text>
  //           </View>
            
  //         </View>
  //       </View>
  //       <View style={styles.line}>
  //         <View style={styles.statusContainer}>
  //           <Text style={{ color: theme.text }}>Status:</Text>
  //           <View
  //             style={
  //               item?.Result === "SuccessFinalized (MAX confirmations)"
  //                 ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
  //                   : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
  //             }>
  //             <Text
  //               style={
  //                 item?.Result === "SuccessFinalized (MAX confirmations)"
  //                   ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
        
  //                     : [styles.statusTextYellow, {color: theme.statusTextYellow}]
  //               }>
  //               {item?.Result.substring(0,16)}
  //             </Text>
  //           </View>
  //         </View>
  //         <View style={styles.dateContainer}>
  //           {/* <Text style={{ color: theme.text }}>Date:</Text> */}
  //           <Text style={{ color: theme.text }}> {item?.Timestamp.substring(10,27)}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //     }
  //     </>
  //   );
  // };

  return (
    <View style={{flex: 1}}>
     <ScrollView style={[styles.screen, {backgroundColor: theme.screenBackgroud }]}>
        <Header title="Transaction Record" onBack={() => navigation.goBack()} />
        {/* <View style={styles.container}>
        {Loader ? <MaroonSpinner /> :
        <>
          <FlatList data={ net == 'evm' ? trx : soltrx } renderItem={ net == 'evm' ? renderTransactions : renderSolTransactions } />
        </>
      }    
        </View> */}
    <Trancactions />
      </ScrollView>
      <View>
        <BottomMenu navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // backgroundColor: '#280D2C',
    position: 'relative',
  },
  container: {
    // flex: 1,
    marginVertical: 24,
    marginHorizontal: 16,
    marginBottom: 65,
  },
  token: {
    // color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  transaction: {
    borderBottomWidth: 1,
    // borderBottomColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
  },
  right: {
    // color: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  amount: {
    // color: '#fff',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  amountRed: {
    // color: '#FF2238',
  },
  amountGreen: {
    // color: '#17B334',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 8,
  },
  statusGreen: {
    borderRadius: 4,
    // backgroundColor: '#121F1D',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 4,
  },
  statusRed: {
    borderRadius: 4,
    // backgroundColor: '#26161B',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 4,
  },
  statusYellow: {
    borderRadius: 4,
    // backgroundColor: '#f5770214',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 4,
  },
  statusTextGreen: {
    // color: '#17B334',
    fontFamily: 'SF Pro Text',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  statusTextRed: {
    // color: '#FC3044',
    fontFamily: 'SF Pro Text',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  statusTextYellow: {
    // color: '#F57702',
    fontFamily: 'SF Pro Text',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  menuContainer: {
    height: '30%',
    width: '100%',
    opacity: 1
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // // width: '80%',
    // // maxHeight: 5,
    // // margin: 20,
    // width: 100,
    // height: 100,
    // position: 'absolute',
    // bottom: 0,
    // right: 1,
    // left: 5,
    // flex: 5,
  },
  menu: {
    // aspectRatio: 1,
    // flex: 1,
    // maxWidth: 300,
    // resizeMode: 'contain',
    padding: 20,
    opacity: 0.70,
    // width: "100%"
    width: "600px"
  },
  BTCamount: {
    // color: '#FFF',
    fontFamily: 'Inter',
  },
  name: {
    // color: '#FFF',
    fontFamily: 'Inter',
  },
});
