import React, {useContext} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import Header from "../components/header";
import UploadArrow from '../assets/images/upload-arrow.png';
import {ThemeContext} from '../context/ThemeContext';

const QueryForm = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <ScrollView style={[styles.mainWrapper, {backgroundColor: theme.screenBackgroud}]}>
            <Header title={"Query Form"} />
            <View style={styles.inpsMainWrapper}>
                <View style={styles.inpTwoWrapper}>
                    <View style={styles.inpTwoNested}>
                        <Text style={[styles.inpLabel, {color: theme.text}]}>Name</Text>
                        <TextInput style={[styles.inpWrapper, {backgroundColor: theme.menuItemBG, borderColor: theme.emphasis}]} />
                    </View>
                    <View style={styles.inpTwoNested}>
                        <Text style={[styles.inpLabel, {color: theme.text}]}>Contact</Text>
                        <TextInput style={[styles.inpWrapper, {backgroundColor: theme.menuItemBG, borderColor: theme.emphasis}]} />
                    </View>
                </View>
                <View style={styles.inpTwoNested}>
                    <View style={styles.inpSecOption}>
                        <Text style={[styles.inpLabel, {color: theme.text}]}>add Attachment</Text>
                        <Text style={[styles.inpSecOptionText, {color: theme.inpSecOptionText}]}>(optional)</Text>
                    </View>
                    <TouchableOpacity style={[styles.uploadBtnWrapper, {backgroundColor: theme.notificationWraperBG, borderColor: theme.emphasis}]}>
                        <Image source={UploadArrow} />
                        <Text style={[styles.uploadBtnText, {color: theme.text}]}>Attach (.JPG, .PNG, .GIF)</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.inpTwoNested, styles.spaceTop]}>
                    <Text style={[styles.inpLabel, {color: theme.text}]}>Message</Text>
                    <TextInput style={[[styles.inpWrapper, {backgroundColor: theme.menuItemBG, borderColor: theme.emphasis}]]} multiline numberOfLines={6} />
                </View>
                <View style={styles.tokenImportBtnWrapper}>
                    <TouchableOpacity style={[styles.tokenImportButton, {borderColor: theme.buttonBorder}]}>
                        <Text style={[styles.tokenImportButtonText, {color: theme.text}]}>Import</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default QueryForm;

const styles = StyleSheet.create({
    mainWrapper: {
        // backgroundColor: '#280D2C',
        padding: 10,
    },
    inpsMainWrapper: {
        marginTop: 25
    },
    // 
    inpTwoWrapper: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        marginBottom: 15
    },
    inpTwoNested: {
        flex: 1,
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
        borderRadius: 8,
        // borderColor: "#F43459",
        borderWidth: 1
    },
    // 
    inpSecOption: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    inpSecOptionText: {
        // color: "#534255",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "700",
        textTransform: "capitalize",
        marginLeft: 5
    },
    uploadBtnWrapper: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        padding: 12,
        // backgroundColor: "rgba(244, 52, 89, 0.12)",
        borderStyle: "dashed",
        // borderColor: "#F43459",
        borderWidth: 1,
        borderRadius: 8
    },
    uploadBtnText: {
        // color: "white",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        textTransform: "capitalize",
        marginLeft: 5
    },
    spaceTop: {
        marginTop: 15,
    },
    // 
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
    // 
})