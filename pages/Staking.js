import React, {useContext} from 'react';
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
import ListSearch from "../assets/images/list-search.png"
import ListSearchDark from "../assets/images/list-search-dark.png"
import PancakeImage from "../assets/images/staking-icon.png"
import Header from '../components/header';
import {ThemeContext} from '../context/ThemeContext';

const Staking = () => {
    const {theme} = useContext(ThemeContext);
    const data = [1, 1, 1, 1, 1, 1,]

    const StakingCard = () => {
        return (
            <View style={styles.panCakeCardWrapper}>
                <View style={styles.pancakeCardLeft}>
                    <View style={styles.pancakeLeftImgWrapper}>
                        <Image style={styles.pancakeLeftImage} source={PancakeImage} />
                    </View>
                    <View>
                        <Text style={[styles.pancakeLeftUpperText, {color: theme.text}]}>EVMOS</Text>
                        <Text style={[styles.pancakeLeftLowerText, {color: theme.text}]}>evmos</Text>
                    </View>
                </View>
                <View style={styles.pancakeCardRight}>
                    <Text style={[styles.pancakeRightUpperText, {color: theme.pancakeRightUpperText}]}>APR - 37.8%</Text>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={[styles.MainWrapper, {backgroundColor: theme.screenBackgroud}]}>
            <Header title='Staking' />
            <View style={[styles.listSearchWrapper, {backgroundColor: theme.menuItemBG}]}>
                <Image source={theme.type == 'dark' ? ListSearch : ListSearchDark} alt="search" />
                <TextInput placeholder="Search Chains" style={[styles.listSearchText, {color: theme.text}]} placeholderTextColor={theme.text} />
            </View>
            <FlatList
                data={data}
                renderItem={(item) => <StakingCard />}
            />
        </ScrollView>
    )
}

export default Staking;

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
        width: "100%"
    },

    // //////////////////////// PanCake Wrapper /////////////////////////

    panCakeCardWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        marginBottom: 24
    },
    pancakeCardLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    pancakeLeftImgWrapper: {
        width: 56,
        height: 56,
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    pancakeLeftImage: {
        width: "100%",
        height: "100%"
    },
    pancakeLeftUpperText: {
        // color: "#FFF",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "700",
        textTransform: "capitalize"

    },
    pancakeLeftLowerText: {
        // color: "#FFF",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "500",
        textTransform: "capitalize"
    },
    pancakeRightUpperText: {
        // color: "#31FF9C",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "700",
        textTransform: "capitalize"
    }
})