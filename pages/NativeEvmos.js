import React, {useContext} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Header from "../components/header";
import {ThemeContext} from '../context/ThemeContext';

const NativeEvmos = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <ScrollView style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
            <Header title={'Native Evmos (EVMOS)'} />
            <View style={[styles.gasFlexWrapper, {backgroundColor: theme.menuItemBG}]}>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text}]}>available</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>0 EVMOS</Text>
                </View>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text}]}>Staked</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>0 EVMOS</Text>
                </View>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text}]}>APR</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>37.8%</Text>
                </View>
                <View style={styles.gasFeeFlex}>
                    <Text style={[styles.gasFeeLabel, {color: theme.text}]}>Lock Time</Text>
                    <Text style={[styles.gasFee, {color: theme.emphasis}]}>14 Days</Text>
                </View>
            </View>
            <View>
                <Text style={[styles.stakeHeading, {color: theme.text}]}>Amount to Stake</Text>
                <View style={[styles.nativeInpFlex, {backgroundColor: theme.promisBackground}]}>
                    <TextInput
                        placeholder="|"
                        style={styles.nativeInpMain}
                        placeholderTextColor={theme.emphasis} />
                    <Text style={[styles.nativeInpTextLable, {color: theme.emphasis}]}>Max</Text>
                </View>
                <Text style={[styles.nativePercentage, {color: theme.text}]}>~ 0.00</Text>
            </View>
            <View>
                <Text style={[styles.stakeHeading, {color: theme.text}]}>Amount to Stake</Text>
                <View style={[styles.nativeInpFlex, {backgroundColor: theme.promisBackground}]}>
                    <View style={styles.nativeRadioWrapper}>
                        <RadioButton />
                        <Text style={[styles.nativeRadioText, {color: theme.text}]}>Trust Nodes</Text>
                    </View>

                    <Text style={[styles.nativeValidatorVal, {color: theme.pancakeRightUpperText}]}>APR - 37.8%</Text>
                </View>
            </View>
            <View style={[styles.nativeNoteWrapper, {backgroundColor: theme.nativeNoteWrapper}]}>
                <Text style={[styles.nativeNote, {color: theme.nativeNote}]}>Staked funds are accessible 14 days after unstaking</Text>
            </View>
            <TouchableOpacity style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]}>
                <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default NativeEvmos;


const styles = StyleSheet.create({
    mainWrapper: {
        // backgroundColor: '#280D2C',
        padding: 10,
    },
    // 
    gasFlexWrapper: {
        marginVertical: 10,
        padding: 24,
        // backgroundColor: "#362538",
        borderRadius: 16
    },
    gasFeeFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        paddingHorizontal: 4
    },
    gasFeeLabel: {
        // color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    gasFee: {
        // color: "#F43459",
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    // 
    stakeHeading: {
        // color: "white",
        fontSize: 16,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    nativeInpFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "#351739",
        borderRadius: 8,
        padding: 14,
        marginTop: 8
    },
    nativeInpMain: {
        padding: 0,
        flex: 1
    },
    nativeInpTextLable: {
        // color: "#F43459",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize",
    },
    nativePercentage: {
        marginVertical: 8,
        // color: "white",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize",
    },
    nativeValidatorVal: {
        // color: "#31FF9C",
        fontSize: 12,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    nativeRadioWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    nativeRadioText: {
        // color: "white",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize",
    },
    nativeNoteWrapper: {
        marginTop: 15,
        padding: 12,
        // backgroundColor: "#fdd50214",
        borderRadius: 8
    },
    nativeNote: {
        // color: "#FDD502",
        fontSize: 16,
        fontWeight: "400",
        textTransform: "capitalize"
    },
    // 
    tokenImportButton: {
        marginTop: 15,
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
    // 
})