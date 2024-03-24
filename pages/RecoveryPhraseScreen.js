import React, {useContext , useEffect , useState} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  PermissionsAndroid 
} from 'react-native';
import baidu from '../assets/images/baidu.png';
import gd from '../assets/images/gd.png';
import icloud from '../assets/images/icloud.png';
import Header from '../components/header';
import {ThemeContext} from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CreateWallet, CreateEVMWallet , getSolBalance , getEVMBalance } from '../utils/function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {GoogleSignin} from 'react-native-google-signin';
import GDrive from 'react-native-google-drive-api-wrapper';
import DocumentPicker from 'react-native-document-picker';
import {
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';



const createAndSaveJSONFile = async (data, fileName) => {
  const path = `${RNFS.DocumentDirectoryPath}/${fileName}.json`;
  try {
    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data, null, 2);
    
    // Write the JSON string to a file in the device's document directory
    await RNFS.writeFile(path, jsonData, 'utf8');
    
    console.log(`JSON file created at: ${path}`);
    return path; // Return the path where the file was saved
  } catch (error) {
    console.error('Failed to create JSON file:', error);
  }
};

const shareFile = async (filePath) => {
  try {
    const shareOptions = {
      url: `file://${filePath}`, // Note: prepending 'file://' is important
      type: 'application/json',
      failOnCancel: false,
    };

    await Share.open(shareOptions);
  } catch (error) {
    console.error('Failed to share file:', error);
  }
};


