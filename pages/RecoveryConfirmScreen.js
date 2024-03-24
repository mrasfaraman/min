import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, Alert } from 'react-native';
import Header from '../components/header';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const MnemonicComponent = ({ mnemonic, theme, hiddenIndices, setInputValues, inputValues }) => {
  const wordsArray = mnemonic.split(' ');

  const handleInputChange = (index, text) => {
    setInputValues(prevInputValues => {
      const newInputValues = [...prevInputValues]; // Create a copy of the previous inputValues array
      newInputValues[index] = text; // Update the value at the specified index
      return newInputValues; // Return the updated array
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.words}>
        <FlatList
          data={wordsArray}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.wordPair}>
              <View style={[styles.word, { borderColor: theme.wordBorder, width: '60%', alignItems: 'center', flexDirection: 'row', justifyContent: 'left' }]}>
                {hiddenIndices.includes(index) ? (
                  <>
                    <TextInput
                      style={{ color: theme.text, width: '50%' }} // Adjust width here
                      onChangeText={text => handleInputChange(index, text)}
                      value={inputValues[index]}
                      placeholder="Input"
                      placeholderTextColor={theme.placeholderText}
                      maxLength={20} // Limit input length
                    />
                  </>
                ) : (
                  <>
                    <Text style={{ color: theme.text }}>{`${index + 1}.   `}</Text>
                    <Text style={{ color: theme.text }}>{`${item}`}</Text>
                  </>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default function RecoveryConfirmScreen({ navigation, route }) {
  const { mnemonic } = route.params;
  const { theme } = useContext(ThemeContext);
  const [hiddenIndices, setHiddenIndices] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const maxHidden = Math.min(3, mnemonic.split(' ').length); // Maximum 3 words to hide
    setHiddenIndices(generateRandomIndices(maxHidden));
    setInputValues(new Array(mnemonic.split(' ').length).fill(''));
  }, [mnemonic]);

  const generateRandomIndices = (count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * mnemonic.split(' ').length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const verifyInputs = () => {
    // Check if all hidden input fields are filled
    const hiddenInputsFilled = inputValues.filter((value, index) => hiddenIndices.includes(index)).every(value => value.trim() !== '');
  
    if (!hiddenInputsFilled) {
        setErrorMessage('Please fill in all hidden input fields.');
      return;
    }
  
    // Now, you can compare inputValues with the original mnemonic
    for (let i = 0; i < hiddenIndices.length; i++) {
      if (inputValues[hiddenIndices[i]] !== mnemonic.split(' ')[hiddenIndices[i]]) {
        setErrorMessage(`The entered value for word ${hiddenIndices[i] + 1} does not match the original mnemonic.`);
        return;
      }
    }
  
    // Log the input array
    console.log('User Input:', inputValues);
    setErrorMessage('');
    navigation.navigate('SetPasswordScreen');
  };
  return (
    <ScrollView style={{ backgroundColor: theme.screenBackgroud }}>
      <Header
        title="Secret Key"
        onBack={() => navigation.goBack()}
      />
      <View style={[styles.content, styles.textContainer]}>
        <Text style={[styles.textStyle, { color: theme.text }]}>
          Confirm your Recovery Phrase
        </Text>
        <Text style={[styles.textStyle, styles.instruction, { color: theme.text }]}>
          Write down the words in right order
        </Text>
      </View>
      {errorMessage !== '' && (
  <Text style={{ color: 'red', textAlign:'center' }}>{errorMessage}</Text>
)}
      <View style={styles.content}>
        <MnemonicComponent
          mnemonic={mnemonic}
          theme={theme}
          hiddenIndices={hiddenIndices}
          setInputValues={setInputValues}
          inputValues={inputValues}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.buttonStyle, { borderColor: theme.buttonBorder }]}
            onPress={verifyInputs}>
            <Text style={[styles.btnText, { color: theme.text }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
       
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  words: {
    marginBottom: 10,
  },
  wordPair: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  word: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  content: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 50,
    gap: 32,
  },
  textContainer: {
    gap: 0,
    marginBottom: 30,
  },
  textStyle: {
    fontFamily: 'SF Pro Text',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 15,
  },
  instruction: {
    fontSize: 14,
    marginTop: 12,
  },
  buttonStyle: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 1000,
  },
  buttons:{
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: '600',
  },
});