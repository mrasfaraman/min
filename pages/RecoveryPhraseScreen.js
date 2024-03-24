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
import { CreateWallet, CreateEVMmainWallet , CreateBitcoinWallet , CreatedogeWallet , CreatetronWallet } from '../utils/function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import MaroonSpinner from '../components/Loader/MaroonSpinner';
import { encrypt , decrypt } from '../utils/function';

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
    <View style={styles.words}>
    <FlatList
      data={wordsArray}
      renderItem={({ item, index }) => (
        <View key={index} style={[styles.wordPair,  { marginRight:10,justifyContent:'center',alignItems:'center' }]}>
          {/* <Text style={{ color: theme.text }}>{``}</Text> */}
          <View style={[styles.word, { borderColor: theme.wordBorder , width:'100%' , alignItems: 'center' , flexDirection : 'row' , justifyContent:'center' , paddingVertical:10}]}>
          {/* <Text style={{ color: theme.text }}>{`${index + 1}.   `}</Text> */}
            <Text style={{ color: theme.text }}>{`${item}`}</Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={2} // Set the number of columns
      contentContainerStyle={styles.listContainer}
    />
     
    </View>

  );
};

const Networks = [
{
  networkName: "Ethereum",
  nodeURL: "https://eth.drpc.org",
  logo:"https://imgs.search.brave.com/u53HT9pRLFOyCehy8TvUhdccmOYPw65HQnWExFkSbE0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y29pbnBhcGVyLmNv/bS9jb2lucGFwZXIv/Zl93ZWJwLGNfbGlt/aXQsd18zODQwLHFf/YXV0bzpnb29kL2V0/aGVyZXVtX2V0aF9s/b2dvX2U2OWIxYzIz/NjgucG5n",
  symbol: "ETH",
  networkId:1,
  explorerURL: "https://etherscan.io/tx/",
  type : "evm"
},
{
   networkName: "BSC Chain",
   nodeURL: "https://bsc.publicnode.com",
   logo:"https://imgs.search.brave.com/enbbKzAZdRat161YMrvc_Df9R1D09Lp4dJO11vZE0vc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXNl/YXJjaC5iaW5hbmNl/LmNvbS9zdGF0aWMv/aW1hZ2VzL3Byb2pl/Y3RzL2JuYi9sb2dv/Mi5wbmc",
   symbol: "BNB",
   networkId:56,
   explorerURL: "https://bscscan.com/tx/",
   type : "evm",
},
// {
//   networkName : "Fantom",
//   nodeURL : "https://rpc.ftm.tools/",
//   logo:"https://imgs.search.brave.com/EWSxcCSbLrwOeZ3kBG5oMhLihCTGzUKviuZu7g0Mnjg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/MS53ZWJjYXRhbG9n/LmlvL2NhdGFsb2cv/ZnRtc2Nhbi9mdG1z/Y2FuLWljb24tZmls/bGVkLTI1Ni5wbmc_/dj0xNjc1NTkzODU1/NTE3",
//   symbol : "FTM",
//   networkId : 250 ,
//   explorerURL : "https://ftmscan.com/",
//   type : "solana"
// },
// {
//   networkName: "Polygon",
//   nodeURL: "https://polygon-rpc.com",
//   logo:"https://imgs.search.brave.com/GM8xwvKPzWeObxfEfskFiwEaVE08NUWS3yCVfGfOUJQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSppUE1ta1VZ/cWxIWDRVU3ZuNHZZ/X2VnLnBuZw",
//   symbol: "MATIC",
//   networkId : 137 ,
//   explorerURL: "https://polygonscan.com",
//   type : "evm"
// },
{
   networkName: "Bitcoin",
   nodeURL: "",
   logo:"https://imgs.search.brave.com/YPOiz11Wl1uEfLscA9y65f9A9DRADNmRbzXXCFXAsMY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9lbi5i/aXRjb2luLml0L3cv/aW1hZ2VzL2VuLzIv/MjkvQkNfTG9nb18u/cG5n",
   symbol: "BTC",
   networkId:97,
   explorerURL: "https://bitaps.com/",
   type : "btc"
},
{
  networkName: "Solana",
  nodeURL: "https://api.mainnet-beta.solana.com",
  logo:"https://imgs.search.brave.com/AFbV_Ma2ykjxCtBNec4xb7Jq1YdUMBoL0gDzzAL3M-U/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y29pbnBhcGVyLmNv/bS9jb2lucGFwZXIv/Zl93ZWJwLGNfbGlt/aXQsd18zODQwLHFf/YXV0bzpnb29kL3Nv/bGFuYV9zb2xfbG9n/b18zMmY5OTYyOTY4/LnBuZw",
  symbol: "SOL",
  networkId : 0 ,
  explorerURL: "https://solscan.io/tx/",
  type : "solana"
},
{
  networkName: "Tron",
  nodeURL: "",
  logo:"https://imgs.search.brave.com/zM2ZkIGKUPkdb0N_dwMveroOl5JVge8bMZHtAPUgYxc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y29pbnBhcGVyLmNv/bS9jb2lucGFwZXIv/Zl93ZWJwLGNfbGlt/aXQsd18zODQwLHFf/YXV0bzpnb29kL3Ry/b25fdHJ4X2xvZ29f/N2VlMzk0ZDU4Yi5w/bmc",
  symbol: "TRX",
  networkId:6,
  explorerURL: "https://tronscan.org/#/",
  type : "tron"
},
{
  networkName: "Doge Chain",
  nodeURL: "",
  logo:"https://imgs.search.brave.com/ArT0i8FukTXI9ndxCOhMJ-rAor_BAWVxjFNDtXJ5sw8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/YTUyMWY1MjJmOTNj/N2E4ZDUxMzdmYzcu/cG5n",
  symbol: "DOGE",
  networkId:6,
  explorerURL: "https://dogechain.info/",
  type : "doge"
},
]

