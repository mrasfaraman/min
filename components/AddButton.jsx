import React, {useContext} from 'react';
import {Fab, Box, Center, NativeBaseProvider} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

const AddButton = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <Fab
      renderInPortal={false}
      shadow={2}
      size="lg"
      icon={<Image source={require('../assets/images/plusIcon.png')} />}
      onPress={() => navigation.navigate('AddToken')}
      style={{backgroundColor: theme.emphasis}}
    />
  );
};

export default AddButton;
