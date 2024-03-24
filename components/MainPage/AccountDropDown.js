import React, { useContext, useState , useEffect} from "react";
import { Menu, HamburgerIcon, Box, Pressable, Center, NativeBaseProvider } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Button,
    FlatList,
    TextInput,
    Keyboard
} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from "../../context/AuthContext";
import { background } from "native-base/lib/typescript/theme/styled-system";
import {useTranslation} from 'react-i18next';
import i18n from '../../pages/i18n';

function AccountDropDown({navigation}) {
    const { theme } = useContext(ThemeContext);
    const [selectedAcount, setSelectedAccounts] = useState("Account 1")
    const { Accounts, setSelectedAccount , selectedAccount , updateAccountName} = useAuth()
    const Network = 'solana'

    const [modalVisible, setModalVisible] = useState(false);

    const [updateNameModalVisible, setUpdateNameModalVisible] = useState(false);
    const [accountIndexForUpdate, setAccountIndexForUpdate] = useState();
    const [newAccountName, setNewAccountName] = useState();

    const {t} = useTranslation();
    useEffect(() => {
      const loadSelectedLanguage = async () => {
        try {
          const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
          if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage); 
          }
        } catch (error) {
          console.error('Error loading selected language:', error);
        }
      };
      loadSelectedLanguage();
    }, []);


    const changeNetwork = async (account, index) => {
        setSelectedAccount(account)
       await setSelectedAccounts(account.name ? account?.name : `Account ${index + 1}`)
        setModalVisible(false)
    }

    useEffect(()=>{
        setSelectedAccount(Accounts[0])
    },[])
    
    const validate = async () => {
        for (let i = 0; i < Accounts.length; i++) {
            if(Accounts[i] == selectedAccount){
            setSelectedAccounts(Accounts[i].name ? Accounts[i]?.name : `Account ${index + 1}`)
            }
        }
    }
 
    
    useEffect(()=>{
        validate()
        // console.log(Accounts)
    },[selectedAccount , Accounts , setSelectedAccount])
    
    return (
        <>
              <TouchableOpacity onPress={() => { setModalVisible(true) }}>
         <Box w="100%" alignItems="center">
             {/* <Menu w="150" trigger={triggerProps => {
                return <Pressable style={{ alignContent: "center" }} accessibilityLabel="More options menu" {...triggerProps}>
                    <Text style={[styles.userAccount, { color: theme.text }]}>
                        {selectedAcount}
                    </Text>
                </Pressable>;
            }}>

                {Accounts.map((account, index) => (
                    <TouchableOpacity
                        onPress={() => changeNetwork(account, index)}>
                        <View style={{ padding: 10 }}>
                            <Text style={[styles.userAccount, { color: 'black' }]}>
                                Account {index + 1}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
                {JSON.stringify(Network == 'evm' ? account.evm.address : account.solana.publicKey)}
            </Menu> */}
      
            
                    <Text style={[styles.userAccount, { color: theme.text }]}>
                        {selectedAcount}
                    </Text>
         
        </Box>
            </TouchableOpacity>
        {/* <Modal
        animationType="slide"
            transparent={true}
            visible={updateNameModalVisible}
            onRequestClose={() => setUpdateNameModalVisible(false)}
        >
            <View  style={[styles.modalView, { backgroundColor: theme.screenBackgroud, color: theme.text ,  borderWidth: 1, borderColor:'red', borderWidth: 1 ,  justifyContent: 'flex-end' ,position:'fixed' }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new account name"
                    onChangeText={(text) => setNewAccountName(text)} // Implement setNewAccountName state hook
                />
                <Button
             
                    title="Save"
                    onPress={() => {
                        updateAccountName(accountIndexForUpdate, newAccountName); // Use the context's update function
                        setUpdateNameModalVisible(false);
                    }}
                />
            </View>
        </Modal> */}
<Modal
  animationType="slide"
  transparent={true}
  visible={updateNameModalVisible}
  onRequestClose={() => setUpdateNameModalVisible(false)}
>
  <View style={styles.overlayStyle}>
    <View style={[styles.modalContent, { backgroundColor: theme.screenBackgroud }]}>
      {/* Title for the Edit Name Modal */}
    
      <View style={[styles.amountInpWrapperFlex, { width: '100%', backgroundColor: theme.screenBackgroud, color: theme.text, justifyContent: 'space-between' }]}>
                            <View style={styles.amountImageLeftFlex}>
                            <Text style={[styles.modalTitle,{color: theme.text,}]}>Edit Account Name</Text>
                            </View>
                            <TouchableOpacity onPress={() => { setUpdateNameModalVisible(false) }}>
                                <Text style={[styles.amountSwapValue, { color: theme.text, backgroundColor: 'transparent' , marginBottom:20}]} >x</Text>
                            </TouchableOpacity>
                        </View>
      <TextInput
        style={styles.input}
        placeholder={Accounts[accountIndexForUpdate]?.name ? Accounts[accountIndexForUpdate]?.name : `Account ${accountIndexForUpdate + 1}` }
        placeholderTextColor="#999"
        onChangeText={(text) => setNewAccountName(text)}
      />
      
      {/* Using TouchableOpacity for the button to allow custom styling */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={async () => {
          updateAccountName(accountIndexForUpdate, newAccountName);
           validate();
          setUpdateNameModalVisible(false);
          setModalVisible(!modalVisible)
        }}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>



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
                                <Text style={[styles.amountSwapLable, { color: theme.text }]}>Accounts</Text>
                            </View>
                            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }}>
                                <Text style={[styles.amountSwapValue, { color: theme.text, backgroundColor: 'transparent' }]} >x</Text>
                            </TouchableOpacity>
                        </View>
                     
                        <FlatList
                            data={Accounts}
                            keyExtractor={(item, index) => item.id || index.toString()}
                            renderItem={({ item , index}) => {
                                
                                return (
                                    <TouchableOpacity   onPress={() => changeNetwork(item, index)}>
                                        <View
                                            style={[
                                                styles.panCakeCardWrapper,
                                                { borderBottomColor: theme.pancakeBorderBottom, width:1000 },
                                            ]}
                                        >
                                            <View style={styles.pancakeCardLeft}>
                                                <View
                                                    style={[
                                                        styles.pancakeLeftImgWrapper,
                                                        { backgroundColor: theme.pancakeImgBG , marginRight:10 },
                                                    ]}
                                                >
                                                    <Image style={[styles.pancakeLeftImage,{borderRadius:50}]} source={{ uri: 'https://t3.ftcdn.net/jpg/06/47/55/24/360_F_647552478_2ayY359RpCgfZY6Y3Z7bAvcnNIeJjBki.jpg' }} />
                                                </View>
                                            </View>
                                            <View style={styles.pancakeCardRight}>
                                                <Text style={[styles.pancakeRightUpperText, { color: theme.text }]}>
                                                   {item.name ? item.name : `Account ${index + 1}`}
                                                </Text>
                                                <View>
                                                <Text style={[styles.assetCoinSymbol, { color: theme.text, fontSize:10 }]}>
                                                EVM : {item?.evm?.address?.substring(0,25)}...
                                                </Text>
                                                <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:7}]}>
                                                Solana : {item?.solana?.publicKey?.substring(0,25)}...
                                                </Text>
                                                <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:7}]}>
                                                Bitcoin : {item?.btc?.address?.substring(0,25)}...
                                                </Text>
                                                <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:7}]}>
                                                Tron : {item?.tron?.address?.substring(0,25)}...
                                                </Text>
                                                 <Text style={[styles.assetCoinName, {color: theme.amountGreen ,fontSize:7}]}>
                                                Doge Chain: {item?.doge?.address?.substring(0,25)}...
                                                </Text>
                                            </View>
                                            </View>
                                     
                                            <View style={{marginLeft:50}}>
                                            {/* <Image style={{}} source={{uri:'https://cdn-icons-png.freepik.com/512/7527/7527819.png'}}  width={25} height={25} /> */}
                                            <TouchableOpacity onPress={() => { setUpdateNameModalVisible(true); setAccountIndexForUpdate(index); }}>
                                                <Image style={{}} source={{uri:'https://cdn-icons-png.freepik.com/512/7527/7527819.png'}}  width={25} height={25} />
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                       
                         
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={async () => { await navigation.navigate('CreateAccount'); setModalVisible(!modalVisible) }}>
                                <Text style={{ color: theme.text }}>Add Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
</>
        
        )
}


export default AccountDropDown;


const styles = StyleSheet.create({

    overlayStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        // textAlign: 'center',
      },
      input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        color: '#000',
        backgroundColor: '#fff',
      },
      saveButton: {
        backgroundColor: 'red', // Button background color
        padding: 10,
        borderRadius: 20, // Button border radius
        justifyContent: 'center',
        alignItems: 'center',
      },
      saveButtonText: {
        color: '#fff', // Text color for the button
        fontSize: 16,
        fontWeight: 'bold',
      },

    // input: {
    //     height: 40,
    //     margin: 12,
    //     borderWidth: 1,
    //     width: 250,
    //     padding: 10,
    //     alignItems:'center',
    //     justifyContent:'center',
    //     borderRadius: 5,
    //     color: '#fff', 
    // },
    coinSecText: {
        // color: "#fff",
        fontSize: 16,
        fontWeight: "400",
    },
    panCakeCardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        // borderBottomColor: "#3E1844",
        borderBottomWidth: 1,
        // gap: 12,
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
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
    },
    userAccount: {
        // color: '#FFF',
        textAlign: "center",
        fontFamily: 'SF Pro Text',
        fontSize: 11.47,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 15.293,
        letterSpacing: -0.229,
    },
})