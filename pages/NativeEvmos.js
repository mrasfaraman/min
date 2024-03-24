import React, {useContext , useEffect, useState} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    FlatList,
} from 'react-native';
import { Button } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import Header from "../components/header";
import {ThemeContext} from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import MaroonSpinner from '../components/Loader/MaroonSpinner';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { getSolBalance , getEVMBalance , getBTCBalance , getdogeBalance, gettronBalance ,getStakedDetails , Staked , getStakedbyaddress ,ClaimStaked , sendSolNative} from '../utils/function';
const lock = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Lock-red.svg/483px-Lock-red.svg.png'
function calculateTimeDifference(epochTime) {
    // Convert epoch time to milliseconds
    const epochMilliseconds = epochTime * 1000;
    const currentTimeMilliseconds = Date.now();

    // Calculate the time difference in milliseconds
    let difference = epochMilliseconds - currentTimeMilliseconds;

    // If time has passed, return 'unlock'
    if (difference <= 0) {
        return 'unlock';
    }

    // Calculate days
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference %= (1000 * 60 * 60 * 24);

    // Calculate hours
    const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
    difference %= (1000 * 60 * 60);

    // Calculate minutes
    const minutesDifference = Math.floor(difference / (1000 * 60));

    // Return an object containing days and minutes difference
    return {
        days: daysDifference,
        hours: hoursDifference,
        minutes: minutesDifference
    };
}


