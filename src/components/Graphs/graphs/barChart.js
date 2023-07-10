import React, { useContext} from 'react';
import { StackedBarChart, Grid, YAxis, XAxis, } from 'react-native-svg-charts';
import { View, Text } from 'react-native';
import { barData } from '../mock/graphMock';

import { useTheme } from '@react-navigation/native';
import { AppContext } from '../../../context/AppContext';

function BarGraph() {

  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);

  const colorBar = ['#FF914D', '#000DDD'];
  const keys = ['combo', 'voucher'];

  const contentInset = { top: 10, bottom: 10 };

  // Extract YAxis data points
  const data = Object.keys(barData).map(month => ({
    month,
    ...barData[month],
  }));

  const yAxisData = data.map(item => item.combo + item.voucher);

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 10,
        marginTop: 30,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#979797'
      }}>
      <View style={{ marginBottom: 15, marginTop: -10 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 15,
            fontWeight: '300',
            marginRight: 70,
          }}
        >
          {'Economia com Cupons (em reais)'}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 9,
            fontWeight: '300'
          }}
        >
            {'(Últimos seis meses)'}
          </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 140,
          width: 220,
          paddingVertical: 16,
        }}
      > 
        <YAxis
          data={yAxisData}
          contentInset={contentInset}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />
        <StackedBarChart
          style={{ flex: 1, marginLeft: 16 }}
          keys={keys}
          colors={colorBar}
          data={data}
          contentInset={contentInset}
        >
          <Grid />
        </StackedBarChart>
        <XAxis
          style={{ marginTop: 10, }}
          data={data}
          formatLabel={(value, index) => value.month}
          svg={{ fontSize: 5, fill: '#fff' }}
        />
      </View>
    </View>
  );
}

export default BarGraph;
