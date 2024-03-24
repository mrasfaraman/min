import React, { useState, useContext , useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Header from '../components/header';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function Networks({ navigation }) {
    const [currency, setCurrency] = useState('USD $');
    const { theme } = useContext(ThemeContext);
    const {selectedNetwork, setSelectedNetwork, Networks} = useAuth()
    const [activeNet , setActiveNet] = useState()
    const getNetwork = async () => {
        let data = await JSON.parse(selectedNetwork)
        setActiveNet(data)
    }
    const selectNetwork = async (item) => {
        await AsyncStorage.setItem('SelectedNetworks', JSON.stringify(item));
        setSelectedNetwork(item)
        setActiveNet(item)
        navigation.navigate('MainPage')
     
        Toast.show({
            type: ALERT_TYPE.INFO,
            title: 'Switch Network',
            textBody: `Network Switch to ${item?.networkName}`,
          })
    }
    function renderItem({ item }) {
        // const {flag} = item;
        return (
            <TouchableOpacity
                onPress={() => selectNetwork(item)}
                style={
                    activeNet == item
                        ? [
                            {
                                borderColor: theme.langItmBorder,
                                backgroundColor: theme.menuItemBG,
                            },
                            styles.item,
                            styles.selected,
                            {
                                borderColor: theme.emphasis,
                                backgroundColor: theme.menuItemBG,
                            },
                        ]
                        : [
                            styles.item,
                            {
                                borderColor: theme.langItmBorder,
                                backgroundColor: theme.menuItemBG,
                            },
                        ]
                }>
                <View style={styles.itemLeft}>
                    <Text style={{ color: theme.text }}>{item.networkName}</Text>
                </View>
                {/* <View>
                    <RadioButton value={item.networkName} color={theme.emphasis} />
                </View> */}
            </TouchableOpacity>
        );
    }
    useEffect(()=>{
        getNetwork()
    },[Networks,selectedNetwork])
    return (
        <ScrollView style={{ backgroundColor: theme.screenBackgroud }}>
            <Header
                title={'Networks'}
                skipOption={false}
                onBack={() => navigation.goBack()}
            />
                 <View style={styles.itemLeft}>
                 <Text style={[styles.title, {color: theme.text}]}>Selected Network</Text>
                    <Text style={{ color: theme.text }}> {activeNet ? activeNet.networkName:""}</Text>
                </View>
            <View style={styles.container}>
                {/* <View style={[styles.input, { backgroundColor: theme.menuItemBG }]}>
                    <Image
                        style={styles.imgStyle}
                        source={theme.type == 'dark' ? require('../assets/images/search-md.png') : require('../assets/images/list-search-dark.png')}
                    />
                    <TextInput
                        style={[styles.searchInput, { color: theme.text }]}
                        placeholder="Search"
                        placeholderTextColor={theme.text}
                    />
                </View> */}
                <RadioButton.Group
                    onValueChange={curr => setCurrency(curr)}
                    value={currency}>
                    <FlatList data={Networks} renderItem={renderItem} />
                </RadioButton.Group>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // screen: {
    //   // backgroundColor: '#280D2C',
    // },
    container: {
        marginVertical: 24,
        marginHorizontal: 16,
        gap: 24,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        // border: 1px solid #313843;
        borderWidth: 1,
        borderStyle: 'solid',
        // borderColor: '#313843',
        // marginVertical: 12,
        marginBottom: 12,
        // backgroundColor: '#362538',
    },
    itemLeft: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 14,
        // justifyContent: 'center',
        gap: 8,
        alignItems: 'center',
        // gap: 188,
        // alignSelf: 'stretch',
    },
    selected: {
        borderRadius: 16,
        // border: '2px solid var(--Secodary, #F43459)',
        borderWidth: 2,
        // borderColor: '#F43459',
        borderStyle: 'solid',

        // backgroundColor: '#362538',
    },
    input: {
        flexDirection: 'row',
        // backgroundColor: '#362538',
        alignItems: 'center',
        padding: 14,
        paddingVertical: 0,
        justifyContent: 'flex-start',
        borderRadius: 1000,
    },
    imgStyle: {
        width: 24,
        height: 24,
    },
    searchInput: {
        minWidth: '100%',
        // color: 'white',
    },
});
