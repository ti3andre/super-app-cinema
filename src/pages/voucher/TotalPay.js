import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import { useTheme } from "@react-navigation/native";
import { AppContext } from '../../context/AppContext';

export default function TotalPay() {

  const { colors } = useTheme();
  const { isDarkTheme } = useContext(AppContext);
  
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { navigate } = useNavigation();
  const [cineValue, setCineValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalValue, setTotalValue] = useState('0,00');

  // Recebendo dados dos voucher e combos solicitados
  useEffect(() => {
    if (params) {
      const { selectedItems } = params;
      setSelectedItems(selectedItems);
    }
  }, [params]);

  // 
  useEffect(() => {
    let total = 0;
    if (selectedItems) {
      total = selectedItems
      .reduce((accumulator, item) => accumulator + (item.value * item.selectedQuantity), 0);
    }
    setTotalValue(total.toFixed(2));
  }, [selectedItems]);

  useEffect(() => {
    if (params && params.cineValue) {
      setCineValue(params.cineValue);
    }
  }, [params]);

  const proceedToPayment = () => {
    navigate("TotalPay");
  }

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? colors.background : '#E9E9E9' }}>
      <View style={{ backgroundColor: '#00A24D', height: 25 }}></View>
      <View style={{ backgroundColor: '#00A24D', height: 130 }}>
        <View style={{
          marginTop: -45,
          marginBottom: 50,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
          <Pressable
            onPress={goBack}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={30} color="#fff" />
          </Pressable>
        </View>
        <View
          style={styles.searchInputStyle}
        >
            <EvilIcons name="location" size={40}  style={{color: '#00A24D'}}/>
            <TextInput
              style={styles.inputText}
              value={cineValue}
              placeholder='Localizar cinema'
              placeholderTextColor={'#979797'}
            />
            <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </View>
      </View> 
      <View
        style={{ backgroundColor: '#E1E1E1' }}
      >
        <View style={styles.downHeader}>
          
          <Image
            source={require('../../../assets/cine-logo.png')}
            style={styles.logoImage} 
          />
          <Text
            style={styles.buyText}
          >
            Sua compra
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id.toString()}_${index}`}
          data={selectedItems}
          renderItem={({ item }) => (
            <View>
              <View style={{ padding: 25, flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
                <View style={{ flex: .7}}>
                  <Text style={{ color: '#A9A9A9', fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ color: '#A9A9A9', fontSize: 18 }}>{`R$ ${item.value * item.selectedQuantity}`}</Text>
                </View>
                <View
                  style={{
                    flex: .3,
                    flexDirection: "row",
                    alignItems: 'center',
                    height: 40,
                    width: 80,
                    justifyContent: 'space-between'
                  }}
                >
                  <View></View>
                  <Text style={{padding: 10, backgroundColor: '#FFF', }}>{item.selectedQuantity}</Text>
                </View>
              </View>
              <View style={{ height:0.5, backgroundColor: '#a9a9a9' }}></View>
            </View>
          )}     
        />
        <View style={{ height: 130 }}></View>
      </View>
      
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={proceedToPayment} style={styles.button}>
          <Text style={styles.buttonText}>{`Pagamento: R$ ${totalValue}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    zIndex: 100,
    top: 50,
    marginBottom: 12,
  },
  inputText: {
    flex: 1,
    height: 55,
    backgroundColor: '#fff',
    color: '#00A24D',
    borderRadius: 20,
    fontSize: 13,
    marginLeft: 8,
  },
  downHeader: {
    marginLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  logoImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    marginLeft: -20
  },
  buyText: {
    fontSize: 20,
    marginBottom: 7,
    marginLeft: 90,
    color: '#00A24D',
    fontWeight: '300'
  },
  searchInputStyle:{
    marginHorizontal: 10,
    marginVertical: 35,
    marginBottom: 20,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  selectedCinema: {
    backgroundColor: '#00A24D',
  },
  button: {
    width: '75%',
    height: 50,
    marginHorizontal: 35,
    marginVertical: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#00A24D',
  },
  buttonDisabled: {
    width: '50%',
    height: 50,
    marginHorizontal: 35,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginLeft: 40,
    marginTop: 520
  },
});
