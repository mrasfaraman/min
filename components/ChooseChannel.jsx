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
import ChooseDrop from "../assets/images/choose_drop.png"
import ChooseDropDark from "../assets/images/choose_drop_dark.png"
import SwapBany from "../assets/images/swap_bany.png"
import {ThemeContext} from '../context/ThemeContext';


const ChooseChannel = () => {
    const {theme} = useContext(ThemeContext);
    const data = [1, 1, 1]
    return (
        <View style={[styles.mainWrapper, {backgroundColor: theme.menuItemBG}]}>
            <View style={styles.chooseHeaderFlex}>
                <Text style={[styles.chooseLeftText, {color: theme.text}]}>choose channels</Text>
                <View>
                    <Image source={theme.type == 'dark' ? ChooseDrop : ChooseDropDark} />
                </View>
            </View>
            {
                data.map((val, ind) => {
                    return (
                        <View style={[styles.chooseRowFlex, {borderColor: theme.chooseRowFlex}]}>
                            <View style={styles.chooseRowLeftSubFlex}>
                                <View style={[styles.swapIconWrapper, {backgroundColor: theme.pancakeImgBG}]}>
                                    <Image source={SwapBany} />
                                </View>
                                <Text style={[styles.swapName, {color: theme.text}]}>Warm hole</Text>
                            </View>
                            <Text style={[styles.swapPercentage, {color: theme.emphasis}]}>2.1%</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default ChooseChannel;

const styles = StyleSheet.create({
    mainWrapper: {
        padding: 24,
        borderRadius: 16,
        // backgroundColor: "#362538",
        marginBottom: 40
    },
    chooseHeaderFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24
    },
    chooseLeftText: {
        // color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    chooseRowFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        // borderColor: "#554357",
        marginBottom: 12
    },
    chooseRowLeftSubFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    swapIconWrapper: {
        width: 32,
        height: 32,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#00FFF0",
        borderRadius: 100
    },
    swapName: {
        // color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    swapPercentage: {
        // color: "#F43459",
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize",
    },
})