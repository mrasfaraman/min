import React, {useContext, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import eye from '../assets/images/eye-slash.png';
import eyeDark from '../assets/images/eye-slash-dark.png';
import lock from '../assets/images/lock.png';
import lockDark from '../assets/images/lock-dark.png';
import SubmitBtn from '../components/SubmitBtn';
import Header from '../components/header';
import {ThemeContext} from '../context/ThemeContext';
import {useAuth} from '../context/AuthContext';

export default function ResetPasswordScreen({navigation}) {
  const {theme} = useContext(ThemeContext);
  const {password, savePassword} = useAuth();

  const [showPreviousPassword, setShowPreviousPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [previousPasswordInput, setPreviousPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (password !== previousPasswordInput) {
      setError('Wrong current password');
    }

    if (passwordInput == '' || passwordInput !== confirmPasswordInput) {
      if (passwordInput == '') {
        setError('Password cannot be empty!');
      } else {
        setError('Password does not match!');
      }
    }

    savePassword(passwordInput);
    navigation.navigate('MainPage');
  }

  return (
    <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
      <Header
        title="Reset Password"
        // skipOption={true}
        // onSkip={() => {
        //   navigation.navigate('Home');
        // }}
        onBack={() => navigation.goBack()}
      />
      <View style={[styles.content, styles.textContainer]}>
        <Text style={[styles.textStyle, {color: theme.text}]}>
          Reset Password
        </Text>
        <Text
          style={[styles.textStyle, styles.instruction, {color: theme.text}]}>
         Set Your New Password
        </Text>
      </View>
      <View style={[styles.input, {backgroundColor: theme.textInputBG}]}>
        <View style={styles.inputLock}>
          <Image source={theme.type == 'dark' ? lock : lockDark} />
          <TextInput
            style={styles.placeHolderText}
            placeholder="Current Password"
            placeholderTextColor={theme.placeholderTextColor}
            onChangeText={newText => setPreviousPasswordInput(newText)}
            defaultValue={previousPasswordInput}
            secureTextEntry={showPreviousPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowPreviousPassword(!showPreviousPassword)}>
          <Image source={theme.type == 'dark' ? eye : eyeDark} />
        </TouchableOpacity>
      </View>
      <View style={[styles.input, {backgroundColor: theme.textInputBG}]}>
        <View style={styles.inputLock}>
          <Image source={theme.type == 'dark' ? lock : lockDark} />
          <TextInput
            style={styles.placeHolderText}
            placeholder="Set password (8 characters)"
            placeholderTextColor={theme.placeholderTextColor}
            onChangeText={newText => setPasswordInput(newText)}
            defaultValue={passwordInput}
            secureTextEntry={showPassword}
          />
        </View>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image source={theme.type == 'dark' ? eye : eyeDark} />
        </TouchableOpacity>
      </View>
      <View style={[styles.input, {backgroundColor: theme.textInputBG , justifyContent:'space-between'}]}>
        <View style={styles.inputLock}>
          <Image source={theme.type == 'dark' ? lock : lockDark} />
          <TextInput
            style={[styles.placeHolderText ,{width:'100%'}]}
            placeholder="Confirm password"
            placeholderTextColor={theme.placeholderTextColor}
            onChangeText={newText => setConfirmPasswordInput(newText)}
            defaultValue={confirmPasswordInput}
            secureTextEntry={showConfirmPassword}
          />
        </View>
        
        <TouchableOpacity
        style={{alignItems:'right' , justifyContent:'flex-end', paddingLeft:40}} 
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Image source={theme.type == 'dark' ? eye : eyeDark} />
        </TouchableOpacity>
        <View>
          {error && (
            <Text style={[{color: theme.emphasis, textAlign: 'center'}]}>
              ! {error}
            </Text>
          )}
        </View>
      </View>

      <SubmitBtn
        title="Reset Password"
        // onPress={() => navigation.navigate('Verification')}
        onPress={() => handleSubmit()}
      />
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
});
