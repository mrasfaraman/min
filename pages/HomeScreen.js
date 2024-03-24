import React, {useContext} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import bg from '../assets/images/bg.png';
// import SomeComponent from '../components/temp';
import {ThemeContext} from '../context/ThemeContext';
import {useAuth} from '../context/AuthContext';

export default function HomeScreen({navigation}) {
  const {theme} = useContext(ThemeContext);
  const {password} = useAuth();

  if (password) {
    navigation.navigate('LoginScreen');
  }

  return (
    <ScrollView
      style={[styles.screen, {backgroundColor: theme.screenBackgroud}]}>
      <View style={styles.bgImg}>
        <Image source={bg} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.textStyle, {color: theme.text}]}>
          The only crypto wallet you’d ever need
        </Text>
        {/* <SomeComponent /> */}
        <TouchableOpacity
          style={[styles.buttonStyle, {borderColor: theme.buttonBorder}]}
          onPress={() => navigation.navigate('CreateWalletScreen')}>
          <Text style={[styles.btnText, {color: theme.text}]}>Get Started</Text>
        </TouchableOpacity>
        <Text style={[styles.textStyle, styles.terms, {color: theme.text}]}>
          By tapping “Get started” you agree and consent to our{' '}
          <Text style={[styles.emphasis, {color: theme.emphasis}]}>
            Terms & Service
          </Text>{' '}
          and{' '}
          <Text style={[styles.emphasis, {color: theme.emphasis}]}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // justifyContent: 'space-between',
    // alignContent: 'space-between',
  },
  emphasis: {
    // color: '#F43459',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bgImg: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  textStyle: {
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  content: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 70,
    gap: 32,
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
  btnText: {
    textAlign: 'center',
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
  },
});
