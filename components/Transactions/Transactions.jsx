import React, { useState, useContext , useEffect } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
// import {Image} from 'react-native-svg';
import Header from '../header';
import TransactionDetail from '../TransactionDetail';
import BottomMenu from '../BottomMenu';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { getEvmTrx , getsolTrxsignatures , getsolTrx , getBitcoinTrx ,gettronTrx , getdogeTrx} from '../../utils/function';
import MaroonSpinner from '../Loader/MaroonSpinner';
import { Calendar } from 'react-native-calendars';

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

export default function Trancactions({ navigation }) {
  const {theme} = useContext(ThemeContext);
  const [trx ,setTrx] = useState([])
  const [btctrx ,setBtcTrx] = useState([])
  const [Trontrx ,setTronTrx] = useState([])
  const [Dogetrx ,setDogeTrx] = useState([])
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

  
  const [trxData, setTrxData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const applyFilter = () => {
    let filtered = trx;
    if (selectedDate) {
       filtered = filtered.filter(item => {
        // Perform filtering based on selected date
        // For example, if the item has a property called 'date':
        let time =  convertEpochToLocalStandardTime(item?.tx?.timeStamp)
        const [datePart, timePart] = time.split(', ');
        const [month, day, year] = datePart.split('/');
        const standardDateFormat = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const formattedDate = `${standardDateFormat}`;
        // console.log(formattedDate,"time")
        // console.log(selectedDate,"selectedDate")
        return formattedDate === selectedDate;
      });
    }
    if (filtered) {
     let data = []
      filtered = filtered.filter(item => {
        data.push(item);
      });
      setTrx(data);
    }
  };

  const Network = activeNet?.type;
  const [activeAccount, setActiveAccount] = useState();
  const [activeNet, setActiveNet] = useState()
  const [net, setNet] = useState()

  const getNetworkactive = async () => {
      let data = await JSON.parse(selectedNetwork)
      setActiveNet(data) 
  }
  
  useEffect(() => {
    getNetworkactive()
  }, [selectedNetwork,setActiveNet , selectedAccount])

  useEffect(() => {
    const timeoutId = setTimeout( async () => {
      let data = await JSON.parse(selectedNetwork)
      try{
        setLoader(true)
        setNet(data?.type)

            if(data?.type === 'solana'){
              let responce = await getsolTrxsignatures(selectedAccount?.solana?.publicKey)
              let solTrx = []
              for (let i = 0; i < responce.length; i++) {
                let signatureDetail = await getsolTrx(responce[i].signature)
                console
                solTrx.push(signatureDetail);
              }
              // console.log(solTrx,'solTrx');
              setsolTrx(solTrx)
              setLoader(false)
            }else if(data?.type === 'btc'){
              let response = await getBitcoinTrx(selectedAccount?.btc?.address)
              setBtcTrx(response)
              setLoader(false)
            }else if(data?.type === 'tron'){
              let response = await gettronTrx(selectedAccount?.tron?.address)
              setTronTrx(response)
              // console.log(Trontrx)
              setLoader(false)
            }else if(data?.type === 'doge'){
              let response = await getdogeTrx(selectedAccount?.doge?.address)

              setDogeTrx(response)
              setLoader(false)
            }else{
              let response = await getEvmTrx(selectedAccount?.evm?.address , data?.nodeURL)
             if(!response){
              setTrx([])
              setLoader(false)
             }else{
              setTrx(response.transactions)
              setTrxData(response.transactions)
              setLoader(false)
             }
            }
        }catch(error){
       
        }
  }, 3000);
  return () => clearTimeout(timeoutId);
  }, [selectedAccount]);



  const OpenDetail = (val) => {
    setDetailOpen(val)
  }

  useEffect(()=>{
    console.log(Dogetrx)
  },[])

  const renderBtcTransactions =  ({ item }) => {
    // console.log("asdsadsadsa")
    // const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
    // const functionName = extractFirstWord(tx?.functionName);
    // let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
              //   console.log(item?.fee)
              // console.log(item?.txid)
              // console.log(item?.status?.confirmed)
              // console.log(item?.vout[0]?.value)
              // console.log(item?.vout[0]?.scriptpubkey_address)


              // console.log(item?.vout[1]?.value)
              // console.log(item?.vout[1]?.scriptpubkey_address)
              // console.log(item)
              let sender = item?.vout[1]?.scriptpubkey_address
              // let recepent = item?.vout[0]?.scriptpubkey_address
    return (
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} >
           
        <View style={styles.row}>
          <View style={styles.left}>
            {/* <Image source={logo} /> */}
            <Text style={[styles.token, {color: theme.text}]}>{sender == selectedAccount?.btc?.address ? 'Send' : 'Received'}</Text>
            {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
            <View>
              {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
              {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>
              <Text
                style={
                  item?.vout[0]?.value === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {(item?.vout[0]?.value / 100000000).toFixed(4)}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> BTC</Text>
            </View>
            
            {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Status:</Text>
            <View
              style={
                item?.status?.confirmed
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  item?.status?.confirmed
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
                    : item?.status?.confirmed === 'Cancelled'
                      ? [styles.statusTextRed, {color: theme.statusTextRed}]
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {item?.status?.confirmed ? "Success" : "Panding"}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: theme.text }}>Change:</Text>
            <Text style={{ color: theme.text }}> {item?.vout[1]?.value / 100000000}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderTronTransactions =  ({ item }) => {
    // console.log(item)
    // const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
    // const functionName = extractFirstWord(tx?.functionName);
    // let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
              //   console.log(item?.fee)
              // console.log(item?.txid)
              // console.log(item?.status?.confirmed)
              // console.log(item?.vout[0]?.value)
              // console.log(item?.vout[0]?.scriptpubkey_address)


              // console.log(item?.vout[1]?.value)
              // console.log(item?.vout[1]?.scriptpubkey_address)
              // console.log(item)
              // let sender = item?.vout[1]?.scriptpubkey_address
              // let recepent = item?.vout[0]?.scriptpubkey_address
    return (
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} >
           
        <View style={styles.row}>
          <View style={styles.left}>
            {/* <Image source={logo} /> */}
            <Text style={[styles.token, {color: theme.text}]}>{item?.senderOrReceiver}</Text>
            {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
            <View>
              {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
              {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>
              <Text
                style={
                  Number(item?.amount) === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {Number(item?.amount)}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> TRX</Text>
            </View>
            
            {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Status:</Text>
            <View
              style={
                item?.status
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  item?.status
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
                    : item?.status?.confirmed === 'Cancelled'
                      ? [styles.statusTextRed, {color: theme.statusTextRed}]
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {item?.status}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: theme.text }}>Fee:</Text>
            <Text style={{ color: theme.text }}> {Number(item?.feeTRX)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderDogeTransactions =  ({ item }) => {
    // console.log(item)
    // const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
    // const functionName = extractFirstWord(tx?.functionName);
    // let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
                console.log(item?.hash)
              console.log(item?.block)
              console.log(item?.price)
              console.log(item?.value)
              
              let time =  convertEpochToLocalStandardTime(item?.time)
              console.log(time)
              // console.log(item?.vout[1]?.value)
              // console.log(item?.vout[1]?.scriptpubkey_address)
              // console.log(item)
              // let sender = item?.vout[1]?.scriptpubkey_address
              // let recepent = item?.vout[0]?.scriptpubkey_address
    return (
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} >
   <View style={styles.row}>
          <View style={styles.left}>
            {/* <Image source={logo} /> */}
            <Text style={[styles.token, {color: theme.text}]}>{item?.block}</Text>
            {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
            <View>
              {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
              {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>
              <Text
                style={
                  Number(item?.value) === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {Number(item?.value)}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> DOGE</Text>
            </View>
            
            {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Price:</Text>
            <View
              style={
                item?.price
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  item?.price
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
                    : item?.price === '-'
                      ? [styles.statusTextRed, {color: theme.statusTextRed}]
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {item?.price}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: theme.text }}>TimeStemp:</Text>
            <Text style={{ color: theme.text }}> {time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBtcTransactions =  ({ item }) => {
    // console.log("asdsadsadsa")
    // const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
    // const functionName = extractFirstWord(tx?.functionName);
    // let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
              //   console.log(item?.fee)
              // console.log(item?.txid)
              // console.log(item?.status?.confirmed)
              // console.log(item?.vout[0]?.value)
              // console.log(item?.vout[0]?.scriptpubkey_address)


              // console.log(item?.vout[1]?.value)
              // console.log(item?.vout[1]?.scriptpubkey_address)
              // console.log(item)
              let sender = item?.vout[1]?.scriptpubkey_address
              // let recepent = item?.vout[0]?.scriptpubkey_address
    return (
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} >
           
        <View style={styles.row}>
          <View style={styles.left}>
            {/* <Image source={logo} /> */}
            <Text style={[styles.token, {color: theme.text}]}>{sender == selectedAccount?.btc?.address ? 'Send' : 'Received'}</Text>
            {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
            <View>
              {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
              {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>
              <Text
                style={
                  item?.vout[0]?.value === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {(item?.vout[0]?.value / 100000000).toFixed(4)}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> BTC</Text>
            </View>
            
            {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Status:</Text>
            <View
              style={
                item?.status?.confirmed
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  item?.status?.confirmed
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
                    : item?.status?.confirmed === 'Cancelled'
                      ? [styles.statusTextRed, {color: theme.statusTextRed}]
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {item?.status?.confirmed ? "Success" : "Panding"}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: theme.text }}>Change:</Text>
            <Text style={{ color: theme.text }}> {item?.vout[1]?.value / 100000000}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderTronTransactions =  ({ item }) => {
    // console.log(item)
    // const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
    // const functionName = extractFirstWord(tx?.functionName);
    // let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
              //   console.log(item?.fee)
              // console.log(item?.txid)
              // console.log(item?.status?.confirmed)
              // console.log(item?.vout[0]?.value)
              // console.log(item?.vout[0]?.scriptpubkey_address)


              // console.log(item?.vout[1]?.value)
              // console.log(item?.vout[1]?.scriptpubkey_address)
              // console.log(item)
              // let sender = item?.vout[1]?.scriptpubkey_address
              // let recepent = item?.vout[0]?.scriptpubkey_address
    return (
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} >
           
        <View style={styles.row}>
          <View style={styles.left}>
            {/* <Image source={logo} /> */}
            <Text style={[styles.token, {color: theme.text}]}>{item?.senderOrReceiver}</Text>
            {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
            <View>
              {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
              {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>
              <Text
                style={
                  Number(item?.amount) === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {Number(item?.amount)}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> TRX</Text>
            </View>
            
            {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Status:</Text>
            <View
              style={
                item?.status
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  item?.status
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
                    : item?.status?.confirmed === 'Cancelled'
                      ? [styles.statusTextRed, {color: theme.statusTextRed}]
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {item?.status}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: theme.text }}>Fee:</Text>
            <Text style={{ color: theme.text }}> {Number(item?.feeTRX)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderDogeTransactions =  ({ item }) => {
    // console.log(item)
    // const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
    // const functionName = extractFirstWord(tx?.functionName);
    // let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
                console.log(item?.hash)
              console.log(item?.block)
              console.log(item?.price)
              console.log(item?.value)
              
              let time =  convertEpochToLocalStandardTime(item?.time)
              console.log(time)
              // console.log(item?.vout[1]?.value)
              // console.log(item?.vout[1]?.scriptpubkey_address)
              // console.log(item)
              // let sender = item?.vout[1]?.scriptpubkey_address
              // let recepent = item?.vout[0]?.scriptpubkey_address
    return (
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} >
   <View style={styles.row}>
          <View style={styles.left}>
            {/* <Image source={logo} /> */}
            <Text style={[styles.token, {color: theme.text}]}>{item?.block}</Text>
            {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
            <View>
              {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
              {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>
              <Text
                style={
                  Number(item?.value) === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {Number(item?.value)}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> DOGE</Text>
            </View>
            
            {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Price:</Text>
            <View
              style={
                item?.price
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  item?.price
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
                    : item?.price === '-'
                      ? [styles.statusTextRed, {color: theme.statusTextRed}]
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {item?.price}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: theme.text }}>TimeStemp:</Text>
            <Text style={{ color: theme.text }}> {time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTransactions =  ({ item }) => {
    const { currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress } = item;
    const functionName = extractFirstWord(tx?.functionName);
    let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
  
    return (
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} onPress={() => console.log(time , functionName , currencySymbol, from, sendOrReceived, status, to, tx, currencyAddress)}>
           
        <View style={styles.row}>
          <View style={styles.left}>
            {/* <Image source={logo} /> */}
            <Text style={[styles.token, {color: theme.text}]}>{tx?.functionName ? functionName : sendOrReceived}</Text>
            {/* <Text style={[styles.token, {color: theme.text}]}>{currencySymbol}</Text> */}
            <View>
              {/* <Text style={[styles.token, {color: theme.text}]}>{currencyAddress ? currencyAddress  : ""}</Text> */}
              {/* <Text style={[styles.name, {color: theme.text}]}>{sendOrReceived}</Text> */}
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>
              <Text
                style={
                  tx?.value === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {(tx?.value / 10 ** 18).toFixed(4)}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> {currencySymbol}</Text>
            </View>
            
            {/* <Text style={[styles.BTCamount, {color: theme.text}]}>{Web3.utils.toWei(tx?.value, 'ether')} {currencySymbol}</Text> */}
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Status:</Text>
            <View
              style={
                status === 'Success'
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  status === 'Completed'
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
                    : status === 'Cancelled'
                      ? [styles.statusTextRed, {color: theme.statusTextRed}]
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {status}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={{ color: theme.text }}>Date:</Text>
            <Text style={{ color: theme.text }}> {time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSolTransactions =  ({ item }) => {
    // console.log(">>>>>> SOL Trxxx" , item)
    // console.log(">>>>>> SOL Trxxx" , item?.transaction_info)
    // const {  Block , Fee , Signature , Timestamp , transaction_info} = item
    // console.log(transaction_info)
    // const ststus = extractFirstWord(item?.Result);
    // let time =  convertEpochToLocalStandardTime(tx?.timeStamp)
  
    return (
      <>
      {item == undefined ? "" :
      <TouchableOpacity style={[styles.transaction, {borderColor: theme.transactionBorder}]} onPress={() => console.log("---")}>
           
        <View style={styles.row}>
          <View style={styles.left}>
          
          
          <View>
          <Text style={[styles.token, {color: theme.text}]}>{item?.transaction_info?.toAddress == "https://solscan.io/account/"+selectedAccount?.solana?.publicKey ? "Received" : "Send" }</Text>
          
            </View>
          </View>
          <View>
          <TransactionDetail OpenDetail={OpenDetail} detailOpen={detailOpen} />
            <View style={[styles.right, {color: theme.text}]}>  
              <Text
                style={
                  item?.transaction_info?.amount === '-'
                    ? [styles.amount, {color: theme.text}, styles.amountRed, {color: theme.amountRed}]
                    : [styles.amount, {color: theme.text}, styles.amountGreen, {color: theme.amountGreen}]
                }
                >
                {item?.transaction_info?.amount}
              </Text>
              <Text style={[styles.amount, {color: theme.text}]}> {item?.transaction_info?.symbol.toUpperCase()}</Text>
            </View>
            
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.text }}>Status:</Text>
            <View
              style={
                item?.Result === "SuccessFinalized (MAX confirmations)"
                  ? [styles.statusGreen, {backgroundColor: theme.statusGreen, borderColor: theme.statusGreen}]
                    : [styles.statusYellow, {backgroundColor: theme.statusYellow, borderColor: theme.statusYellow}]
              }>
              <Text
                style={
                  item?.Result === "SuccessFinalized (MAX confirmations)"
                    ? [styles.statusTextGreen, {color: theme.statusTextGreen}]
        
                      : [styles.statusTextYellow, {color: theme.statusTextYellow}]
                }>
                {item?.Result.substring(0,16)}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            {/* <Text style={{ color: theme.text }}>Date:</Text> */}
            <Text style={{ color: theme.text }}> {item?.Timestamp.substring(10,27)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      }
      </>
    );
  };

    return (
        <View style={{ flex: 1 }}>
            {/* <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Enter filter criteria"
        onChangeText={text => setFilterCriteria(text)}
        onSubmitEditing={applyFilter}
      /> */}
      {net == 'evm' ? 
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' , gap:80}}> 
      <TouchableOpacity onPress={() => setShowPopup(true)}>
        <Text>Date Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTrx(trxData)}>
        <Text>Clear Filter</Text>
      </TouchableOpacity>
      </View>
      :""}

      {/* Popup Modal */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
            <Text style={{color:'black',padding:10}}>Close</Text>
          </TouchableOpacity>

          {/* Calendar for date selection */}
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
          />

          {/* Apply Filter Button */}
          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <Calendar
        onDayPress={(day) => {setSelectedDate(day.dateString), applyFilter()}}
        markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
      /> */}
            <View style={styles.container}>
                {Loader ? <MaroonSpinner /> :
                    <>
                     {soltrx?.length == 0 && trx?.length == 0 && btctrx?.length == 0 && Trontrx?.length == 0 && Dogetrx?.length == 0 ?
                     <View  style={{ justifyContent: 'center', alignItems: 'center' , top:50}}>
                     <Text>No Transaction Found</Text>
                     </View>
                     :
                        <FlatList 
                          data={
                            net == 'evm' ? trx 
                          : net == 'btc' ? btctrx 
                          : net == 'tron' ? Trontrx 
                          : net == 'doge' ? Dogetrx 
                          : soltrx} 
                          renderItem={
                            net == 'evm' ? renderTransactions 
                          : net == 'btc' ? renderBtcTransactions 
                          : net == 'tron' ? renderTronTransactions 
                          : net == 'doge' ? renderDogeTransactions 
                          : renderSolTransactions}
                        />
                      }
                      
                    </>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 50,
    borderRadius: 10,
    padding: 20,
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
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
