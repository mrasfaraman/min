import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import SubmitBtn from '../SubmitBtn';
import {useTranslation} from 'react-i18next';
import i18n from '../../pages/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NetWork = ({navigation}) => {
    const {theme} = useContext(ThemeContext);
  const {addNetwork} = useAuth();
  const [networkValues, setNetworkValue] = useState({
    networkId: '',
    networkName: '',
    symbol: '',
    nodeURL: '',
    explorerURL: '',
    type: '',
  });
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
    useEffect(() => {
        const type = networkValues.symbol === "solana" ? "solana" : "evm";
        setNetworkValue(prevState => ({
          ...prevState,
          type,
        }));
      }, [networkValues.symbol]);

    const updateNetworkValue = (key, value) => {
        setNetworkValue(prevState => ({
            ...prevState,
            [key]: value
        }));
    };
    const validateNetworkValues = (values) => {
        // List of required fields
        const requiredFields = ['networkId', 'networkName', 'symbol', 'nodeURL', 'type'];
      
        // Object to hold any validation errors
        let errors = {};
      
        // Check each required field for a non-empty value
        requiredFields.forEach(field => {
          if (!values[field].trim()) {
            // If the field is empty, add an error message for it
            errors[field] = `${field} cannot be empty`;
          }
        });
      
        // Return the errors object; if it's empty, validation passed
        return errors;
      };
    const addNetworkDetail = () => {
        const validationErrors = validateNetworkValues(networkValues);
        
        // Check if there are any errors
        if (Object.keys(validationErrors).length === 0) {
            addNetwork(networkValues);
            navigation.navigate('SettingsScreen')
        } else {
            // Handle the errors, e.g., by showing them to the user
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Invalid Network',
                textBody: 'Network is not Valid',
              })
            // Example: Set these errors in state to display them in the UI
        }
    
    }

    return (
        <View style={styles.mainWrapper}>
            <View style={styles.inpTwoWrapper}>
                <View style={styles.inpTwoNested}>
                    <Text style={[styles.inpLabel, { color: theme.text }]}>{t('network_id')} </Text>
                    <TextInput
            style={[
              styles.inpWrapper,
              {
                backgroundColor: theme.menuItemBG,
                color: theme.text,
                borderColor: theme.addButtonBorder,
                borderWidth: 1,
              },
            ]} placeholderTextColor={theme.text}
                        onChangeText={(text) => updateNetworkValue('networkId', text)}
                    />
                </View>
                {/* <View style={styles.inpTwoNested}>
                    <Text style={[styles.inpLabel, { color: theme.text }]}>Chainlist</Text>
                    <TextInput style={[styles.inpWrapper, { backgroundColor: theme.menuItemBG, color: theme.text }]} placeholderTextColor={theme.text} />
                </View> */}
            </View>
            <View style={styles.inpMainWrapper}>
                <Text style={[styles.inpLabel, { color: theme.text }]}>{t('name')}</Text>
                <TextInput
          style={[
            styles.inpWrapper,
            {
              backgroundColor: theme.menuItemBG,
              color: theme.text,
              borderColor: theme.addButtonBorder,
              borderWidth: 1,
            },
          ]} placeholderTextColor={theme.text}
                    onChangeText={(text) => updateNetworkValue('networkName', text)}
                />
            </View>
            <View style={styles.inpMainWrapper}>
                <Text style={[styles.inpLabel, { color: theme.text }]}>{t('symbol')}</Text>
                <TextInput
          style={[
            styles.inpWrapper,
            {
              backgroundColor: theme.menuItemBG,
              color: theme.text,
              borderColor: theme.addButtonBorder,
              borderWidth: 1,
            },
          ]} placeholderTextColor={theme.text}
                    onChangeText={(text) => updateNetworkValue('symbol', text)}
                />
            </View>
            <View style={styles.inpMainWrapper}>
                <Text style={[styles.inpLabel, { color: theme.text }]}>{t('node_url')}</Text>
                <TextInput
          style={[
            styles.inpWrapper,
            {
              backgroundColor: theme.menuItemBG,
              color: theme.text,
              borderColor: theme.addButtonBorder,
              borderWidth: 1,
            },
          ]} placeholderTextColor={theme.text}
                    onChangeText={(text) => updateNetworkValue('nodeURL', text)}
                />
            </View>
            <View style={styles.inpMainWrapper}>
                <Text style={[styles.inpLabel, { color: theme.text }]}>{t('explorer_url')}</Text>
                <TextInput
          style={[
            styles.inpWrapper,
            {
              backgroundColor: theme.menuItemBG,
              color: theme.text,
              borderColor: theme.addButtonBorder,
              borderWidth: 1,
            },
          ]} placeholderTextColor={theme.text}
                    onChangeText={(text) => updateNetworkValue('explorerURL', text)}
                />
            </View>
            <View style={styles.tokenImportBtnWrapper}>
            <SubmitBtn
          title="Add Network"
          onPress={() => addNetworkDetail()}
          containerStyle={{marginHorizontal: 0}}
        />
        {/* <TouchableOpacity
          style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]}
          onPress={() => addNetworkDetail()}>
          <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>
            Add Network
          </Text>
        </TouchableOpacity> */}
                    {/* <Text style={[styles.tokenImportButtonText, { color: theme.text }]}>{t('add_network')}</Text> */}
            </View>
        </View>
    )
}

export default NetWork;

const styles = StyleSheet.create({
    mainWrapper: {
        marginTop: 40,
        marginBottom: 40,
    },
    inpTwoWrapper: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        marginBottom: 15
    },
    inpTwoNested: {
        flex: 1
    },
    inpMainWrapper: {
        marginBottom: 15
    },
    inpLabel: {
        // color: "#FFF",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "700",
        textTransform: "capitalize",
        marginLeft: 5
    },
    inpWrapper: {
        marginTop: 10,
        padding: 12,
        paddingLeft: 18,
        // backgroundColor: "#362538",
        borderRadius: 8
    },
    tokenImportBtnWrapper: {
        marginTop: 25
    },
    tokenImportButton: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        // borderColor: "#FF003C",
        borderWidth: 1,
        borderRadius: 100,
    },
    tokenImportButtonText: {
        // color: "#FFF",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        textTransform: "capitalize",
        textAlign: "center"
    }
})