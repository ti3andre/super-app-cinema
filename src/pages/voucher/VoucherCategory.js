import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import { useTheme } from "@react-navigation/native";
import { AppContext } from '../../context/AppContext';

import mockCategory from './mock/categoryVourcher.mock';

export default function VoucherCategory() {

  const { colors } = useTheme();
  const { isDarkTheme } = useContext(AppContext);

  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { navigate } = useNavigation();
  const [cineValue, setCineValue] = useState('');
  const [categoryList, setCategoryList] = useState([])
  const [totalValue, setTotalValue] = useState('0,00');

  useEffect(() => {
    if (params) {
      const { data } = params;
      if (data && data.cine) {
        setCineValue(`${ data.cine.name} - ${ data.cine.title}`);
      }
    }
    setCategoryList(mockCategory.map(item => ({ ...item, selectedQuantity: 0 })));
  }, [params]);


  // Add items to the category
  const moreItems = (item) => {
    setCategoryList(prevList => {
      return prevList.map(category => {
        if (category.id === item.id) {
          return { ...category, selectedQuantity: category.selectedQuantity + 1 };
        }
        return category;
      });
    });
  }

  // Subtract items from the category
  const lessItems = (item) => {
    setCategoryList(prevList => {
      return prevList.map(category => {
        if (category.id === item.id && category.selectedQuantity > 0) {
          return { ...category, selectedQuantity: category.selectedQuantity - 1 };
        }
        return category;
      });
    });
  };

  // Update total value when categoryList changes
  useEffect(() => {
    updateTotalValue();
  }, [categoryList]);

  const updateTotalValue = () => {
    let sum = categoryList.reduce((total, item) => {
      return total + (item.value * item.selectedQuantity);
    }, 0);

    setTotalValue(sum.toFixed(2));
  }

  // Funcao de infos passadas 
  const proceedToComboCategory = () => {
    const selectedVouchers = categoryList.filter(item => item.selectedQuantity > 0);
    
    navigate("ComboCategory", { selectedVouchers: selectedVouchers, cineValue: cineValue });
  };

  const styles = StyleSheet.create({
    headerBack: {
      marginTop: -45,
      marginBottom: 50,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    downHeaderContainer: {
      marginLeft: 20,
      paddingTop: 15,
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative'
    },
    imageLogo: {
      width: 120,
      height: 120,
      position: 'absolute',
      marginLeft: -20
    },
    voucherText: {
      fontSize: 20,
      marginBottom: 7,
      marginLeft: 90,
      color: '#00A24D',
      fontWeight: '300'
    },
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
    voucherContainer: {
      padding: 25,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      justifyContent: 'space-between'
    },
    button: {
      width: '50%',
      height: 50,
      marginHorizontal: 35,
      marginVertical: -5,
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
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      backgroundColor: '#A9A9A9',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? colors.background : '#E9E9E9' }}>
      <View style={{ backgroundColor: '#00A24D', height: 25 }}></View>
      <View style={{ backgroundColor: '#00A24D', height: 130 }}>
        <View style={styles.headerBack}>
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
        <View style={styles.downHeaderContainer}>
          <Image
            source={require('../../../assets/cine-logo.png')}
            style={styles.imageLogo} 
          />
          <Text style={styles.voucherText}>
            Voucher
          </Text>
        </View>
      </View>
      <View style={{ height: '50%', marginLeft: 25, marginRight: 25 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={categoryList}
          renderItem={({ item }) => (
            <>
              <View style={styles.voucherContainer}>
                <View style={{ flex: .7}}>
                  <Text style={{ color: '#A9A9A9', fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ color: '#A9A9A9', fontSize: 18 }}>{`R$ ${item.value}`}</Text>
                </View>
                <View >
                  <View
                    style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => lessItems(item)}
                      style={{
                        padding: 10,
                        backgroundColor: '#FFF',
                        borderTopStartRadius: 5,
                        borderBottomStartRadius: 5,
                      }}
                    >
                      <Text style={{ color: 'red' }}>-</Text>
                    </TouchableOpacity>
                    <View 
                      style={{
                        backgroundColor: '#FFF', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: 37,
                        height: 37
                      }}
                    >
                      <Text>{item.selectedQuantity}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => moreItems(item)}
                      style={{
                        padding: 10,
                        backgroundColor: '#FFF',
                        borderTopEndRadius: 5,
                        borderBottomEndRadius: 5
                      }}>
                      <Text style={{ color: '#00A24D' }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ height: 0.5, backgroundColor: '#979797' }} />
            </>
          )}
        />
        <View style={{ height: 10 }}></View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity
          onPress={proceedToComboCategory}        
          style={styles.button}>
          <Text style={styles.buttonText}>{`Prosseguir ${totalValue}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
