import CheckBox from '@react-native-community/checkbox';
import React, {useState, useContext , useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import eye from '../assets/images/eye-slash.png';
import eyeDark from '../assets/images/eye-slash-dark.png';
import lock from '../assets/images/lock.png';
import lockDark from '../assets/images/lock-dark.png';
import SubmitBtn from '../components/SubmitBtn';
import Header from '../components/header';
import {ThemeContext} from '../context/ThemeContext';
import {useAuth} from '../context/AuthContext';
import { authenticateFingerprint } from '../utils/BiometricUtils';
export default function LoginScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const {theme} = useContext(ThemeContext);
  const {password, savePassword} = useAuth();

  function handleSubmit() {
    if (password !== passwordInput) {
      return setError('Password does not match!');
    }
    return navigation.navigate('MainPage');
  }

  async function handleSubmitfingerprint() {
    let fingerprint = await authenticateFingerprint()
    console.log(fingerprint)
    if (fingerprint) {
      navigation.navigate('MainPage')
    }

  }


 
  useEffect(()=>{
   
    // if(fingerprint){
    //   navigation.navigate('MainPage');
    // }
    if(password == null || password == undefined || password == ''){
      return navigation.navigate('Home');      
    }
    handleSubmitfingerprint()
  },[password])

  return (
    <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
      <View style={[styles.content, styles.textContainer, {marginTop: '50%'}]}>
        <Text style={[styles.textStyle, {color: theme.text}]}>Sign in</Text>
        <Text
          style={[styles.textStyle, styles.instruction, {color: theme.text}]}>
          Sign in to continue
        </Text>
      </View>
      <View style={[styles.input, {backgroundColor: theme.textInputBG}]}>
        <View style={styles.inputLock}>
          <Image source={theme.type == 'dark' ? lock : lockDark} />
          <TextInput
            style={{color: theme.text}}
            placeholder="password"
            placeholderTextColor={theme.text}
            onChangeText={newText => setPasswordInput(newText)}
            defaultValue={passwordInput}
            secureTextEntry={showPassword}
          />
        </View>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image source={theme.type == 'dark' ? eye : eyeDark} />
        </TouchableOpacity>
      </View>
      <View>
        {error && (
          <Text style={[{color: theme.emphasis, textAlign: 'center'}]}>
            ! {error}
          </Text>
        )}
      </View>
      <SubmitBtn
        title="Login"
        // onPress={() => navigation.navigate('ResetPasswordScreen')}
        onPress={() => handleSubmit()}
      />
          {/* <SubmitBtn
        title="Biomatric"
        // onPress={() => navigation.navigate('ResetPasswordScreen')}
        onPress={() => handleSubmitfingerprint()}
      /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // screen: {
  //   backgroundColor: '#280D2C',
  // },

  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 70,
    gap: 32,
  },
  textContainer: {
    gap: 0,
    marginBottom: 30,
    textAlign: 'center',
  },
  textStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop: 15,
  },
  instruction: {
    // marginTop: 0,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 12,
  },
  input: {
    flexDirection: 'row',
    // backgroundColor: '#351739',
    alignItems: 'center',
    padding: 14,
    paddingVertical: 5,
    justifyContent: 'space-between',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  inputLock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '80%',
  },
  placeHolderColor: {
    color: 'white',
  },
  checkInput: {
    // backgroundColor: '#280D2C',
    marginHorizontal: 0,
    justifyContent: 'flex-start',
  },
  checkText: {
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 10,
  },
  emphasis: {
    // color: '#F43459',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
