import React, {useContext} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  Button,
  Actionsheet,
  useDisclose,
  Text,
  Box,
  Center,
  NativeBaseProvider,
} from 'native-base';
import logo from '../assets/images/usdt.png';
import {ThemeContext} from '../context/ThemeContext';

function TransactionDeail({OpenDetail, detailOpen}) {
  const {theme} = useContext(ThemeContext);
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <>
      {/* <Button onPress={onOpen} shadow={2}>
            Actionsheet
        </Button> */}
      <Actionsheet isOpen={detailOpen} onClose={() => OpenDetail(false)}>
        <Actionsheet.Content style={{backgroundColor: theme.customizeBG}}>
          <Box w="100%" h={320} px={4} justifyContent="center">
            <Text style={{fontSize: 14, color: 'white', textAlign: 'center'}}>
              Transaction Detail
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <View style={styles.left}>
                <Image source={logo} />
                <View>
                  <Text style={[styles.token, {color: theme.text}]}>BTC</Text>
                  <Text style={[styles.name, {color: theme.text}]}>
                    Bitcoin
                  </Text>
                </View>
              </View>
              {/*  */}
              <View>
                <View style={[styles.right, {color: theme.text}]}>
                  <Text
                    style={[
                      styles.amount,
                      {color: theme.text},
                      styles.amountRed,
                      {color: theme.amountRed},
                    ]}>
                    -$2,599
                  </Text>
                  <Text style={[styles.amount, {color: theme.text}]}>
                    {' '}
                    USDT
                  </Text>
                </View>
                <Text style={[styles.BTCamount, {color: theme.text}]}>
                  0.000000986 BTC
                </Text>
              </View>
              {/*  */}
            </View>
            <View style={styles.line}>
              <View style={styles.statusContainer}>
                <Text style={{color: theme.text}}>Status:</Text>
                <View
                  style={[
                    styles.statusRed,
                    {backgroundColor: theme.statusRed},
                  ]}>
                  <Text
                    style={[
                      styles.statusTextRed,
                      {color: theme.statusTextRed},
                    ]}>
                    Completed
                  </Text>
                </View>
              </View>
              <View style={styles.dateContainer}>
                <Text style={{color: theme.text}}>Date:</Text>
                <Text style={{color: theme.text}}> 18/08/2023</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: theme.wordBorder,
                borderBottomWidth: 2,
                marginVertical: 10,
              }}></View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <Text style={styles.senderLabel}>Sent address:</Text>
              <Text style={[styles.senderAddress, {color: theme.text}]}>
                jk2L8I5jf95NH94hJk49N02hBQl5
              </Text>
            </View>
            <View style={styles.feeMainFlex}>
              <View style={styles.feeSubFlex}>
                <Text style={styles.senderLabel}>Fee:</Text>
                <Text style={[styles.senderAddress, {color: theme.text}]}>
                  -$5.04
                </Text>
              </View>
              <View style={styles.feeSubFlex}>
                <Text style={styles.senderLabel}>Fee:</Text>
                <Text style={[styles.senderAddress, {color: theme.text}]}>
                  -$5.04
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <Text style={styles.senderLabel}>TRIX Id:</Text>
              <Text style={[styles.senderAddress, {color: theme.text}]}>
                hk49N02hBQl519Ans5Ijk2L8I5jf95NH94
              </Text>
            </View>
            <View style={styles.btnWrapperFlex}>
              <TouchableOpacity
                style={[styles.btnWrpper, {backgroundColor: theme.emphasis}]}>
                <Text style={styles.btnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnWrpperNext,
                  {
                    borderColor: theme.emphasis,
                    backgroundColor: theme.emphasis,
                  },
                ]}>
                <Text style={styles.btnText}>
                  View on explorer
                </Text>
              </TouchableOpacity>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default TransactionDeail;

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
  },
  token: {
    // color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  name: {
    // color: '#FFF',
    fontFamily: 'Inter',
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
  BTCamount: {
    // color: '#FFF',
    fontFamily: 'Inter',
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
  statusRed: {
    borderRadius: 4,
    // backgroundColor: '#26161B',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 4,
  },
  statusTextRed: {
    // color: '#FC3044',
    fontFamily: 'SF Pro Text',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 8,
  },
  senderLabel: {
    // color: '#937F96',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  senderAddress: {
    // color: '#FFF',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  feeMainFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  feeSubFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnWrapperFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginVertical: 15,
  },
  btnWrpper: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    // borderColor: '#F43459',
    flex: 1,
  },
  btnWrpperNext: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    // borderColor: '#F43459',
    flex: 1,
    // backgroundColor: '#F43459',
  },
  btnText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 600,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
