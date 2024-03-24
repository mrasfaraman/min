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
import Tick from '../assets/images/double_tick.png';
import PaperClip from '../assets/images/paperclip.png';
import PaperClipDark from '../assets/images/paperclip-dark.png';
import MicroPhone from '../assets/images/microphone.png';
import Print from '../assets/images/print.png';
import Header from '../components/header';
import BottomMenu from '../components/BottomMenu';
import AddButton from '../components/AddButton';
import {ThemeContext} from '../context/ThemeContext';

const Chat = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.superMain, {backgroundColor: theme.screenBackgroud}]}>
      <ScrollView style={styles.MainWrapper}>
        <Header title="Support Team" onBack={() => navigation.goBack()} />
        <View>
          <Text style={[styles.upperHeading, {color: theme.chatUpperHeading}]}>Today</Text>
        </View>
        <View>
          <View style={styles.messageFlex}>
            <View style={[styles.chatBox, {backgroundColor: theme.menuItemBG, borderColor: theme.mode}]}>
              <Text style={[styles.chatText, {color: theme.text}]}>Hello!</Text>
              <View style={styles.tickFlex}>
                <Image source={Tick} />
                <Text style={[styles.chatSeen, {color: theme.text}]}>09:46</Text>
              </View>
            </View>
          </View>
          <View style={styles.messageFlex}>
            <View style={[styles.chatBox, {backgroundColor: theme.menuItemBG, borderColor: theme.mode}]}>
              <Text style={[styles.chatText, {color: theme.text}]}>Random para goes here...</Text>
              <View style={styles.tickFlex}>
                <Image source={Tick} />
                <Text style={[styles.chatSeen, {color: theme.text}]}>09:46</Text>
              </View>
            </View>
          </View>
          <View style={[styles.otherMessage]}>
            <View style={[styles.chatBox, {backgroundColor: theme.menuItemBG, borderColor: theme.mode}]}>
              <Text style={[styles.chatText, {color: theme.text}]}>Hello</Text>
              <View style={styles.tickFlex}>
                <Image source={Tick} />
                <Text style={[styles.chatSeen, {color: theme.text}]}>09:46</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.chatInpFlex}>
        <View style={[styles.chatInputSubFlex, {backgroundColor: theme.menuItemBG}]}>
          <TextInput
            style={{color: theme.text}}
            placeholder="Type message..."
            placeholderTextColor={theme.text}
          />
          <Image source={theme.type == 'dark' ? PaperClip : PaperClipDark} />
        </View>
        <TouchableOpacity style={[styles.voiceBtnWrapper, {backgroundColor: theme.mode}]}>
          <Image source={MicroPhone} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  superMain: {
    flex: 1,
    // backgroundColor: '#280D2C',
    padding: 10,
  },
  MainWrapper: {
    // backgroundColor: '#280D2C',
  },
  upperHeading: {
    textAlign: 'center',
    // color: '#777',
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 20,
  },
  messageFlex: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  otherMessage: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  chatBox: {
    padding: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    // backgroundColor: '#362538',
    // borderColor: '#F43459',
  },
  chatText: {
    // color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  chatSeen: {
    // color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  tickFlex: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  chatInpFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatInputSubFlex: {
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    // backgroundColor: '#362538',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voiceBtnWrapper: {
    padding: 14,
    borderRadius: 100,
    // backgroundColor: '#F43459',
  },
});
