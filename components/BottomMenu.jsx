import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomHome from '../assets/images/bottom-home.png';
import BottomClock from '../assets/images/bottom-clock.png';
import BottomCenter from '../assets/images/bottom-center.png';
import BottomProfile from '../assets/images/bottom-profile.png';
import BottomWorld from '../assets/images/bottom-world.png';
import BottomHomeDark from '../assets/images/bottom-home-dark.png';
import BottomClockDark from '../assets/images/bottom-clock-dark.png';
import BottomCenterDark from '../assets/images/bottom-center-dark.png';
import BottomProfileDark from '../assets/images/bottom-profile-dark.png';
import BottomWorldDark from '../assets/images/bottom-world-dark.png';
import { ThemeContext } from '../context/ThemeContext';

const BottomMenu = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const currentScreenName =
    navigation.getState().routes[navigation.getState().index].name;
  console.log('My Screen Name ==> ', currentScreenName);
  return (
    <View style={styles.menuUpperWrapper}>
      <View style={[styles.menuContainer, { backgroundColor: theme.menuItemBG }]}>
        <TouchableOpacity
          style={[
            styles.bottomTabWrapper,
            {
              backgroundColor: `${currentScreenName == 'MainPage' ? theme.emphasis : ''
                }`,
            },
          ]}
          onPress={() => navigation.navigate('MainPage')}>
          <Image
            style={styles.bottomTabImg}
            source={theme.type == 'dark' ? BottomHome : BottomHomeDark}
            alt="icon"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTabWrapper,
            {
              backgroundColor: `${currentScreenName == 'TransactionRecordScreen'
                ? theme.emphasis
                : ''
                }`,
            },
          ]}
          onPress={() => navigation.navigate('TransactionRecordScreen')}>
          <Image
            style={styles.bottomTabImg}
            source={theme.type == 'dark' ? BottomClock : BottomClockDark}
            alt="icon"
          />
        </TouchableOpacity>
        <TouchableOpacity style={[
          styles.bottomTabWrapper,
          {
            backgroundColor: `${currentScreenName == 'Browser'
              ? theme.emphasis
              : ''
              }`,
          },
        ]}
          onPress={() => navigation.navigate('Browser')}>
          <Image
            style={styles.bottomTabImg}
            source={theme.type == 'dark' ? BottomCenter : BottomCenterDark}
            alt="icon"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomTabWrapper]}
          onPress={() => navigation.navigate('SettingsScreen')}>
          <Image
            style={styles.bottomTabImg}
            source={theme.type == 'dark' ? BottomProfile : BottomProfileDark}
            alt="icon"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTabWrapper,
            {
              backgroundColor: `${currentScreenName == 'PanCakeList' ? theme.emphasis : ''
                }`,
            },
          ]}
          onPress={() => navigation.navigate('PanCakeList')}>
          <Image
            style={styles.bottomTabImg}
            source={theme.type == 'dark' ? BottomWorld : BottomWorldDark}
            alt="icon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  menuUpperWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#362538',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 60,
    paddingHorizontal: 10,
  },
  bottomTabWrapper: {
    width: 40,
    height: 40,
    padding: 8,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabImg: {
    width: '100%',
    height: '100%',
  },
});
