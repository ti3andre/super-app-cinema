import { View, Text, Image, FlatList, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import mockHistory from './mock/history.mock';
import ModalSearch from '../../components/ModalSearch';
import { Feather } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import { Icon } from 'react-native-elements';

import { useTheme } from "@react-navigation/native";
import { AppContext } from '../../context/AppContext';

export default function BuyHistory() {

  const { colors } = useTheme();
  const { isDarkTheme } = useContext(AppContext);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ product: '', code: '', expamd: false });

  const styles = StyleSheet.create({
    inputText: {
      flex: 1,
      height: 50,
      backgroundColor: '#fff',
      color: '#fff',
      borderRadius: 20,
      fontSize: 16,
      marginLeft: 15,
    },
    solicitedText: {
      fontSize: 20,
      marginBottom: 7,
      color: colors.text,
      fontWeight: '200'
    },
    search: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    viewImage: {
      
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 5,
        width: 105,
        height: 70,
        marginTop: 6,
        borderRadius: 15,
        backgroundColor: '#fff',
        borderRadius: '13%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    image: { width: '100%',
    height: '100%',
    borderRadius: 12,
    },
    textLabelBold: {
      color: '#979797'
    },
    textLabel: {
      color: '#A3A3A3',
      marginTop: 5,
    }, 
    viewData: {
    },
    containerVoucher: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    voucherView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    voucherViewBottom: {
      paddingLeft: 15,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    textLabelIcon: {
      color: '#A3A3A3',
      width: '40%',
      marginLeft: 5
    },
    textLabelExpanded: {
      color: '#A3A3A3',
    },
    searchInputStyle:{
      marginHorizontal: 15,
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
  });  

  return (
    <View style={{ flex: 1 }}>
      <View
        style={styles.searchInputStyle}
      >
        <TextInput
          style={styles.inputText}
          onPressIn={() => setIsVisibleModal(true)}
          placeholder='Pesquisar'
          placeholderTextColor={'#979797'}
        />
        <Pressable onPress={() => navigate('')}>
          <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </Pressable>
      </View>
      <View style={{ height: 1, width: '100%', backgroundColor: isDarkTheme ? colors.background : '#fff', alignItems: 'center',  justifyContent: 'center'}}/>
      
      {/* Modal para abertura de filtro de busca de filmes */}

      <ModalSearch
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
      <View style={{marginLeft: 20, marginTop: 7,}}>
        <Text style={styles.solicitedText}>Vouchers solicitados:</Text>
      </View>
      <View style={{ backgroundColor: isDarkTheme ? '#979797' : '#fff', height: 1, width: '100%', marginBottom: 20,}}></View>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={mockHistory}
          renderItem={({ item }) => (
            <View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 15,
              }}>
                <View style={styles.viewImage}>
                  <Image source={{ uri: item.establishment_image }} style={styles.image} />
                </View>  
                <View style={styles.viewData}>
                  <Text style={styles.textLabelBold}>{ `Código: ${item.code}` }</Text>
                  <Text style={styles.textLabel}>{ `Data: ${item.date}` }</Text>
                  <View style={styles.containerVoucher}>
                    {item.voucher && 
                      <TouchableOpacity onPress={() => {
                        if (selectedProduct 
                          && selectedProduct.code === item.code 
                          && selectedProduct.product === 'voucher'
                          && selectedProduct.expamd) {
                          setSelectedProduct({
                            code: '',
                            expamd: false,
                            product: ''
                          })
                          return;
                        }

                        setSelectedProduct({
                          code: item.code,
                          expamd: true,
                          product: 'voucher'
                        })
                      }} style={styles.voucherView}>
                        <Icon color={"#00A24D"} type="material-community" name='ticket-confirmation-outline' />
                        <Text style={styles.textLabelIcon}>{ `${item.voucher.length} vouchers` }</Text>
                        <Icon color={"#00A24D"} type="material-community" name="menu-down" />
                      </TouchableOpacity>
                    }
                    {(selectedProduct.product === 'voucher'
                      && selectedProduct.code === item.code 
                      && selectedProduct.expamd) &&
                      <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        {item.voucher.map((v, index) => <Text key={index} style={styles.textLabel}>{`Voucher #${v.code}`}</Text>)}
                      </View>
                    }
                  </View>
                  <View style={styles.containerVoucher}>
                    {item.combo &&
                      <TouchableOpacity onPress={() => {
                        if (selectedProduct 
                          && selectedProduct.code === item.code 
                          && selectedProduct.product === 'combo'
                          && selectedProduct.expamd) {
                          setSelectedProduct({
                            code: '',
                            expamd: false,
                            product: ''
                          })
                          return;
                        }

                        setSelectedProduct({
                          code: item.code,
                          expamd: true,
                          product: 'combo'
                        })
                      }} style={styles.voucherView}>
                        <Icon color={"#00A24D"} type="material-community" name='popcorn' />
                        <Text style={styles.textLabelIcon}>{ `${item.combo.length} combos` }</Text>
                        <Icon color={"#00A24D"} type="material-community" name="menu-down" style={{ flex: 1, alignItems: "flex-end" }} />
                      </TouchableOpacity>
                    }
                    {(selectedProduct.product === 'combo'
                      && selectedProduct.code === item.code 
                      && selectedProduct.expamd) &&
                      <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        {item.combo.map((v, index) => <Text key={index} style={styles.textLabel}>{`Combo #${v.code}`}</Text>)}
                      </View>
                    }
                  </View>
                  <Text style={styles.textLabel}>{ `Total: ${item.total}` }</Text>
                </View>
              </View>
              <View style={{ height: 1, backgroundColor: isDarkTheme ? '#979797' : '#fff', width: '100%', marginTop: 10 }}></View>
            </View>
          )}
        />   
      </View>
      <View style={{ height: 80 }}></View>
    </View>
  );
}
