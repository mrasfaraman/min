// HistoryModal.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } 
	from 'react-native';
import { StyleSheet } from 'react-native';
// import styles from '../Browser/Styles';
const HistoryModal = ({ history, histShow, setHistShow, setUrl }) => {
	return (
		<Modal animationType="slide"
			transparent={false} 
			visible={histShow}>
			<View style={styles.modalContainer}>
				{history.length === 0 ? (
					<Text style={styles.noHistoryText}>No History Present</Text>
				) : (
					<FlatList data={history}
							keyExtractor={(i, index) => index.toString()}
							renderItem={({ item }) => (
						<TouchableOpacity onPress={() => 
								setUrl(item)} style={styles.historyItem}>
								<Text style={styles.text} >{item}</Text>
							</TouchableOpacity>)}/>)}
				<TouchableOpacity onPress={() => setHistShow(false)} style={styles.closeModalButton}>
					<Text style={styles.closeModalButtonText}>Close</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 10,
	},
	text:{
		color:'black'
	},
	header: {
		marginTop: 20,
		alignItems: 'center',
	},
	headerText: {
		fontSize: 28,
		color: 'green',
	},
	subHeaderText: {
		fontSize: 16,
		color: 'black',
		textAlign: 'center',
		marginBottom: 10,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	textInput: {
		flex: 1,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginRight: 10,
		paddingLeft: 10,
	},
	goButton: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		width: 60,
	},
	goButtonText: {
		color: 'white',
	},
	toolbar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'lightgray',
		padding: 1,
	},
	navigationButton: {
		backgroundColor: 'transparent',
		padding: 10,
		borderRadius: 5,
	},
	clearButton: {
		backgroundColor: 'transparent',
		padding: 10,
		borderRadius: 5,
	},
	historyButton: {
		backgroundColor: 'transparent',
		padding: 10,
		borderRadius: 5,
	},
	webviewContainer: {
		flex: 1,
		position: 'relative',
	},
	loadingOverlay: {
		...StyleSheet.absoluteFill,
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	historyItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'lightgray',
		// backgroundColor:'red'
	},
	closeModalButton: {
		backgroundColor: 'purple',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		marginTop: 10,
	},
	closeModalButtonText: {
		color: 'white',
	},
	iconText: {
		color: 'black',
		textAlign: 'center',
		fontSize: 14,
	},
	noHistoryText: {
		fontSize: 18,
		color: 'black',
		textAlign: 'center',
		marginVertical: 20,
	},
	reloadButton: {
		backgroundColor: 'transparent',
		padding: 10,
		borderRadius: 5,
	},
	stopButton: {
		backgroundColor: 'transparent',
		padding: 10,
		borderRadius: 5,
	},
	fontButton: {
		backgroundColor: 'transparent',
		padding: 10,
		borderRadius: 5,
	},
});
export default HistoryModal;