const NativeEvmos = ({navigation , route}) => {
    const {theme} = useContext(ThemeContext);
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
    const [address, setAddress] = useState();
    const [activeAccount, setActiveAccount] = useState();
    const [loader , setLoader] = useState(false)
    const [networkData , setNetworkData] = useState(route?.params?.data);
    const [ballance, setBalance] = useState();
    const [stakeDetail , setStakeDetail] = useState()
    const [lockTime , setLockTime] = useState()
    const [stakeAmount, setStakeAmount] = useState('');
    const [myStaking , setMyStaking] = useState();
    const [totelStake , setTotalStake] = useState(false);
    const [totelStakeAmount , setTotalStakeAmount] = useState(0);

    // for solana staking only
    const ownerAddress = 'GMVEc9XBKGGHrmGnKVPwAymGb41S7AV6JmN72uviyZ9e';
    const ownerPrivateKey = '5nRgh4F1SXJUNuHDQvgp8tVFzgiqKzxoRXrtePS2EYgCo856ozhWT1XmkpkRjQspXk5iUfqP9iB8Cz14jK3Ridji';
    const ownerMnemonic = 'raw found mule auction gasp first situate tattoo pelican matrix forward pear'

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setAddress(JSON.stringify(networkData.type === 'solana' ? selectedAccount.solana.publicKey : networkData.type === 'btc' ? selectedAccount.btc.address :  networkData.type === 'tron' ? selectedAccount.tron.address :  networkData.type === 'doge' ? selectedAccount.doge.address : selectedAccount.evm.address));
          setActiveAccount(JSON.stringify(networkData.type === 'solana' ? selectedAccount.solana : networkData.type === 'btc' ? selectedAccount.btc : networkData.type === 'tron' ? selectedAccount.tron :networkData.type === 'doge' ? selectedAccount.doge : selectedAccount.evm));
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [networkData, selectedAccount]);

    const setMaxSol = async () => {
        setLoader(true)
        try{
            let  maxBalance = ballance >  0 ? ballance - 0.000010 : 0
            setStakeAmount(maxBalance.toString())
            setLoader(false)
        }catch(error){
            setLoader(false)
        }
    }

    const getbls = async () => {
        if (networkData.type === "evm") {
          let data = await getEVMBalance(address.replace(/^"|"$/g, ''), activeNet?.nodeURL)
          setBalance(data?.balance)
        }else if(networkData.type === "btc"){
          let data = await getBTCBalance(address.replace(/^"|"$/g, ''))
          setBalance(data?.balance)
        }else if(networkData.type === "tron"){
        //   console.log(address)
          let data = await gettronBalance(address.replace(/^"|"$/g, ''))
          setBalance(data?.balance)
        }else if(networkData.type === "doge"){
          let data = await getdogeBalance(address.replace(/^"|"$/g, ''))
          setBalance(data?.balance)
        }else {
          let data = await getSolBalance(address.replace(/^"|"$/g, ''))
        //   console.log(data)
          setBalance(data?.balance)
        }
      }

      const getStakedDetail = async () => {
        let responce = await getStakedDetails(networkData.type)
        let time = calculateTimeDifference(responce.data[0].locktime)
        // console.log(time)
        setLockTime(time)
        setStakeDetail(responce.data[0])
      }
      const getStakingbyaddress = async () => {
        const responce = await getStakedbyaddress(address , networkData?.type)
        setMyStaking(responce.data)
        const totalClaimedAmount = getTotalClaimedAmount(responce.data);
        setTotalStakeAmount(totalClaimedAmount);
      }

      const stake = async () =>{
      setLoader(true)
        try{
            if(networkData.type === "solana"){
                let response = await sendSolNative(activeAccount?.secretKey || activeAccount?.privateKey , ownerAddress, stakeAmount);
                console.log('Sending Sol...', response);
                if (response) {
                    const res = await Staked(networkData?.nodeURL ,address , stakeAmount , networkData?.type)
                    if(res){
                        Toast.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: 'SUCCESS',
                            textBody: `Your Amount ${stakeAmount + networkData?.symbol.toUpperCase()} Is Stakeed`,
                        })
                        getStakingbyaddress()
                        setLoader(false)
                    }else{
                        Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: 'Staking Failed',
                            textBody: `Try Again Later`,
                        })
                        setLoader(false)
                    }
                }else{
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Staking Failed',
                        textBody: `Try Again Later`,
                    })
                    setLoader(false)
                }
            }
           
        }catch(error){
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: `Network Error`,
            })
            setLoader(false)
        }
      }

      const continueStake = async () =>{
        if(ballance <= 0){
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: '0 Amount',
                textBody: `You Can not Stake 0 Amount`,
                button: 'Back',
                onPressButton:async () => {
                  Dialog.hide();
                }})
        }else{
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Confirmation',
                textBody: `Are you sure you want to Stake ${stakeAmount + networkData?.symbol.toUpperCase()} ?`,
                button: 'Confirm Stake',
                onPressButton:async () => {
                 await stake()
                  Dialog.hide();
                }})
        }
      }
      const claim = async (item) => {
        console.log(item?._id)
        console.log(item?.amount)
        setLoader(true)
        try{
            let response = await sendSolNative(ownerPrivateKey , address, item?.amount);
            if(response){
                const res = await ClaimStaked(id)
                console.log(res)
                if(res){
                    getStakingbyaddress()
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'SUCCESS',
                        textBody: 'You have Sussessfully Claim',
                        })
                        setLoader(false)
                }else{
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: 'Network Error',
                        })
                        setLoader(false)
                }
            }else{
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Network Error',
                    })
                    setLoader(false)
            }
        }catch(error){
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Network Error',
                })
                setLoader(false)
        }
      }
  
      const MyStakes = ({item , index}) => {
        if(!item.claim){
            return ;
        }
       
        return(
            <View style={[styles.rowContainer,{justifyContent:'space-between',borderColor: theme.buttonBorder , }]}>
            <View>
            <Text style={{fontSize:20 , fontWeight:500, color:'white'}}>{item?.amount?.toFixed(5)+"  " + networkData?.symbol.toUpperCase()}</Text>
            <Text  style={{fontSize:10 ,  color:'green'}}>{item?.date}</Text>
            </View>
            <View>
            <Text></Text>
            </View>
            <View style={styles.assetCardLastWrapper}>
                <View>
                    {lockTime == "unlock" ? 
                <Button onPress={()=>{
                    Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Claim Confirmation',
                    textBody: 'Are You Sure You Want to Claim!',
                    button: 'Claim',
                    onPressButton: () => {
                        claim(item)
                        Dialog.hide()
                    }
                    })
                }}>
                    Claim
                </Button>:
               <Image style={styles.pancakeLeftImage} source={{ uri: lock }} /> 
                // <Button style={{ color: "gray" , backgroundColor:'gray'}} >
                // </Button>
                }
                </View>
                </View>
            </View>
        )
      } 

      function getTotalClaimedAmount(data) {
        const claimedData = data.filter(item => item.claim === true);
        const totalClaimedAmount = claimedData.reduce((total, item) => total + item.amount, 0);
        return totalClaimedAmount;
      }

      useEffect(() => {
        getbls()
        const intervalId = setInterval(getbls, 20000);
        return () => clearInterval(intervalId);
      }, [Networks, address, activeAccount , selectedNetwork ,networkData])
        



      useEffect(()=>{

        getStakingbyaddress()
          getStakedDetail()
      },[selectedAccount , address , networkData])
    useEffect(()=>{
        setAddress(address?.replace(/^"|"$/g, ''))
        console.log(address)

    },[address])

    return (
        <ScrollView style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
            <Header title={networkData.networkName+" Staking"}  onBack={() => navigation.goBack()} />
            {loader ? (
                <View style={{marginTop:350}}>
                    <MaroonSpinner />
                </View>)
                :
                (
                    <>
                        <View style={[styles.gasFlexWrapper, { backgroundColor: theme.menuItemBG }]}>
                        <View style={styles.gasFeeFlex}>
                                <Text style={[styles.gasFeeLabel, { color: theme.text }]}>Address</Text>
                                <Text style={[styles.gasFee, { color: theme.emphasis }]}>{address ? address?.substring(0,10)+"....."+address?.substring(address?.length - 10,address?.length) : 'Loading...'}</Text>
                            </View>
                            <View style={styles.gasFeeFlex}>
                                <Text style={[styles.gasFeeLabel, { color: theme.text }]}>available</Text>
                                <Text style={[styles.gasFee, { color: theme.emphasis }]}>{ballance?.toFixed(5)} {networkData?.symbol.toUpperCase()}</Text>
                            </View>
                            <View style={styles.gasFeeFlex}>
                                <Text style={[styles.gasFeeLabel, { color: theme.text }]}>Staked</Text>
                                <Text style={[styles.gasFee, { color: theme.emphasis }]}>{Number(totelStakeAmount)} {networkData?.symbol.toUpperCase()}</Text>
                            </View>
                            <View style={styles.gasFeeFlex}>
                                <Text style={[styles.gasFeeLabel, { color: theme.text }]}>APR</Text>
                                <Text style={[styles.gasFee, { color: theme.emphasis }]}>{stakeDetail?.apr}%</Text>
                            </View>
                            <View style={styles.gasFeeFlex}>
                                <Text style={[styles.gasFeeLabel, { color: theme.text }]}>Lock Time</Text>
                                <Text style={[styles.gasFee, { color: theme.emphasis }]}>{lockTime == "unlock" ? "Staking Unlock" : lockTime?.days != 0 ? lockTime?.days + " days" : lockTime?.hours != 0 ? lockTime?.hours+" hours" :  lockTime?.minutes != 0 ? lockTime?.minutes+" min" : "Loading..."}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.stakeHeading, { color: theme.text }]}>Amount to Stake</Text>
                            <View style={[styles.nativeInpFlex, { backgroundColor: theme.promisBackground }]}>
                                <TextInput
                                    placeholder="0"
                                    onChangeText={setStakeAmount}
                                    value={stakeAmount}
                                    keyboardType="numeric"
                                    style={styles.nativeInpMain}
                                    placeholderTextColor={theme.emphasis} />
                                <TouchableOpacity onPress={()=>{ setMaxSol()}} >
                                    <Text style={[styles.nativeInpTextLable, { color: theme.emphasis }]}>Max</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <Text style={[styles.nativePercentage, { color: theme.text }]}>~ 0.00</Text> */}
                        </View>
                        {/* <View>
                            <Text style={[styles.stakeHeading, { color: theme.text }]}>Amount to Stake</Text>
                            <View style={[styles.nativeInpFlex, { backgroundColor: theme.promisBackground }]}>
                                <View style={styles.nativeRadioWrapper}>
                                    <RadioButton />
                                    <Text style={[styles.nativeRadioText, { color: theme.text }]}>Trust Nodes</Text>
                                </View>

                                <Text style={[styles.nativeValidatorVal, { color: theme.pancakeRightUpperText }]}>APR - 37.8%</Text>
                            </View>
                        </View> */}
                        <View style={[styles.nativeNoteWrapper, { backgroundColor: theme.nativeNoteWrapper }]}>
                            <Text style={[styles.nativeNote, { color: theme.nativeNote }]}>Staked funds are accessible {lockTime == "unlock" ? "Staking Unlock" : lockTime?.days != 0 ? lockTime?.days + " days" : lockTime?.hours != 0 ? lockTime?.hours+" hours" :  lockTime?.minutes != 0 ? lockTime?.minutes+" min" : "Loading..."} after unstaking</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{continueStake()}} style={[styles.tokenImportButton, { borderColor: theme.buttonBorder }]}>
                            <Text style={[styles.tokenImportButtonText, { color: theme.text }]}>Continue</Text>
                        </TouchableOpacity>
                        <View style={[styles.nativeNoteWrapper, { backgroundColor: 'transparent' }]}>
                            <Text style={[styles.stakeHeading, { color: theme.text , marginBottom:20, marginTop:10}]}>Staked List</Text>
                        {totelStakeAmount <= 0  && (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                         <Text style={{ color: theme.text }}> No Staked Found </Text>
                        </View>
                        )
                        }
                        <FlatList
                            data={myStaking}
                            renderItem={({ item , index}) =><MyStakes item={item} index={index}/> }
                        />      
                        </View>
                    </>
                )}
        </ScrollView>
    )
}

