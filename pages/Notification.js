import React, {useContext} from 'react';
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
import ListSearch from '../assets/images/list-search.png';
import ListSearchDark from '../assets/images/list-search-dark.png';
import NotificationIcon from '../assets/images/notification-gift-icon.png';
import {ThemeContext} from '../context/ThemeContext';

const Notification = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const data = [1, 1, 1, 1];

  const NotificationCard = () => {
    return (
      <View style={[styles.NotificationCardWrapper, {backgroundColor: theme.notificationWraperBG}]}>
        <View>
          <View style={[styles.notificationIconWrapper, {backgroundColor: theme.notificationIconBG}]}>
            <Image source={NotificationIcon} />
          </View>
        </View>
        <View style={styles.notificationRightWrapper}>
          <View style={styles.upperHeaderFlex}>
            <Text style={[styles.upperheading, {color: theme.text}]}>Claim your rewards!</Text>
            <View style={[styles.newTag, {backgroundColor: theme.emphasis}]}>
              <Text>New</Text>
            </View>
          </View>
          <Text style={[styles.notificationPara, {color: theme.text}]}>
            Claim your sign up bonus rewards by Rijex now
          </Text>
          <Text style={[styles.notificationTime, {color: theme.notificationTime}]}>2 hours ago</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
      <Header title={'Notification'} onBack={() => navigation.goBack()} />
      <View
        style={[styles.listSearchWrapper, {backgroundColor: theme.menuItemBG}]}>
        <Image source={theme.type == 'dark' ? ListSearch : ListSearchDark} alt="search" />
        <TextInput
          placeholder="Search Notification..."
          style={[styles.listSearchText, {color: theme.text}]}
          placeholderTextColor={theme.text}
        />
      </View>
      <FlatList
        data={data}
        renderItem={item => <NotificationCard></NotificationCard>}
      />
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  mainWrapper: {
    // backgroundColor: '#280D2C',
    padding: 10,
  },
  listSearchWrapper: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 100,
    // backgroundColor: "#362538",
    marginVertical: 16,
  },
  listSearchText: {
    // color: "#FFF",
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    textTransform: 'capitalize',
    width: '100%',
  },
  // ///////////////////////////// Notification //////////////////////////////////////
  NotificationCardWrapper: {
    padding: 16,
    borderRadius: 12,
    // backgroundColor: '#f434591f',
    marginBottom: 16,
    flexDirection: 'row',
    // justifyContent: "space-between",
    gap: 13,
  },
  notificationIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 16,
    // backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationRightWrapper: {
    gap: 8,
  },
  upperHeaderFlex: {
    flexDirection: 'row',

    alignItems: 'center',
    gap: 8,
  },
  upperheading: {
    // color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  newTag: {
    // backgroundColor: '#F43459',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  notificationPara: {
    // color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
  },
  notificationTime: {
    // color: '#8D8D8D',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
  },
});
