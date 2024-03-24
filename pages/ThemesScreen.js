import React, {useState, useContext} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/header';
import {ThemeContext} from '../context/ThemeContext';

export default function ThemesScreen({navigation}) {
  const [selected, setSelected] = useState('');
  const {theme, switchTheme} = useContext(ThemeContext);
  return (
    <ScrollView style={{backgroundColor: theme.screenBackgroud}}>
      <Header
        title={'Themes'}
        skipOption={false}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.themesRow}>
          <TouchableOpacity
            onPress={() => {
              setSelected('1');
              switchTheme('theme1');
            }}
            style={
              selected === '1'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[{backgroundColor: theme.menuItemBG}, styles.theme]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_1.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('2');
              switchTheme('theme2');
            }}
            style={
              selected === '2'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[{backgroundColor: theme.menuItemBG}, styles.theme]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_2.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.themesRow}>
          <TouchableOpacity
            onPress={() => {
              setSelected('3');
              switchTheme('theme3');
            }}
            style={
              selected === '3'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[styles.theme, {backgroundColor: theme.menuItemBG}]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_3.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('4');
              switchTheme('theme4');
            }}
            style={
              selected === '4'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[styles.theme, {backgroundColor: theme.menuItemBG}]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_4.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.themesRow}>
          <TouchableOpacity
            onPress={() => {
              setSelected('5');
              switchTheme('theme5');
            }}
            style={
              selected === '5'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[styles.theme, {backgroundColor: theme.menuItemBG}]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_5.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('6');
              switchTheme('theme6');
            }}
            style={
              selected === '6'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[styles.theme, {backgroundColor: theme.menuItemBG}]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_6.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.themesRow}>
          <TouchableOpacity
            onPress={() => {
              setSelected('7');
              switchTheme('theme7');
            }}
            style={
              selected === '7'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[styles.theme, {backgroundColor: theme.menuItemBG}]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_7.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('8');
              switchTheme('theme8');
            }}
            style={
              selected === '8'
                ? [{borderColor: theme.emphasis}, styles.selected]
                : ''
            }>
            <View style={[styles.theme, {backgroundColor: theme.menuItemBG}]}>
              <Image
                style={styles.imageStyle}
                resizeMode="cover"
                source={require('../assets/images/theme_8.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // screen: {
  //   backgroundColor: '#280D2C',
  // },
  container: {
    marginVertical: 24,
    marginHorizontal: 16,
    gap: 24,
  },
  themesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  theme: {
    padding: 8,
    alignItems: 'flex-start',
    // gap: 2,
    height: 286,
    width: 145,
    // borderRadius: 8,
    // backgroundColor: '#362538',
    borderRadius: 12,
    borderWidth: 1,
    // marginBottom: 24,
  },
  imageStyle: {
    width: undefined,
    height: '100%',
    aspectRatio: 0.5,
    alignSelf: 'center',
  },
  selected: {
    // borderColor: '#F43459',
    borderWidth: 1,
    borderRadius: 12,
  },
});
