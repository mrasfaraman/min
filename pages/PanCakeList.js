import React, {useContext, useEffect} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    FlatList
} from 'react-native';
import ListSearch from "../assets/images/list-search.png"
import ListSearchDark from "../assets/images/list-search-dark.png"
import PancakeImage from "../assets/images/pancake-image.png"
import Header from '../components/header';
import BottomMenu from '../components/BottomMenu';
import {ThemeContext} from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import '@walletconnect/react-native-compat';
import { Core } from '@walletconnect/core';
import { Web3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet'
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const PanCakeList = ({ navigation }) => {
    const {theme} = useContext(ThemeContext);
    const {Session , wallet , removeSession} = useAuth();


    const handleDisconnectPress = async (topic) => {
        console.log(topic)
        await wallet.extendSession({ topic })
        await wallet.disconnectSession({
          topic,
          reason: getSdkError('USER_DISCONNECTED')
        })
    };
    
    const PanCakeCard = ({ data, onDelete }) => {
        // Function to handle delete action
        const handleDelete = (data) => {
            // const walletConnectUrl = `${Session[Session.length - 1]?.session?.peer?.metadata?.url}/?wcSession=${Session[Session.length - 1]?.session?.topic}&chainId=1`;
            // Alert.alert(
            //     'Confirmation',
            //     'Are you sure you want to delete?',
            //     [
            //         {
            //             text: 'Ignore',
            //             onPress: () => console.log("Delete Ignore >>>",data.item.session?.topic),
            //             style: 'cancel'
            //         },
            //         {
            //             text: 'Confirm',
            //             onPress: () => {
            //                 onDelete(data.item.session.topic)
            //                 removeSession(data.index)
            //             }
            //         }
            //     ],
            //     { cancelable: false }
            // );
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Confirmation',
                textBody: 'Are You Sure You Want To Disconnect Wallet?',
                button: 'Disconnect',
                onPressButton: () => {
                    onDelete(data.item.session.topic)
                    removeSession(data.index)
                    Dialog.hide()
                }
              })
            // console.log("1",data.item.session)
            // console.log("2",data.item.session.namespaces)
            // console.log("3",data.item.session.optionalNamespaces)
            // console.log("5",data.item.session.relay)
            // console.log("6",data.item.session.requiredNamespaces)
            // console.log("7",data.item.session.self)
            // console.log("4 >>>",data.item.session.peer.metadata)
            // console.log("description >>>",data.item.session.peer.metadata.name)
            // console.log("icons >>>",data.item.session.peer.metadata.icons)
            // Send the topic data to the onDelete function
        
            // onDelete(data.session.topic);
        };
    
        return (
            <TouchableOpacity onPress={()=>{handleDelete(data)}} style={styles.deleteButton}>
            <View style={[{ borderBottomColor: theme.pancakeBorderBottom }, styles.panCakeCardWrapper]}>
                <View style={styles.pancakeCardLeft}>
                    <View style={[{ backgroundColor: theme.pancakeImgBG }, styles.pancakeLeftImgWrapper]}>
                        <Image style={styles.pancakeLeftImage} source={{ uri: data.item.session.peer.metadata.icons[0] }} />
                    </View>
                </View>
                <View style={styles.pancakeCardRight}>
                      <Text style={[{ color: theme.text }, styles.pancakeRightUpperText]}>
                        {data.item.session.peer.metadata.name}
                        </Text>
                        <Text style={[{ color: theme.text}, styles.pancakeRightLowerText]}>
                            {data.item.session.peer.metadata.description}
                        </Text>
                </View>
            </View>
                </TouchableOpacity>
        );
    };
 


    return (
        <View style={{height:'100%' , backgroundColor: theme.screenBackgroud}}>
            <ScrollView style={[styles.MainWrapper, {backgroundColor: theme.screenBackgroud}]}>
                <Header title={"Connections"} onBack={() => navigation.goBack()} />
                {/* <View style={[styles.listSearchWrapper, {backgroundColor: theme.menuItemBG}]}> */}
                    {/* <Image source={theme.type == 'dark' ? ListSearch : ListSearchDark} alt="search" /> */}
                    {/* <TextInput placeholder="Search" style={[{color: theme.text}, styles.listSearchText]} placeholderTextColor={theme.text} /> */}
                {/* </View> */}
                <View style={styles.bottomMenuMargin}>
                    <FlatList
                        data={Session}
                        renderItem={(item) => <PanCakeCard data={item} onDelete={handleDisconnectPress} />}
                    />
                </View>
            </ScrollView>
            <View >
                <BottomMenu navigation={navigation} />
            </View>
        </View>
    )
}

export default PanCakeList;

const styles = StyleSheet.create({
    MainWrapper: {
        // backgroundColor: '#280D2C',
        padding: 10,
    },
    listSearchWrapper: {
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderRadius: 100,
        // backgroundColor: "#362538",
        marginVertical: 16
    },
    listSearchText: {
        // color: "#FFF",
        fontSize: 12,
        fontWeight: "500",
        fontStyle: "normal",
        textTransform: "capitalize",
    },

    // //////////////////////// PanCake Wrapper /////////////////////////

    panCakeCardWrapper: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        // borderBottomColor: "#3E1844",
        borderBottomWidth: 1,
        // justifyContent:"space-between",
        gap: 12
    },
    pancakeCardLeft: {

    },
    pancakeLeftImgWrapper: {
        width: 56,
        height: 56,
        borderRadius: 100,
        // backgroundColor: "#00FFF0",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    pancakeLeftImage: {
        width: 46,
        height: 46,
    },
    pancakeRightUpperText: {
        // color: "#FFF",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "700",
    },
    pancakeRightLowerText: {
        // color: "#FFF",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "500",
        textTransform: "capitalize"
    },
    bottomMenuMargin: {
        marginBottom: 90
    }
})