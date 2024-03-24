import React, {useContext, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import Header from '../components/header';
import ProFileEditImg from '../assets/images/profile-edit-img.png';
import AddImage from '../assets/images/add-image.png';
import {ThemeContext} from '../context/ThemeContext';
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
  const {theme} = useContext(ThemeContext);
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
    <ScrollView
      style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
      <Header title={'Edit info'} />
      <View style={styles.editProfile}>
        <View style={styles.editContainerFlexUpper}>
          <View style={styles.profileEditWrapper}>
            <View style={styles.profileImgWrapper}>
              <Image style={styles.profileImage} source={ProFileEditImg} />
              <View style={[styles.addImgBtn, {borderColor: theme.screenBackgroud, backgroundColor: theme.emphasis}]}>
                <Image style={styles} source={AddImage} />
              </View>
            </View>
          </View>
          <View style={styles.inpMainWrapper}>
            <Text style={[styles.inpLabel, {color: theme.text}]}>{t('name')}
</Text>
            <TextInput placeholderTextColor={theme.text} style={[styles.inpWrapper, {backgroundColor: theme.menuItemBG, borderColor: theme.emphasis, color: theme.text}]} />
          </View>
        </View>
        <View style={styles.editContainerFlexLower}>
          <View style={styles.tokenImportBtnWrapper}>
            <TouchableOpacity style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]}>
              <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>{t('save_changes')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainWrapper: {
    // backgroundColor: '#280D2C',
    padding: 10,
  },
  editProfile: {
    flex: 1,
  },
  editContainerFlexUpper: {
    flex: 1,
  },
  profileEditWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileImgWrapper: {
    width: 184.019,
    height: 184.019,
    borderRadius: 100,
    marginTop: 50,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  addImgBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
    borderRadius: 100,
    borderWidth: 4,
    // borderColor: '#280D2C',
    // backgroundColor: '#F43459',
  },
  //
  inpMainWrapper: {
    marginTop: 15,
  },
  inpLabel: {
    // color: '#FFF',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'capitalize',
    marginLeft: 5,
  },
  inpWrapper: {
    marginTop: 10,
    padding: 12,
    paddingLeft: 18,
    // backgroundColor: '#362538',
    borderRadius: 8,
    // borderColor: '#F43459',
    borderWidth: 1,
  },
  //
  editContainerFlexLower: {
    flex: 1,
  },
  //
  tokenImportBtnWrapper: {
    marginTop: 35,
  },
  tokenImportButton: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    // borderColor: '#FF003C',
    borderWidth: 1,
    borderRadius: 100,
  },
  tokenImportButtonText: {
    // color: '#FFF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  //
});