export default function RecoveryPhraseScreen({navigation}) {
  const {theme} = useContext(ThemeContext);
  const [mnemonic , setMnemonic] = useState();
  const {setSelectedAccount,addAccount , setNetworks,setSelectedNetwork , selectedAccount} = useAuth()
  const [backup , setBackup]  = useState()
  const [loader , setLoader] = useState(false)
  const [loader2 , setLoader2] = useState(false)
  const getWalletData = async () => {
    setLoader(true)
    try{

    
    let data = await CreateWallet()
    let EVMdata = await CreateEVMmainWallet()
    let Bitcoin_data = await CreateBitcoinWallet()
    let Dogecoin_data = await CreatedogeWallet()
    let Tron_data = await CreatetronWallet()
    setMnemonic(data.mnemonic)
    
    const account_data = {
      solana : data,
      evm : EVMdata,
      btc : Bitcoin_data,
      doge: Dogecoin_data,
      tron: Tron_data
    }
    // console.log(account_data)
    let encryptData = await encrypt(account_data)
    setBackup(encryptData)
    setSelectedAccount(account_data)
    await AsyncStorage.setItem('selectedAccount', JSON.stringify(account_data));
    await AsyncStorage.setItem('Accounts', JSON.stringify([account_data]));
  
    setLoader(false)
  }catch(error){
    setLoader(false)
  }
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

  const pickFileAndLog = async () => {
    setLoader2(true)
    try {
      // Pick a single file
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type); // mime type
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);

      // Assuming it's a json file and you want to log its contents
      if (res[0].type === "application/json") {
        console.log(res[0].uri)
        // Read the file content
        RNFetchBlob.fs.readFile(res[0].uri, 'utf8')
          .then(async (data) => {
            // Here you have your file content as a string
            const jsonData = JSON.parse(data);
            let decryptData = await decrypt(jsonData.backup)
            if(decryptData){
              const account_data = {
                solana : decryptData.solana,
                evm : decryptData.evm
              }
              setBackup(account_data)
              setSelectedAccount(account_data)
              AsyncStorage.setItem('selectedAccount', JSON.stringify(account_data));
              AsyncStorage.setItem('Accounts', JSON.stringify([account_data]));
              addAccount(account_data)
              setLoader2(false)
              navigation.navigate('SetPasswordScreen')
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Restore Success',
                textBody: 'Wallet Restore Successfully',
              })
            }else{
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Restore Failed',
                textBody: 'File Is Not Valid',
              }) 
              setLoader2(false)
            }
          })
          .catch((error) => {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: 'Restore Failed',
              textBody: 'Failed to Read file',
            })
            setLoader2(false)
          });
        // const response = await fetch(res[0].uri);
        // const json = await response.json();
        
        // // Log the JSON content
        // console.log(json);
      } else {
        setLoader2(false)
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Restore Failed',
          textBody: 'Please select Restore file.',
        })
      }
    } catch (err) {
      setLoader2(false)
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
        console.log('User canceled the file picker');
      } else {
        throw err;
      }
    }
  };
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
         Save these Words
        </Text>
      </View>
      <View style={styles.content}>
     
      {loader ? <MaroonSpinner /> :
       <>
      {loader2 ? <MaroonSpinner /> :
       <>
        {mnemonic && (
          <>
          <View style={{marginLeft:3}}>
          <MnemonicComponent mnemonic={mnemonic} theme={theme} />
          </View>
          <View style={styles.buttons}> 
          
            <View style={{flexDirection: 'row',justifyContent:'space-between'}}>

            <TouchableOpacity
              style={[styles.buttonStyle, {borderColor: theme.buttonBorder, width:'49%'}]}
              onPress={() => handleSaveFile()}
              >
              <Text style={[styles.btnText, {color: theme.text}]}>
                Backup Manually
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, {borderColor: theme.buttonBorder, width:'49%'}]}
              onPress={pickFileAndLog}
              >
              <Text style={[styles.btnText, {color: theme.text}]}>
                Restore Backup
              </Text>
            </TouchableOpacity>
                </View>
                <TouchableOpacity
              style={[styles.buttonStyle, {borderColor: theme.buttonBorder}]}
              onPress={() =>{  addAccount(selectedAccount); navigation.navigate('SetPasswordScreen')}}>
              <Text style={[styles.btnText, {color: theme.text}]}>
                Next
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
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
              ]}>
              <Image style={styles.logos} source={gd} />
              <Text style={[styles.btnText, {color: theme.text}]}>
                Backup to Google Drive
              </Text>
            </TouchableOpacity> */}
       
          </View>
          </>
        )}
         <View>
     
        {/* <Button title="Pick a JSON file" onPress={pickFileAndLog} /> */}
      </View>
       </>
    }
       </>
       }
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
    width:"48%",
    // gap:5,
    justifyContent: 'space-around',
    alignItems: 'center',
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
