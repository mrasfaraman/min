import React, { useContext } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import UserImage from '../../assets/images/user-image.png';
import HeaderQr from '../../assets/images/header_qr.png';
import HeaderQrDark from '../../assets/images/header_qr_dark.png';
import HeaderBell from '../../assets/images/header_bell.png';
import HeaderBellDark from '../../assets/images/header_bell_dark.png';
import HeaderCopy from '../../assets/images/header_copy.png';
import HeaderCopyDark from '../../assets/images/header_copy_dark.png';
import ProfileEdit from '../../assets/images/profile_edit.png';
import { ThemeContext } from '../../context/ThemeContext';
import AccountDropDown from './AccountDropDown';

const MainHeader = ({ navigation , address}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerLeft}>
        <View style={styles.imageWrapper}>
          <Image source={UserImage} width={100} height={100} />
          {/* <TouchableOpacity
            style={[
              styles.userImgEdit,
              {
                borderColor: theme.screenBackgroud,
                backgroundColor: theme.emphasis,
              },
            ]}
            onPress={() => navigation.navigate('EditProfile')}>
            <Image source={ProfileEdit} />
          </TouchableOpacity> */}
        </View>
        <View>
          <AccountDropDown />
          {/* <Text style={[styles.userAccount, { color: theme.text }]}>
            Account 1
          </Text> */}
          {/* <Text style={[styles.userName, {color: theme.text}]}>Ellie</Text> */}
        </View>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={[styles.rightBtnWrapper, { backgroundColor: theme.menuItemBG }]}
          onPress={() => navigation.navigate('Scan',{address})}>
          <Image source={theme.type == 'dark' ? HeaderQr : HeaderQrDark} />
        </TouchableOpacity>
        {/* <View
          style={[styles.rightBtnWrapper, { backgroundColor: theme.menuItemBG }]}>
          <Image source={theme.type == 'dark' ? HeaderCopy : HeaderCopyDark} />
        </View> */}
        <TouchableOpacity
          style={[styles.rightBtnWrapper, { backgroundColor: theme.menuItemBG }]}
          onPress={() => navigation.navigate('Notification')}>
          <Image source={theme.type == 'dark' ? HeaderBell : HeaderBellDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  userAccount: {
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 11.47,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 15.293,
    letterSpacing: -0.229,
  },

  userName: {
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 15.47,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 17.293,
    letterSpacing: -0.39,
  },

  imageWrapper: {
    width: '45px',
    height: '45px',
    borderRadius: 45.879,
    position: 'relative',
  },

  userImgEdit: {
    position: 'absolute',
    left: 29.879,
    bottom: -2.016,
    padding: 2.667,
    borderRadius: 100,
    borderWidth: 2,
    // borderColor: "#280D2C",
    // backgroundColor: "#F43459",
  },

  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  rightBtnWrapper: {
    padding: 7.647,
    borderRadius: 955.814,
    // backgroundColor: "#362538"
  },
});
