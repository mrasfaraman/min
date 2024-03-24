import React, {useContext} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import Header from '../components/header';
import SwapCurrencyIcon from '../assets/images/swap_currency_icon.png';
import SwapCurrencyBtc from '../assets/images/swap_btc.png';
import SwapDrop from '../assets/images/swap_drop.png';
import SwapingIcon from '../assets/images/swaping_icon.png';
import SwapingIconDark from '../assets/images/swaping_icon_dark.png';
import ChooseChannel from '../components/ChooseChannel';
import {ThemeContext} from '../context/ThemeContext';

const Bridging = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  const SwapCard = () => {
    return (
      <View
        style={[styles.swapCardWrapper, {backgroundColor: theme.menuItemBG}]}>
        <View style={styles.swapHeaderFlex}>
          <View style={styles.dropDownFlex}>
            <Text style={[styles.swapHeaderText, {color: theme.text}]}>
              Blockchain
            </Text>
            <View style={styles.swapLeftSubFlex}>
              <View style={styles.currencyIconWrapper}>
                <Image source={SwapCurrencyIcon} style={styles.swapIconImage} />
              </View>
              <Text style={[styles.swapCurrencyName, {color: theme.text}]}>
                KDA
              </Text>
              <View>
                <Image source={SwapDrop} />
              </View>
            </View>
          </View>
          {/*  */}
          <View style={styles.dropDownFlex}>
            <Text style={[styles.swapHeaderText, {color: theme.text}]}>
              Token
            </Text>
            <View style={styles.swapLeftSubFlex}>
              <View style={styles.currencyIconWrapper}>
                <Image source={SwapCurrencyBtc} style={styles.swapIconImage} />
              </View>
              <Text style={[styles.swapCurrencyName, {color: theme.text}]}>
                BTC
              </Text>
              <View>
                <Image source={SwapDrop} />
              </View>
            </View>
          </View>
        </View>
        {/*  */}
        <View style={styles.amountWrapper}>
          <Text style={[styles.ammountText, {color: theme.text}]}>Amount</Text>
          <View style={styles.amountInpWrapperFlex}>
            <TextInput
              style={[
                styles.inputWrapper,
                {backgroundColor: theme.rightArrowBG, color: theme.text},
              ]}
              placeholder="0.000"
              placeholderTextColor={theme.text}
            />
            <TouchableOpacity style={[styles.swapMaxBtnWrapper, {borderColor: theme.buttonBorder}]}>
              <Text style={[styles.swapMaxBtnText, {color: theme.text}]}>max</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.balanceWrapperFlex}>
          <Text style={[styles.swapBalanceLabel, {color: theme.text}]}>balance</Text>
          <Text style={[styles.swapBalance, {color: theme.emphasis}]}>1.50129603 KDA</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
      <Header title={'Bridging'} onBack={() => navigation.goBack()} />
      <View style={styles.swapWrapper}>
        <SwapCard />
        <View style={styles.swapBtnFlexWrapper}>
          <TouchableOpacity style={[styles.swapBtn, {backgroundColor: theme.rightArrowBG}]}>
            <Image source={theme.type == 'dark' ? SwapingIcon : SwapingIconDark} />
          </TouchableOpacity>
        </View>
      </View>
      <SwapCard />
      <View style={styles.gasFeeFlex}>
        <Text style={[styles.gasFeeLabel, {color: theme.text}]}>gas FEE</Text>
        <Text style={[styles.gasFee, {color: theme.emphasis}]}>gas FEE</Text>
      </View>
      <ChooseChannel />
      <View style={styles.tokenImportBtnWrapper}>
        <TouchableOpacity style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]}>
          <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Bridging;

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
  swapHeaderFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  swapHeaderText: {
    // color: "#FFF",
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  swapLeftSubFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currencyIconWrapper: {
    width: 18,
    height: 18,
  },
  swapIconImage: {
    width: '100%',
    height: '100%',
  },
  swapCurrencyName: {
    // color: "#FFF",
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  amountWrapper: {
    marginTop: 16,
  },
  ammountText: {
    // color: "#FFF",
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  amountInpWrapperFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
  },
  inputWrapper: {
    padding: 8,
    // backgroundColor: "#4E3B51",
    borderRadius: 8,
    // color: "white",
    flex: 1,
  },
  swapMaxBtnWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 1,
    // borderColor: '#FF003C',
  },
  swapMaxBtnText: {
    // color: '#FFF',
    fontSize: 11.859,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  balanceWrapperFlex: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swapBalanceLabel: {
    // color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  swapBalance: {
    // color: '#F43459',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  swapBtnFlexWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: -15,
    zIndex: 99,
  },
  swapBtn: {
    width: 48,
    height: 48,
    borderRadius: 100,
    // backgroundColor: '#4E3B51',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //
  gasFeeFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  gasFeeLabel: {
    // color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  gasFee: {
    // color: '#F43459',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  //
  tokenImportBtnWrapper: {
    marginBottom: 35,
  },
  tokenImportButton: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    // borderColor: '#FF003C',
    borderWidth: 1,
    borderRadius: 100,
  },
  tokenImportButtonText: {
    // color: '#FFF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  //
});
