import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

export default function SubmitBtn({title, onPress}) {
  const {theme} = useContext(ThemeContext);
  return (
    <View style={styles.btn}>
      <TouchableOpacity
        style={[styles.buttonStyle, {borderColor: theme.buttonBorder}]}
        onPress={onPress}>
        <Text style={[styles.btnText, {color: theme.text}]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 16,
  },
  buttonStyle: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    // borderColor: '#FF003C',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 1000,
  },
  btnText: {
    textAlign: 'center',
    // color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: '600',
  },

  buttons: {
    // gap: 10,
    // marginHorizontal: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 70,
    gap: 32,
  },
});
