import React, {useContext} from 'react';
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
import {ThemeContext} from '../context/ThemeContext';
import { DoodleContext } from '../context/DoodleContext';

function Customize({getOpenCustomizer, customizerOpen, navigation}) {
  const {theme} = useContext(ThemeContext);
  const {doodle, doodleBG, switchDoodle, switchDoodleBG} = useContext(DoodleContext);

  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <>
      {/* <Button onPress={onOpen} shadow={2}>
            Actionsheet Rao
        </Button> */}
      <Actionsheet
        isOpen={customizerOpen}
        onClose={() => getOpenCustomizer(false)}>
        <Actionsheet.Content style={{backgroundColor: theme.customizeBG}}>
          <Box w="100%" h={450} px={4} justifyContent="center">
            <CreditCard isOpen={customizerOpen} navigation={navigation} />
            <View style={styles.colorWrapper}>
              <Text style={[styles.colorText, {color: theme.text}]}>
                Select color:
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
              </View>
            </View>
            <View style={styles.colorWrapper}>
              <Text style={[styles.colorText, {color: theme.text}]}>
                Select pattern:
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
    alignItems: 'center',
    gap: 6,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    marginVertical: 6,
    overflow: 'hidden',
  },
});
