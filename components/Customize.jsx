import React, {useContext, useEffect} from 'react';
import {
  Button,
  Actionsheet,
  useDisclose,
  Text,
  Box,
  Center,
  NativeBaseProvider,
  theme,
} from 'native-base';
import CreditCard from './MainPage/CreditCard';
import {
  FlatList,
  Image,
  ScrollView,
    StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import doodlePattern1 from '../assets/images/doodle/doodle-pattern1.png';
import doodlePattern2 from '../assets/images/doodle/doodle-pattern2.png';
import doodlePattern3 from '../assets/images/doodle/doodle-pattern3.png';
import doodlePattern4 from '../assets/images/doodle/doodle-pattern4.png';
import doodlePattern5 from '../assets/images/doodle/doodle-pattern5.png';
import doodlePattern6 from '../assets/images/doodle/doodle6.png';
import doodlePattern7 from '../assets/images/doodle/doodle7.png';
import doodlePattern8 from '../assets/images/doodle/doodle8.png';
import doodlePattern9 from '../assets/images/doodle/doodle9.png';
import doodlePattern10 from '../assets/images/doodle/doodle10.png';
import doodlePattern11 from '../assets/images/doodle/doodle11.png';
import doodlePattern12 from '../assets/images/doodle/doodle12.png';
import doodlePattern13 from '../assets/images/doodle/doodle13.png';
import doodlePattern14 from '../assets/images/doodle/doodle14.png';
import doodlePattern15 from '../assets/images/doodle/doodle15.png';
import doodlePattern16 from '../assets/images/doodle/doodle16.png';
import doodlePattern17 from '../assets/images/doodle/doodle17.png';
import {ThemeContext} from '../context/ThemeContext';
import { DoodleContext } from '../context/DoodleContext';



import {useTranslation} from 'react-i18next';
import i18n from '../pages/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Customize({getOpenCustomizer, customizerOpen, navigation}) {
  const {theme} = useContext(ThemeContext);
  const {doodle, doodleBG, switchDoodle, switchDoodleBG} = useContext(DoodleContext);

  const {isOpen, onOpen, onClose} = useDisclose();
  
 const {t} = useTranslation();
 useEffect(() => {
   const loadSelectedLanguage = async () => {
     try {
       const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
       if (selectedLanguage) {
         i18n.changeLanguage(selectedLanguage); 
       }
     } catch (error) {
       console.error('Error loading selected language:', error);
     }
   };
   loadSelectedLanguage();
 }, []);
  return (
    <>
      {/* <Button onPress={onOpen} shadow={2}>
            Actionsheet Rao
        </Button> */}
      <Actionsheet
        isOpen={customizerOpen}
        onClose={() => getOpenCustomizer(false)}>
        <Actionsheet.Content style={{backgroundColor: theme.customizeBG}}>
          <Box w="100%" h={600} px={4} justifyContent="center">
            <CreditCard isOpen={customizerOpen} navigation={navigation} />
            <View style={styles.colorWrapper}>
              <Text style={[styles.colorText, {color: theme.text}]}>
              {t('select_color')}:
              </Text>
              <View style={styles.colorFlex}>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG1')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#104A5C'},
                      doodleBG == '#104A5C' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG2')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#584C0D'},
                      doodleBG == '#584C0D' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG3')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#681A1A'},
                      doodleBG == '#681A1A' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG4')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#251A53'},
                      doodleBG == '#251A53' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG5')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#125732'},
                      doodleBG == '#125732' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG6')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#6b2737'},
                      doodleBG == '#6b2737' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG7')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#A65B3E'},
                      doodleBG == '#A65B3E' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG8')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#7B9DB7'},
                      doodleBG == '#7B9DB7' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG9')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#53FF45'},
                      doodleBG == '#53FF45' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG10')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#264653'},
                      doodleBG == '#264653' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG11')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#ff006e'},
                      doodleBG == '#ff006e' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodleBG('doodleBG12')}>
                  <View
                    style={[
                      styles.colorCircle,
                      {backgroundColor: '#8338ec'},
                      doodleBG == '#8338ec' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></View>
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.colorWrapper}>
              <Text style={[styles.colorText, {color: theme.text}]}>
              {t('select_pattern')}:
              </Text>
              <View style={styles.colorFlex}>
                <TouchableOpacity onPress={()=> switchDoodle('doodle1')}>
                  <ImageBackground
                    source={doodlePattern1}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '105' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodle('doodle2')}>
                  <ImageBackground
                    source={doodlePattern2}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG}, 
                      doodle == '106' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodle('doodle3')}>
                  <ImageBackground
                    source={doodlePattern3}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '107' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodle('doodle4')}>
                  <ImageBackground
                    source={doodlePattern4}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '108' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> switchDoodle('doodle5')}>
                  <ImageBackground
                    source={doodlePattern5}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '109' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle6')}>
                  <ImageBackground
                    source={doodlePattern6}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle7')}>
                  <ImageBackground
                    source={doodlePattern7}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle8')}>
                  <ImageBackground
                    source={doodlePattern8}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle9')}>
                  <ImageBackground
                    source={doodlePattern9}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle10')}>
                  <ImageBackground
                    source={doodlePattern10}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle11')}>
                  <ImageBackground
                    source={doodlePattern11}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle12')}>
                  <ImageBackground
                    source={doodlePattern12}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle13')}>
                  <ImageBackground
                    source={doodlePattern13}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle14')}>
                  <ImageBackground
                    source={doodlePattern14}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle15')}>
                  <ImageBackground
                    source={doodlePattern15}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle16')}>
                  <ImageBackground
                    source={doodlePattern16}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> switchDoodle('doodle17')}>
                  <ImageBackground
                    source={doodlePattern17}
                    resizeMode="cover"
                    style={[
                      styles.colorCircle,
                      {backgroundColor: doodleBG},
                      doodle == '110' && {borderWidth: 1, borderColor: theme.emphasis}
                    ]}></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default Customize;

const styles = StyleSheet.create({
  colorWrapper: {
    marginVertical: 15,
  },
  colorText: {
    // color: '#FFF',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  colorFlex: {
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    marginVertical: 4,
    marginHorizontal:6,
    overflow: 'hidden',
  },
});
