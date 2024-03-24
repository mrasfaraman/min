import React, {useContext} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

interface Props extends TouchableOpacityProps {
  title: string;
  containerStyle: StyleProp<ViewStyle>;
}
export default function SubmitBtn({
  title,
  onPress,
  containerStyle,
  disabled,
}: Props) {
  const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.btn, disabled && {opacity: 0.7}, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            // borderColor: theme.buttonBorder,
            borderColor: theme.addButtonBorder,
            backgroundColor: theme.addButtonBG,
          },
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text
          style={[
            styles.btnText,
            {
              color:
                theme.name == 'theme3' ? theme.screenBackgroud : theme.text,
            },
          ]}>
          {title}
        </Text>
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
