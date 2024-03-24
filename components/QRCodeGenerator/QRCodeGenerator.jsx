import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = ({ evmAddress }) => {
  return (
    <View style={styles.container}>
      {evmAddress ? (
        <QRCode
          value={evmAddress}
          size={200} // You can adjust the size as needed
          backgroundColor="white"
          color="black"
        />
      ) : (
        <View style={styles.placeholderContainer}>
          {/* Placeholder view or text in case there's no address */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  placeholderContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCodeGenerator;
