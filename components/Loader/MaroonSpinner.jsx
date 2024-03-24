import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const MaroonSpinner = ({ size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#800000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // You can add additional styling to center the spinner or space it out as needed.
  },
});

export default MaroonSpinner;
