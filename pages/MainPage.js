import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Alert, StyleSheet, View, Text } from 'react-native';
import MainHeader from '../components/MainPage/MainHeader';
import CreditCard from '../components/MainPage/CreditCard';
import MainAssets from '../components/MainPage/MainAssets';
import MainList from '../components/MainPage/MainList';
import BottomMenu from '../components/BottomMenu';
import Customize from '../components/Customize';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth, } from '../context/AuthContext';
import '@walletconnect/react-native-compat';
import { Core } from '@walletconnect/core';
import { Web3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet'
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';
import { getSolBalance, getEVMBalance } from '../utils/function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnectModal from '../components/WalletConnectModal';
import LiveToken from '../components/MainPage/LiveTokens';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';



const MainPage = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [address, setAddress] = useState();
  const [activeNet, setActiveNet] = useState()
  const [activeAccount, setActiveAccount] = useState();
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
  const [sessionDetail, setSessionDetail] = useState({})

  const openCustomizer = val => {
    setCustomizerOpen(val);
  };

  const [walletModalOpen, setWalletModalOpen] = useState(false)

  const closeModal = (close) => {
    setWalletModalOpen(close)
  }
  const clearSession = () => {
    setSessionDetail({})
  }

  const handleConnectPress = async (wc_uri) => {
    console.log(">>>> run Connect");
    const core = new Core({
      projectId: 'c6cc849231f0c9770267752c7251f2b5',
    });

    const web3wallet = await Web3Wallet.init({
      core,
      metadata: {
        name: 'Crypto Wallet',
        description: 'Crypto Wallet to interface with Dapps',
        url: 'www.walletconnect.com',
        icons: [],
      },
    });
    setWeb3Wallet(web3wallet);

    const onSessionProposal = async (event) => {
      const { id, params } = event;

      try {
        const approvedNamespaces = buildApprovedNamespaces({
          proposal: params,
          supportedNamespaces: {
            eip155: {
              chains: ['eip155:1', 'eip155:137', 'eip155:56', 'eip155:97'],
              methods: [
                'eth_sendTransaction',
                'personal_sign',
                'eth_signTypedData',
                'eth_sign',
                'eth_call',
                'eth_getTransactionReceipt',
                'eth_getTransactionCount',
                'eth_estimateGas',
              ],
              events: ['accountsChanged', 'chainChanged'],
              accounts: [
                `eip155:1:${address.replace(/^"|"$/g, '')}`,
                `eip155:137:${address.replace(/^"|"$/g, '')}`,
                `eip155:56:${address.replace(/^"|"$/g, '')}`,
                `eip155:97:${address.replace(/^"|"$/g, '')}`
              ],
            },
          },
        });
        const session = await web3wallet.approveSession({
          id,
          namespaces: approvedNamespaces,
        });
        // console.log("Session approved:", session);
        saveSession({ id: Session.length + 1, session: session })
        // Toast.show({
        //   type: ALERT_TYPE.SUCCESS,
        //   title: 'Connection Sucessfull',
        //   textBody: 'Your Wallet is Connected With Dapp.',
        // })
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Connected Sucessfully',
          textBody: 'Your Wallet is Connected With Dapp.',
          button: 'close',
        })
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Error Connecting',
          textBody: 'Your Wallet is Not Connected With Dapp.',
        })
        console.log('Error handling session proposal:', error);
      }
    };

    web3wallet.on('session_proposal', onSessionProposal);

    try {
      console.log("URI:", wc_uri);
      await web3wallet.pair({ uri: wc_uri });
      console.log("Connecting to wallet!");
    } catch (error) {
      console.log('Error pairing with the URI:', error);
    }
  };

  const handleAccountsChanged = async (account, topic) => {
    if (!wallet || !topic) {
      console.error("Web3Wallet is not initialized or no active session.");
      return;
    }
    try {
      await wallet.emitSessionEvent({
        topic,
        event: {
          name: 'accountsChanged',
          data: [account]
        },
        chainId: 'eip155:1'
      })
      console.log('Accounts updated successfully.');
    } catch (error) {
      console.error('Error updating accounts:', error);
    }
  };

  const handleChainChanged = async (newChainId, topic) => {
    if (!wallet || !topic) {
      console.error("Web3Wallet is not initialized or no active session.");
      return;
    }

    try {
      await wallet.emitSessionEvent({
        topic,
        event: {
          name: 'chainChanged',
          data: newChainId
        },
        chainId: `eip155:${newChainId}`
      })

      console.log(`Chain updated to eip155:${newChainId} successfully.`);
    } catch (error) {
      console.error('Error updating chain:', error);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem('Accounts', JSON.stringify(Accounts));
  }, [Accounts])

  const getNetworkactive = async () => {
    let data = await JSON.parse(selectedNetwork)
    setActiveNet(data)
  }


  useEffect(() => {
    getNetworkactive()
    const swich = async () => {
      for (let i = 0; i < Session.length; i++) {
        await handleChainChanged(activeNet?.networkId, Session[i].session.topic);
      }
    }
    if (activeNet?.type == "evm") {
      swich()
    }
  }, [selectedNetwork, setActiveNet])

  useEffect(() => {
    const swich = async () => {
      for (let i = 0; i < Session.length; i++) {
        await handleAccountsChanged(address.replace(/^"|"$/g, ''), Session[i].session.topic);
      }
    }
    if (activeNet?.type == "evm") {
      swich()
    }
  }, [activeAccount, address])


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAddress(JSON.stringify(Network === 'solana' ? selectedAccount.solana.publicKey : Network === 'btc' ? selectedAccount.btc.address :  Network === 'tron' ? selectedAccount.tron.address :  Network === 'doge' ? selectedAccount.doge.address : selectedAccount.evm.address));
      setActiveAccount(JSON.stringify(Network === 'solana' ? selectedAccount.solana : Network === 'btc' ? selectedAccount.btc : Network === 'tron' ? selectedAccount.tron :Network === 'doge' ? selectedAccount.doge : selectedAccount.evm));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [Network, selectedAccount]);

  const getNetwork = async () => {
    AsyncStorage.setItem('Networks', JSON.stringify(Networks));
    AsyncStorage.setItem('SelectedNetworks', selectedNetwork);
  }
  useEffect(() => {
    getNetwork()
  }, [Networks])

  useEffect(() => {
    if (route?.params?.qrData) {
      handleConnectPress(route?.params?.qrData)
    }
  }, [route?.params?.qrData]);

  useEffect(() => {
    if (wc) {
      handleConnectPress(wc)
    }
  }, [wc]);

  useEffect(() => {
    if (wallet) {
      wallet.on('session_request', (error, payload) => {
        // Handle session requests
        console.log("Payload: ",payload)
        console.log("Error: ", error);
        if (error) {
          setSessionDetail(error)
          setWalletModalOpen(true)
          // console.log("Fast ======>", error);
          // console.log("Here our saves Session ====> ", Session)
          return;
        }
        console.log('Session request received:', payload);
      });

      wallet.on('call_request', (error, payload) => {
        // Handle call requests for methods such as eth_sendTransaction
        console.log("Payload: ",payload)
        console.log("Error: ", error);

        if (error) {
          console.log(">>> Session Req", error);
          setSessionDetail(error)
          setWalletModalOpen(true)
          return;
        }
        console.log('Call request received:', payload);

        // Here you would handle the request, e.g., prompt the user for confirmation
      });

      // Other listeners can be added here as needed

      // Clean up listeners when the component unmounts or when wallet changes
      return () => {
        // if(Session[Session.length]){
        //   console.log(Session[Session.length])
        //   handleDisconnectPress(Session[Session.length].topic)
        // }
        console.log(">>> Wallet Off Required")
        // wallet.off('session_request');
        // wallet.off('call_request');
        // Disconnect any other listeners you may have set up
      };
    }
  }, [wallet]);

  useEffect(() => {
    // console.log("Big Dream here ==> ", sessionDetail)
  }, [sessionDetail])
  return (

    <View style={[styles.screen, { backgroundColor: theme.screenBackgroud }]}>
      <View style={styles.screenMax}>
        <ScrollView>
          <Customize
            getOpenCustomizer={openCustomizer}
            customizerOpen={customizerOpen}
            navigation={navigation}
          />
          <MainHeader address={address} navigation={navigation} />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ color: theme.text }}> {activeNet?.networkName}</Text>
          </View>
          <CreditCard
            activeAccount={activeAccount}
            address={address}
            getOpenCustomizer={openCustomizer}
            customizerVal={customizerOpen}
            navigation={navigation}
          />
           <LiveToken navigation={navigation} address={address} />
          {/* <MainAssets navigation={navigation} address={address} /> */}
          <MainList navigation={navigation} />
        </ScrollView>
        <View>
          <WalletConnectModal OpenDetail={closeModal} clearSession={clearSession} detailOpen={walletModalOpen} sessionData={sessionDetail} />
          <BottomMenu navigation={navigation} />
        </View>
      </View>
    </View>

  );
};

export default MainPage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: '#280D2C',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  screenMax: {
    maxWidth: 450,
  },
});