const MnemonicComponent = ({ mnemonic, theme }) => {
  // Split the mnemonic into an array of words
  const wordsArray = mnemonic.split(' ');

  return (
    <View style={styles.container}>
    <View style={styles.words}>
    <FlatList
      data={wordsArray}
      renderItem={({ item, index }) => (
        <View key={index} style={styles.wordPair}>
          {/* <Text style={{ color: theme.text }}>{``}</Text> */}
          <View style={[styles.word, { borderColor: theme.wordBorder , width:'60%' , alignItems: 'center' , flexDirection : 'row' , justifyContent:'left'}]}>
          <Text style={{ color: theme.text }}>{`${index + 1}.   `}</Text>
            <Text style={{ color: theme.text }}>{`${item}`}</Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={2} // Set the number of columns
      contentContainerStyle={styles.listContainer}
    />
      {/* {wordsArray.map((word, index) => (
        <View key={index} style={styles.wordPair}>
          <Text style={{ color: theme.text }}>{`${index + 1}. `}</Text>
          <View style={[styles.word, { borderColor: theme.wordBorder , width:'80%' , justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: theme.text }}>{` ${word}`}</Text>
          </View> */}
          {/* {wordsArray[index + 1] && (
            <View style={[styles.word, { borderColor: theme.wordBorder }]}>
              <Text style={{ color: theme.text }}>{`${index + 2}. ${wordsArray[index + 1]}`}</Text>
            </View>
          )} */}
        {/* </View>
      ))} */}
    </View>
  </View>
  );
};

const Networks = [
  {
    networkName: "Ethereum",
    nodeURL: "https://eth.drpc.org",
    symbol: "ETH",
    networkId:1,
    explorerURL: "https://etherscan.io/tx/",
    type : "evm"
  },
{
   networkName: "BSC Chain",
   nodeURL: "https://bsc.publicnode.com",
   symbol: "BNB",
   networkId:56,
   explorerURL: "https://bscscan.com/tx/",
   type : "evm",
},
// {
//    networkName: "BSC Testnet",
//    nodeURL: "https://data-seed-prebsc-2-s1.binance.org:8545",
//    symbol: "BNB Test",
//    networkId:97,
//    explorerURL: "https://testnet.bscscan.com/tx/",
//    type : "evm"
// },
{
  networkName: "Polygon",
  nodeURL: "https://polygon-rpc.com",
  symbol: "MATIC",
  networkId : 137 ,
  explorerURL: "https://polygonscan.com",
  type : "evm"
},
{
  networkName: "Solana",
  nodeURL: "https://api.mainnet-beta.solana.com",
  symbol: "SOL",
  networkId : 0 ,
  explorerURL: "https://explorer.solana.com/tx/",
  type : "solana"
}
// ,
// {
//   networkName : "Solana DevNet",
//   nodeURL : "https://api.devnet.solana.com",
//   symbol : "SOL Dev",
//   networkId : 0 ,
//   explorerURL : "https://explorer.solana.com/tx/",
//   type : "solana"
// }
]

export default function RecoveryPhraseScreen({navigation}) {
  const {theme} = useContext(ThemeContext);
  const [mnemonic , setMnemonic] = useState();
  const {setSelectedAccount,addAccount , setNetworks,setSelectedNetwork} = useAuth()
  const [backup , setBackup]  = useState()
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const getWalletData = async () => {
    let data = await CreateWallet()
    let EVMdata = await CreateEVMWallet()
    setMnemonic(data.mnemonic)
    
    const account_data = {
      solana : data,
      evm : EVMdata
    }
    setBackup(account_data)
    setSelectedAccount(account_data)
    await AsyncStorage.setItem('selectedAccount', JSON.stringify(account_data));
    await AsyncStorage.setItem('Accounts', JSON.stringify([account_data]));
    addAccount(account_data)


    // let solbalance = await getSolBalance()
    // let evmbalance = await getEVMBalance()

    // console.log("EVM Native Balance >>>>>>", evmbalance)
    // console.log("Solana Native Balance >>>>>>", solbalance)
    // console.log("Solana Native Account >>>>>>",data)
    // console.log("EVM Native Balance >>>>>>",EVMdata)
  }

  useEffect(()=>{
    getWalletData();
    AsyncStorage.setItem('Networks', JSON.stringify(Networks));
    AsyncStorage.setItem('SelectedNetworks', JSON.stringify(Networks[0]));
    setNetworks(Networks)
    setSelectedNetwork(Networks[0])
  },[])


  const handleSaveFile = async () => {
    const data = { backup : backup }; 
    const fileName = 'Wallet_Backup'; 
    const filePath = await createAndSaveJSONFile(data, fileName);
    if (filePath) {
      await shareFile(filePath);
    }
  };
  console.log(mnemonic)
  return (
    <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
      <Header
        title="Secret Key"
        onBack={() => navigation.goBack()}
      />
      <View style={[styles.content, styles.textContainer]}>
        <Text style={[styles.textStyle, {color: theme.text}]}>
          Set Up Your Recovery Phrase
        </Text>
        <Text
          style={[styles.textStyle, styles.instruction, {color: theme.text}]}>
          Write down or copy these words in right order
        </Text>
      </View>
      <View style={styles.content}>
        {/* <View style={styles.words}>
          <View style={styles.wordPair}>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>1. Hello</Text>
            </View>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>2. ABXC</Text>
            </View>
          </View>
          <View style={styles.wordPair}>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>1. Hello</Text>
            </View>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>2. ABXC</Text>
            </View>
          </View>
          <View style={styles.wordPair}>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>1. Hello</Text>
            </View>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>2. ABXC</Text>
            </View>
          </View>
          <View style={styles.wordPair}>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>1. Hello</Text>
            </View>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>2. ABXC</Text>
            </View>
          </View>
          <View style={styles.wordPair}>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>1. Hello</Text>
            </View>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>2. ABXC</Text>
            </View>
          </View>
          <View style={styles.wordPair}>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>1. Hello</Text>
            </View>
            <View style={[styles.word, {borderColor: theme.wordBorder}]}>
              <Text style={{color: theme.text}}>2. ABXC</Text>
            </View>
          </View>
        </View> */}
        {mnemonic && (
          <>
          <MnemonicComponent mnemonic={mnemonic} theme={theme} />
          <View style={styles.buttons}>
          <TouchableOpacity
              style={[styles.buttonStyle, {borderColor: theme.buttonBorder}]}
              onPress={() => navigation.navigate('RecoveryConfirm', { mnemonic: mnemonic })}
              // onPress={()=> navigation.navigate('SetPasswordScreen')}
              >
              <Text style={[styles.btnText, {color: theme.text}]}>
                Next
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, {borderColor: theme.buttonBorder}]}
              onPress={() => handleSaveFile()}
              >
              <Text style={[styles.btnText, {color: theme.text}]}>
                Backup Manually
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                styles.backupBtn,
                {
                  borderColor: theme.backupBtnBorder,
                  backgroundColor: theme.backupBtnBG,
                },
              ]}>
              <Image style={styles.logos} source={icloud} />
              <Text style={[styles.btnText, {color: theme.text}]}>
                Backup to iCloud
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                styles.backupBtn,
                {
                  borderColor: theme.backupBtnBorder,
                  backgroundColor: theme.backupBtnBG,
                },
              ]}
              >
              <Image style={styles.logos} source={gd} />
              <Text style={[styles.btnText, {color: theme.text}]}>
                Backup to Google Drive
              </Text>
            </TouchableOpacity>
       
          </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    height: 120, // Set height according to your needs
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Example background color
    // Additional styling for the grid items
  },
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  words: {
    marginBottom: 10,
    
  },
  wordPair: {
    flexDirection: 'row',
    marginBottom: 5,
    // width:"70%",
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  word: {
    // width: 0,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    // paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    // borderColor: '#5F3665',
    // background: '#351739',
    // padding: 5,
    // flex: 0.48, // Adjust flex to fit two columns in one row
  },
  imgBackground: {
    // width: '100%',
    height: 110,
    justifyContent: 'center',
    flex: 1,
  },
  skip: {
    color: '#F43459',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    // marginBottom: 70,
  },
  title: {
    // color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  bgImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 80,
  },
  content: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 70,
    gap: 32,
  },
  textContainer: {
    gap: 0,
    marginBottom: 30,
  },
  textStyle: {
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 15,
  },
  instruction: {
    // marginTop: 0,
    fontSize: 14,
    marginTop: 12,
  },

  words: {
    gap: 10,
    // flex: 1,
  },

  buttonStyle: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    // gap: 12,
    // width: 360,
    // borderColor: '#FF003C',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 1000,
  },
  buttons: {
    gap: 10,
  },
  backupBtn: {
    // backgroundColor: '#351739',
    // borderColor: '#351739',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logos: {
    width: 35,
    height: 23,
    marginRight: 10,
  },
  btnText: {
    textAlign: 'center',
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: '600',
  },
});