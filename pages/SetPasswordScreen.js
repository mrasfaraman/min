import CheckBox from '@react-native-community/checkbox';
import React, {useState, useContext} from 'react';
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
import { enrollFingerprint } from '../utils/BiometricUtils';
export default function SetPasswordScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [error, setError] = useState('');

  const {theme} = useContext(ThemeContext);
  const {password, savePassword} = useAuth();

  async function handleSubmit() {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

    if (passwordInput == '') {
      return setError('Password cannot be empty!');
    } 

    if (!toggleCheckBox) {
      return setError(
        'You need to agree to Terms & Conditions inorder to proceed.',
        );
    } 

    if(!strongPasswordRegex.test(passwordInput)){
      return setError("Password does not meet the requirements. \n\n" +
      "Your password must be at least 8 characters long and include:\n" +
      "- At least one uppercase letter (A-Z)\n" +
      "- At least one lowercase letter (a-z)\n" +
      "- At least one digit (0-9)\n" +
      "- At least one special character (@, $, !, %, *, ?, & etc.)");
    }

    if ( !passwordInput || passwordInput !== confirmPasswordInput ){
        return setError('Password does not match!');
    }
    
      
      await enrollFingerprint()
      savePassword(passwordInput);
    // return navigation.navigate('BiometricEnrollmentScreen');
    // return navigation.navigate('MainPage');
  }

  return (
    <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
      <Header
        title="Set Password"
        // skipOption={true}
        // onSkip={() => {
        //   navigation.navigate('Home');
        // }}
        onBack={() => navigation.goBack()}
      />
      <View style={[styles.content, styles.textContainer]}>
        <Text style={[styles.textStyle, {color: theme.text}]}>
          Create Strong Password
        </Text>
        <Text
          style={[styles.textStyle, styles.instruction, {color: theme.text}]}>
        Minimum 8 Characters
        </Text>
      </View>
      <View style={[styles.input, {backgroundColor: theme.textInputBG}]}>
        <View style={styles.inputLock}>
          <Image source={theme.type == 'dark' ? lock : lockDark} />
          <TextInput
            style={{color: theme.text}}
            placeholder="Set password (8 characters)"
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
      <View style={[styles.input, {backgroundColor: theme.textInputBG}]}>
        <View style={styles.inputLock}>
          <Image source={theme.type == 'dark' ? lock : lockDark} />
          <TextInput
            style={{color: theme.text}}
            placeholder="Confirm password"
            placeholderTextColor={theme.text}
            onChangeText={newText => setConfirmPasswordInput(newText)}
            defaultValue={confirmPasswordInput}
            secureTextEntry={showConfirmPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
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
      <View
        style={[
          styles.input,
          styles.checkInput,
          // {backgroundColor: theme.textInputBG}
        ]}>
        <CheckBox
          tintColors={{true: theme.emphasis, false: theme.emphasis}}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text style={[styles.checkText, {color: theme.text}]}>
          I agree to{' '}
          <Text style={[styles.emphasis, {color: theme.emphasis}]}>
            Terms and Conditions
          </Text>
        </Text>
      </View>
      <SubmitBtn
        title="Create Password"
        // onPress={() => navigation.navigate('ResetPasswordScreen')}
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
