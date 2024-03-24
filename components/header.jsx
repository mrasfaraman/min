import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import arrowLeft from '../assets/images/arrow-left.png';
import arrrowLeftDark from '../assets/images/arrow-left-dark.png'
import bg_lines from '../assets/images/bg_lines.png';
import bg_lines2 from '../assets/images/bg_lines2.png';
import bg_lines3 from '../assets/images/bg_lines3.png';
import bg_lines4 from '../assets/images/bg_lines4.png';
import bg_lines6 from '../assets/images/bg_lines6.png';
import bg_lines8 from '../assets/images/bg_lines8.png';
import {ThemeContext} from '../context/ThemeContext';


function get_Image(ThemeName) {
  switch(ThemeName){
    case 'theme1': return bg_lines
    case 'theme2': return bg_lines2
    case 'theme3': return bg_lines3
    case 'theme4': return bg_lines4
    case 'theme5': return ''
    case 'theme6': return bg_lines6
    case 'theme7': return ''
    case 'theme8': return bg_lines8
    default: return bg_lines
  }
}


export default function Header({title, skipOption, onSkip, onBack}) {
  const {theme} = useContext(ThemeContext);
  return (
    <View>
      <ImageBackground
        style={styles.imgBackground}
        source={get_Image(theme.name)}
        resizeMode="cover">
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Image source={theme.type == 'dark' ? arrowLeft : arrrowLeftDark} />
          </TouchableOpacity>
          <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
          <TouchableOpacity onPress={onSkip}>
            <Text style={[styles.skip, {color: theme.emphasis}]}>
              {skipOption ? 'Skip' : ''}
            </Text>
          </TouchableOpacity>
          {/* <Image source={bg_lines} /> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    // width: '100%',
    height: 120,
    justifyContent: 'center',
    flex: 1,
  },
  skip: {
    // color: '#F43459',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    // marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    // marginBottom: 70,
  },
  title: {
    // color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  bgImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 80,
  },
});
