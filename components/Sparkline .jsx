import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts';

const Sparkline = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <LineChart
        style={{ height: 50, width: 80 }}
        data={data}
        svg={{ stroke: 'green', strokeWidth: 2 }}
        contentInset={{ top:0, bottom: 0 }}
      />
    </View>
  );
};

export default Sparkline;
