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
import Finger from '../assets/images/finger.png';
import Facial from '../assets/images/facial.png';
import faceID from '../assets/images/face_id.png';
import faceIdDark from '../assets/images/face_id_dark.png';
import Print from '../assets/images/print.png';
import PrintDark from '../assets/images/print-dark.png';
import Header from '../components/header';
import BottomMenu from '../components/BottomMenu';
import AddButton from '../components/AddButton';
import {ThemeContext} from '../context/ThemeContext';

const Verification = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <ScrollView
      style={[styles.MainWrapper, {backgroundColor: theme.screenBackgroud}]}>
      <Header title="Enable Biometric" onBack={() => navigation.goBack()} />
      <View style={styles.textWrapper}>
        <Text style={[styles.upperHeading, {color: theme.text}]}>
          Enable biometric verification
        </Text>
        <Text style={[styles.lowerHeading, {color: theme.text}]}>
          Some dummy text here
        </Text>
      </View>
      <View style={styles.methodFlex}>
        <View style={styles.subMethod}>
          <View
            style={[
              styles.methodOverLine,
              {borderColor: theme.verificationMethodBorder},
            ]}>
            <Image source={Facial} />
          </View>
          <Text style={[styles.optionText, {color: theme.text}]}>
            facial recognition
          </Text>
          <View style={styles.lowerImage}>
            <Image source={theme.type == 'dark' ? faceID : faceIdDark} />
          </View>
        </View>
        <View style={styles.subMethod}>
          <View
            style={[
              [
                styles.methodOverLine,
                {borderColor: theme.verificationMethodBorder},
              ],
              {borderColor: theme.emphasis},
            ]}>
            <Image source={Finger} />
          </View>
          <Text style={[styles.optionText, {color: theme.text}]}>
            Fingerprint
          </Text>
          <View style={styles.lowerImage}>
            <Image source={theme.type == 'dark' ? Print : PrintDark} />
          </View>
        </View>
      </View>
      <View style={styles.tokenImportBtnWrapper}>
        <TouchableOpacity
          style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]}
          onPress={() => navigation.navigate('MainPage')}>
          <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  MainWrapper: {
    // backgroundColor: '#280D2C',
    padding: 10,
  },
  textWrapper: {
    marginVertical: 30,
  },
  upperHeading: {
    textAlign: 'center',
    // color: "#FFF",
    fontSize: 24,
    fontWeight: '400',
  },
  lowerHeading: {
    textAlign: 'center',
    // color: "#FFF",
    fontSize: 14,
    fontWeight: '400',
  },
  methodFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subMethod: {
    width: '49%',
  },
  methodOverLine: {
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: '#432947',
    height: 257,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMethod: {
    // backgroundColor: "rgba(244, 52, 89, 0.08)"
  },
  optionText: {
    // color: "#FFF",
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    textTransform: 'capitalize',
  },
  lowerImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenImportBtnWrapper: {
    marginTop: 25,
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
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
