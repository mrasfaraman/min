import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {StatusBar} from 'react-native';

import React from 'react';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DoodleProvider } from './context/DoodleContext';
import CreateWalletScreen from './pages/CreateWalletScreen';
import CurrencyScreen from './pages/CurrencyScreen';
import HomeScreen from './pages/HomeScreen';
import LanguageScreen from './pages/LanguageScreen';
import RecoveryPhraseScreen from './pages/RecoveryPhraseScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import SetPasswordScreen from './pages/SetPasswordScreen';
import SettingsScreen from './pages/SettingsScreen';
import ThemesScreen from './pages/ThemesScreen';
import TransactionRecordScreen from './pages/TransactionRecordScreen';
import MainPage from './pages/MainPage';
import PanCakeList from './pages/PanCakeList';
import Staking from './pages/Staking';
import AddToken from './pages/AddToken';
import Notification from './pages/Notification';
import Scan from './pages/Scan';
import Help from './pages/Help';
import HelpAnswers from './pages/HelpAnswers';
import QueryForm from './pages/QueryForm';
import EditProfile from './pages/EditProfile';
import Bridging from './pages/Bridging';
import Swap from './pages/Swap';
import ConfirmTransaction from './pages/ConfirmTransaction';
import NativeEvmos from './pages/NativeEvmos';
import { NativeBaseProvider, Box } from 'native-base';
import TokenList from './pages/TokenList';
import Verification from './pages/Verification';
import Chat from './pages/Chat';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import StatusBar from './components/StatusBar';
import BrowserScreen from './pages/BrowserScreen';
import LoginScreen from './pages/LoginScreen';
import ImportWallet from './pages/ImportWallet';
import Networks from './pages/Networks';
import CreateAccount from './pages/CreateAccount';
import SendToken from './pages/SendToken';
import BiometricAuthenticationScreen from './pages/BiometricAuthenticationScreen';
import BiometricEnrollmentScreen from './pages/BiometricEnrollmentScreen';
import ConfirmErc20Transaction from './pages/ConfirmErc20Transaction';
import ConfirmErc20SolTransaction from './pages/ConfirmErc20SolTransaction';
import ConfirmSolTransaction from './pages/ConfirmSolTransaction';
import ConfirmSolSwapTransaction from './pages/ConfirmSolSwapTransaction';
import SwapEvm from './pages/SwapEvm';
import ConfirmEvmSwapTransaction from './pages/ConfirmEvmSwapTransaction';
import ConfirmBtcTransaction from './pages/ConfirmBtcTransaction';
import AccountList from './pages/AcountList';
import ImportWalletMnemonic from './pages/ImportWalletMnemonic';
import ConfirmDogeTransaction from './pages/ConfirmDogeTransaction';
import ConfirmTronTransaction from './pages/ConfirmTronTransaction';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <AlertNotificationRoot>
    <AuthProvider>
      <ThemeProvider>
        <DoodleProvider>
          <NativeBaseProvider>
            <NavigationContainer>
              <StatusBar />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                  name="swapevm"
                  component={SwapEvm}
                />
                 <Stack.Screen
                  name="ConfirmEvmSwapTransaction"
                  component={ConfirmEvmSwapTransaction}
                />
                   <Stack.Screen
                  name="ConfirmBtcTransaction"
                  component={ConfirmBtcTransaction}
                />
                  <Stack.Screen
                  name="ConfirmDogeTransaction"
                  component={ConfirmDogeTransaction}
                />
                  <Stack.Screen
                  name="ConfirmTronTransaction"
                  component={ConfirmTronTransaction}
                />
                <Stack.Screen
                  name="AccountList"
                  component={AccountList}
                />
                <Stack.Screen
                  name="CreateWalletScreen"
                  component={CreateWalletScreen}
                />
                <Stack.Screen
                  name="BiometricEnrollmentScreen"
                  component={BiometricEnrollmentScreen}
                />
                <Stack.Screen
                  name="BiometricAuthenticationScreen"
                  component={BiometricAuthenticationScreen}
                />
                <Stack.Screen
                  name="RecoveryPhraseScreen"
                  component={RecoveryPhraseScreen}
                />
                <Stack.Screen
                  name="SetPasswordScreen"
                  component={SetPasswordScreen}
                />
                <Stack.Screen
                  name="ResetPasswordScreen"
                  component={ResetPasswordScreen}
                />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="Sell" component={Sell} />
                <Stack.Screen name="Buy" component={Buy} />
                <Stack.Screen
                  name="SettingsScreen"
                  component={SettingsScreen}
                />
                <Stack.Screen
                  name="TransactionRecordScreen"
                  component={TransactionRecordScreen}
                />

                <Stack.Screen name="NativeEvmos" component={NativeEvmos} />
                <Stack.Screen
                  name="ConfirmTransaction"
                  component={ConfirmTransaction}
                />
                <Stack.Screen
                  name="ConfirmSolTransaction"
                  component={ConfirmSolTransaction}
                />
                <Stack.Screen
                  name="ConfirmErc20Transaction"
                  component={ConfirmErc20Transaction}
                />
                <Stack.Screen
                  name="ConfirmErc20SolTransaction"
                  component={ConfirmErc20SolTransaction}
                />
                 <Stack.Screen
                  name="ConfirmSolSwapTransaction"
                  component={ConfirmSolSwapTransaction}
                />
                <Stack.Screen name="Swap" component={Swap} />
                <Stack.Screen name="Bridging" component={Bridging} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="QueryForm" component={QueryForm} />
                <Stack.Screen name="HelpAnswers" component={HelpAnswers} />
                <Stack.Screen name="Help" component={Help} />

                <Stack.Screen name="Scan" component={Scan} />
                <Stack.Screen name="Browser" component={BrowserScreen} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="AddToken" component={AddToken} />
                <Stack.Screen name="Staking" component={Staking} />
                <Stack.Screen name="PanCakeList" component={PanCakeList} />
                <Stack.Screen
                  name="CurrencyScreen"
                  component={CurrencyScreen}
                />
                <Stack.Screen
                  name="LanguageScreen"
                  component={LanguageScreen}
                />
                <Stack.Screen name="ThemesScreen" component={ThemesScreen} />
                <Stack.Screen name="TokenList" component={TokenList} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="ImportWalletMnemonic" component={ImportWalletMnemonic} />
                <Stack.Screen name="ImportWallet" component={ImportWallet} />
                <Stack.Screen name="Networks" component={Networks} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="SendToken" component={SendToken} />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </DoodleProvider>
      </ThemeProvider>
    </AuthProvider>
    </AlertNotificationRoot>
  );
}

export default App;