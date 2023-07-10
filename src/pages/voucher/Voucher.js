import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, StyleSheet, } from "react-native";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import ModalSearchCities from "../../components/ModalSearchCities";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";

const partnerURL = 'https://node.clubecerto.com.br/superapp/establishment/search?limit=20&page=0&category=16';

export default function Voucher() {

  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);

  const [cines, setCinePartners] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [dataCities, setDataCities] = useState([]);

  
  async function getPartners() {
    try {
      const response = await fetch(partnerURL,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJMdWNhcyBMaXNib2EiLCJjcGYiOiIwODMyODMxMjYzOCIsImVtYWlsIjoiTHVjYXNsaXNib2Ftb3R0YUBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOiIoMzEpIDk3MTIyLTQ1NjYiLCJhY3RpdmUiOnRydWUsImFjdGl2ZUNhc2hiYWNrIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTAyVDEyOjUzOjU5LjAwMFoiLCJjb21wYW5pZXNBcnJheSI6IlsxNiwxNiwxNiwxNl0iLCJtb3RoZXJDYXNoYmFja0NvbXBhbnlJZCI6MTYsInBpeCI6IjA4MzI4MzEyNjM4IiwicGl4VHlwZSI6IkNQRiIsImNpdHlJZCI6bnVsbCwiY29tcGFueSI6MTYsInNlbGVjdGVkQ29tcGFueSI6eyJpZCI6MTYsIm5hbWUiOiJDTFVCRSBDRVJUTyIsImNvZGUiOiJzbHh5UTlFYjE3IiwicG9zaXRpb25DUEYiOiJib3R0b20tbGVmdCIsImNvbXBhbmllc0NvbG9yIjp7InByaW1hcnlDb2xvciI6IiNGRkZGRkYiLCJzZWNvbmRhcnlDb2xvciI6IiMwMDAwMDAiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMDBBMjREIiwiaXRlbXNDb2xvciI6IiNmZmZmZmYifSwiY29tcGFuaWVzSW1hZ2UiOnsiaW1hZ2UiOiJodHRwczovL25vZGUuY2x1YmVjZXJ0by5jb20uYnIvc3VwZXJhcHAvaW1hZ2VzL2NvbXBhbmllcy9icmFuZC9sb2dvU1ZtQlR1SHBKTU9lSUwucG5nIiwiYmFja09mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY3ZTcEwwanpSRGQ5MVl4Zy5wbmciLCJmcm9udE9mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY2ZTVm1CVHVIcEpNT2VJTC5wbmcifX0sImlhdCI6MTY4NzI4MTIzMX0.JsueGuP-MEpjG-gK89ceOsUxoScRMFw1qoH2YER8OBg",
          },
        });
      const data = await response.json();
  
      setCinePartners(data);
    } catch (error) {
      console.error('Erro ao buscar os parceiros:', error);
    }
  }
    useEffect (() => {
      getPartners();
    }, [])

    const partners = [];
  
    // Adicionar item vazio se o número de parceiros for ímpar
    if (partners.length % 2 !== 0) {
      partners.push({ id: 'empty' });
    }

  async function getCinemas() {
    const response = await fetch(
      "https://node.clubecerto.com.br/superapp/establishment/geolocation/addresses?category=16",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJMdWNhcyBMaXNib2EiLCJjcGYiOiIwODMyODMxMjYzOCIsImVtYWlsIjoiTHVjYXNsaXNib2Ftb3R0YUBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOiIoMzEpIDk3MTIyLTQ1NjYiLCJhY3RpdmUiOnRydWUsImFjdGl2ZUNhc2hiYWNrIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTAyVDEyOjUzOjU5LjAwMFoiLCJjb21wYW5pZXNBcnJheSI6IlsxNiwxNiwxNiwxNl0iLCJtb3RoZXJDYXNoYmFja0NvbXBhbnlJZCI6MTYsInBpeCI6IjA4MzI4MzEyNjM4IiwicGl4VHlwZSI6IkNQRiIsImNpdHlJZCI6bnVsbCwiY29tcGFueSI6MTYsInNlbGVjdGVkQ29tcGFueSI6eyJpZCI6MTYsIm5hbWUiOiJDTFVCRSBDRVJUTyIsImNvZGUiOiJzbHh5UTlFYjE3IiwicG9zaXRpb25DUEYiOiJib3R0b20tbGVmdCIsImNvbXBhbmllc0NvbG9yIjp7InByaW1hcnlDb2xvciI6IiNGRkZGRkYiLCJzZWNvbmRhcnlDb2xvciI6IiMwMDAwMDAiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMDBBMjREIiwiaXRlbXNDb2xvciI6IiNmZmZmZmYifSwiY29tcGFuaWVzSW1hZ2UiOnsiaW1hZ2UiOiJodHRwczovL25vZGUuY2x1YmVjZXJ0by5jb20uYnIvc3VwZXJhcHAvaW1hZ2VzL2NvbXBhbmllcy9icmFuZC9sb2dvU1ZtQlR1SHBKTU9lSUwucG5nIiwiYmFja09mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY3ZTcEwwanpSRGQ5MVl4Zy5wbmciLCJmcm9udE9mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY2ZTVm1CVHVIcEpNT2VJTC5wbmcifX0sImlhdCI6MTY4NzI4MTIzMX0.JsueGuP-MEpjG-gK89ceOsUxoScRMFw1qoH2YER8OBg",
        },
      }
    );

    let notFilteredCities = [];

    for (let index = 1; index < 27; index++) {
      const responseCities = await fetch(
        "https://node.clubecerto.com.br/superapp/locations/cities/" + index
      );

      const resultresponseCities = await responseCities.json();

      notFilteredCities = notFilteredCities.concat(resultresponseCities);
    }
    setDataCities(notFilteredCities);
  }

  useEffect(() => {
    getCinemas();
  }, []);

  const styles = StyleSheet.create({
    searchInputStyle:{
      marginHorizontal: 10,
      marginVertical: 25,
      marginBottom: 15,
      overflow: 'hidden',
      flexDirection: 'row',
      borderWidth: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
      borderRadius: 20,
      backgroundColor: isDarkTheme ? '#979797' : '#fff',
      borderColor: isDarkTheme ? '#979797' : '#fff',
    },
    inputText: {
      flex: 1,
      height: 55,
      backgroundColor: isDarkTheme ? '#979797' : '#fff',
      color: '#e6e6e6',
      borderRadius: 20,
      fontSize: 13,
      marginLeft: 8,
    },
    chooseCinemaContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    partnerText: {
      fontSize: 16,
      marginBottom: 10,
      marginTop: 5,
      marginLeft: 15,
      fontWeight: '400',
      color: colors.text
    },
    flatlistView: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    shadowBox:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      marginBottom: 5,
      width: 105,
      height: 70,
      marginTop: 6,
      borderRadius: 20,
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
    imagePartner: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    }
  });
  

  return (
    <View style={{ flex: 1, backgroundColor: colors.background,}}>
      <View style={{ height: 25, backgroundColor: isDarkTheme ? colors.background : '#00A24D' }}></View>
      <View style={{ backgroundColor: isDarkTheme ? colors.background : '#00A24D' }}>
        <View style={styles.searchInputStyle}>
          <EvilIcons name="location" size={40}  style={{ color: isDarkTheme ? '#fff' : '#00A24D' }}/>
          <TextInput
            style={styles.inputText}
            onPressIn={() => setIsVisibleModal(true)}
            placeholder='Localizar cinema'
            placeholderTextColor={ isDarkTheme ? '#fff' : '#979797' }
          />
          <Feather name="search" size={30}  style={{ color: isDarkTheme ? '#fff' : '#00A24D' }}/>
        </View>
        <View style={styles.chooseCinemaContainer}>
          <Text style={{ color: '#fff', fontWeight: '300' }}>Escolha o seu cinema favorito!</Text>
        </View>
      </View>
      <View style={{backgroundColor: isDarkTheme ? '#979797' : '#E6E6e6', width: '100%'}}>
        <Text style={styles.partnerText}>
          Redes Parceiras
        </Text>
      </View>
      <View style={{backgroundColor: colors.background, marginTop: 10}}>
        <View style={styles.flatlistView}>
          <FlatList
            keyExtractor={(item) => item.id}
            numColumns={2}
            data={cines}
            renderItem={({ item }) => {
              if (item.id === 'empty') {
                // Renderizar um item vazio
                return <View style={{ flex: 1, margin: 10, }} />;
              }

              return (
                <View>
                    <View style={styles.shadowBox}>
                      <Image
                        source={{ uri: item.establishmentImage.image }}
                        style={styles.imagePartner}   
                      />
                    </View> 
                </View>     
              );
            }}
          />
        </View>
        <View style={{ height: 75, backgroundColor: colors.background }}></View>
      </View>
      <ModalSearchCities
        cinemas={dataCities}
        setIsVisibleModal={setIsVisibleModal}
        isVisibleModal={isVisibleModal}
      />
    </View>
  );
}