export default NativeEvmos;


const styles = StyleSheet.create({
    pancakeLeftImage: {
        width: 46,
        height: 46,
      },
    assetCardLastWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        // borderColor: "#FF003C",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10, // Optional: Add margin bottom to create space between rows
        // backgroundColor:'gray',
        width:'100%'
      },
      flatListContainer: {
        paddingVertical: 10, // Optional: Add vertical padding to the entire FlatList
      },
    mainWrapper: {
        // backgroundColor: '#280D2C',
        padding: 10,
    },
    // 
    gasFlexWrapper: {
        marginVertical: 10,
        padding: 24,
        // backgroundColor: "#362538",
        borderRadius: 16
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
    stakeHeading: {
        // color: "white",
        fontSize: 16,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    nativeInpFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "#351739",
        borderRadius: 8,
        padding: 14,
        marginTop: 8
    },
    nativeInpMain: {
        padding: 0,
        flex: 1
    },
    nativeInpTextLable: {
        // color: "#F43459",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize",
    },
    nativePercentage: {
        marginVertical: 8,
        // color: "white",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize",
    },
    nativeValidatorVal: {
        // color: "#31FF9C",
        fontSize: 12,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    nativeRadioWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    nativeRadioText: {
        // color: "white",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize",
    },
    nativeNoteWrapper: {
        marginTop: 15,
        padding: 12,
        // backgroundColor: "#fdd50214",
        borderRadius: 8
    },
    nativeNote: {
        // color: "#FDD502",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize"
    },
    // 
    tokenImportButton: {
        marginTop: 15,
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