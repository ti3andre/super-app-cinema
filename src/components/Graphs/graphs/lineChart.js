import React, { useState, useEffect, } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { AntDesign } from '@expo/vector-icons'; 
import { lineData } from '../mock/graphMock';

import { useTheme } from '@react-navigation/native';

function LineGraph() {

  const { colors } = useTheme();
 

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2); // Inicia com 2023 selecionado
  const [cupomData, setCupomData] = useState(lineData[0].map(data => data.cupom));
  const [dataMin, setDataMin] = useState(Math.min(...cupomData));
  const [dataMax, setDataMax] = useState(Math.max(...cupomData));

  useEffect(() => {
    const newCupomData = lineData[selectedYear].map(data => data.cupom);
    setCupomData(newCupomData);
    setDataMin(Math.min(...newCupomData));
    setDataMax(Math.max(...newCupomData));
  }, [selectedYear]);

  return (
    <View>
      <Text
        style={{
          color: colors.text,
          marginTop: 30,
          marginLeft: 40,
          fontSize: 16,
          fontWeight: '200'
        }}
      >
        Quantidade de Cupons adquiridos
      </Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 10,
          fontWeight: '200',
          marginLeft: 40
        }}
      >
          {'(Base anual)'}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            height: 220,
            width: 250,
            flexDirection: 'row',
            padding: 20,
            marginRight: 130
          }}
        >
          <YAxis
            data={cupomData}
            style={{ marginBottom: 27 }}
            contentInset={{ top: 20, bottom: 10 }}
            svg={{
                stroke: '#979797',
                fill: '#979797',
                fontSize: 10,
                fontWeight: '100'
            }}
            numberOfTicks={dataMax - dataMin + 1}
            formatLabel={(value) => `${value}`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
                style={{ flex: 1, marginBottom: 10 }}
                data={cupomData}
                yMax={dataMax}
                yMin={dataMin}
                svg={{ stroke: '#00A24D', strokeWidth: 5 }}
                contentInset={{ top: 20, bottom: 10 }}
            >
                <Grid
                    svg={{ stroke: '#979797', }}
                    contentInset={{ top: 20, bottom: 10 }}
                />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: 20 }}
              data={cupomData}
              formatLabel={(value, index) => index + 1}
              contentInset={{ left: 10, right: 10, top: 10, bottom: 0 }}
              svg={{ fontSize: 10, fill: '#979797' }}
            />
          </View>
        </View>

        {/* Modal de seleção do ano */}

        <View style={{ marginTop: 20, marginLeft: 0 }}>
          <TouchableOpacity
            style={{ top: 10, right: 11, position: 'absolute', }}
            onPress={() => setModalVisible(true)}
        
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: '300',
                  marginBottom: 1,
                  marginTop: 10
                }}
              >
                Selecione o ano
              </Text>
              <AntDesign
                name="down"
                size={16} 
                style={{
                  color: colors.text,
                  marginLeft: 3,
                  marginTop: 10
                }}
              />
            </View>
          </TouchableOpacity>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: colors.background,
                    padding: 18,
                    borderRadius: 10,
                    marginLeft: 235,
                    marginTop: 305,
                    borderWidth: 0.5,
                    borderColor: colors.text
                  }}
                  onPress={() => {}} // Vazio para evitar que a pressão seja propagada para o pai
                >
                  <TouchableOpacity onPress={() => { setSelectedYear(0); setModalVisible(false); }}>
                      <Text style={{ color: colors.text, marginBottom: 10 }}>2021</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setSelectedYear(1); setModalVisible(false); }}>
                      <Text style={{ color: colors.text, marginBottom: 10 }}>2022</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setSelectedYear(2); setModalVisible(false); }}>
                      <Text style={{ color: colors.text }}>2023</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </View>
  );
}

export default LineGraph;
