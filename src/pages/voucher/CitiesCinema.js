import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import { Icon } from "react-native-elements";

import { useTheme } from "@react-navigation/native";
import { AppContext } from '../../context/AppContext';

export default function CitiesCinema() {

  const { colors } = useTheme();
  const { isDarkTheme } = useContext(AppContext);

  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { navigate } = useNavigation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [cityValue, setCityValue] = useState('');
  const [selectCinema, setSelectCinema] = useState({});
  const [citiesCinemas, setCitiesCinemas] = useState("");
  const [cityString, setCityString] = useState(params.cityName || '');

  useEffect(() => {
    const fetchCinemas = async () => {
      const response = await fetch(
        `https://node.clubecerto.com.br/superapp/establishment/geolocation/addresses?page=0&distance=20000&limit=20&category=16&city=${encodeURIComponent(params.cityId)}&state=${encodeURIComponent(params.stateId)}`,
        {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJMdWNhcyBMaXNib2EiLCJjcGYiOiIwODMyODMxMjYzOCIsImVtYWlsIjoiTHVjYXNsaXNib2Ftb3R0YUBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOiIoMzEpIDk3MTIyLTQ1NjYiLCJhY3RpdmUiOnRydWUsImFjdGl2ZUNhc2hiYWNrIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTAyVDEyOjUzOjU5LjAwMFoiLCJjb21wYW5pZXNBcnJheSI6IlsxNiwxNiwxNiwxNl0iLCJtb3RoZXJDYXNoYmFja0NvbXBhbnlJZCI6MTYsInBpeCI6IjA4MzI4MzEyNjM4IiwicGl4VHlwZSI6IkNQRiIsImNpdHlJZCI6bnVsbCwiY29tcGFueSI6MTYsInNlbGVjdGVkQ29tcGFueSI6eyJpZCI6MTYsIm5hbWUiOiJDTFVCRSBDRVJUTyIsImNvZGUiOiJzbHh5UTlFYjE3IiwicG9zaXRpb25DUEYiOiJib3R0b20tbGVmdCIsImNvbXBhbmllc0NvbG9yIjp7InByaW1hcnlDb2xvciI6IiNGRkZGRkYiLCJzZWNvbmRhcnlDb2xvciI6IiMwMDAwMDAiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMDBBMjREIiwiaXRlbXNDb2xvciI6IiNmZmZmZmYifSwiY29tcGFuaWVzSW1hZ2UiOnsiaW1hZ2UiOiJodHRwczovL25vZGUuY2x1YmVjZXJ0by5jb20uYnIvc3VwZXJhcHAvaW1hZ2VzL2NvbXBhbmllcy9icmFuZC9sb2dvU1ZtQlR1SHBKTU9lSUwucG5nIiwiYmFja09mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY3ZTcEwwanpSRGQ5MVl4Zy5wbmciLCJmcm9udE9mQ2FyZCI6Imh0dHBzOi8vbm9kZS5jbHViZWNlcnRvLmNvbS5ici9zdXBlcmFwcC9pbWFnZXMvY29tcGFuaWVzL2NhcmQvY2ZTVm1CVHVIcEpNT2VJTC5wbmcifX0sImlhdCI6MTY4NzI4MTIzMX0.JsueGuP-MEpjG-gK89ceOsUxoScRMFw1qoH2YER8OBg",
        },
      }
    );

    const responseJSON = await response.json();
    console.log(responseJSON);
    setCitiesCinemas(responseJSON);
  };

  
  if(params.cityId && params.stateId) {
    fetchCinemas();
  }
  }, [params.cityId, params.stateId]);


  useEffect(() => {
    if (params) {
      const { item } = params;
      if (item) {
        setCityValue(item.id);
        setStateValue(item.stateId);
      }
    }
  }, [params]);

  useEffect(() => {
    if (params) {
      const { item } = params;
      if (item) {
        setCityString(item.name || item.cityName);
      }
    }
  }, [params]);

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
    placeholderText: {
      flex: 1,
      height: 55,
      backgroundColor: '#fff',
      color: '#00A24D',
      borderRadius: 20,
      fontSize: 13,
      marginLeft: 8,
    },
    allCinemaText: {
      marginLeft: 17,
      marginVertical: 20,
      color: '#00A24D',
      fontWeight: '400',
      fontSize: 15,
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
    cineName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
      color: colors.text
    },
    cineTitle: {
      fontWeight: 'bold',
      fontSize: 13,
      marginBottom: 1,
      color: colors.text
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
      marginVertical: -5,
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
    <View style={{ flex: 1 }}>
      <View style={{ height: 25, backgroundColor: '#00A24D' }}></View>
      <View style={{ backgroundColor: '#00A24D' }}>
        <View style={{marginTop: -45, marginBottom: 50, justifyContent: 'flex-start', alignItems: 'flex-start',}}>
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
              style={styles.placeholderText}
              onPressIn={() => setIsVisibleModal(true)}
              isVisibleModal={isVisibleModal}
              value={cityString}
              placeholder='Localizar cinema'
              placeholderTextColor={'#979797'}
            />
            <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10, }}>
          <Text style={{ color: '#fff', fontWeight: '400' }}>Escolha o seu cinema favorito!</Text>
        </View>
      </View>
      <Text style={styles.allCinemaText}>
        Todos os cinemas (por localização):
      </Text>
      <View style={{ height: '50%', marginLeft: 25, marginRight: 25 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={citiesCinemas}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ width: '100%', marginBottom: 10 }}
              onPress={() => {
                if (selectCinema.name) {
                  setSelectCinema({})
                  return;
                }
                setSelectCinema(item);
              }}
            >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.7 }}>
                  <Text style={styles.cineName}>
                    {item.name}
                  </Text>
                  <Text style={styles.cineTitle}>
                    {item.title} <Text style={{ fontWeight: 'normal', color: '#979797' }}>
                      | {(parseFloat(item.distance)).toFixed(0)}KM</Text></Text>
                  <Text style={{ color: '#979797' }}>{item.address}</Text>
                </View>
                {(selectCinema.name === item.name
                    && selectCinema.title === item.title) && <View style={{ flex: 0.3 }}>
                  <Icon color={"#00A24D"} name="check" style={{ flex: 1, alignItems: "flex-end" }} />
                </View>}
              </View>
              <View style={{ height: 0.7, backgroundColor: '#979797', marginTop: 12, marginBottom: 5 }}></View>
            </TouchableOpacity>
          )}
        />
        <View style={{ height: 10 }}></View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -12 }}>
        <TouchableOpacity
          disabled={!selectCinema.name ? true : false}
          onPress={() => {
            if (!selectCinema.name) {
              return;
            }
            navigate("VoucherCategory", { data: { city: cityValue, cine: selectCinema }});
          }}
          style={!selectCinema.name ? styles.buttonDisabled : styles.button}>
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
