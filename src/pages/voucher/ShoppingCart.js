// Página em que são renderizados cinemas da cidade filtrada

import { View, StyleSheet, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { useState, useEffect } from "react";
import { Feather } from 'react-native-vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 

export default function CitiesCinema() {
  const { params } = useRoute();
  const { navigate } = useNavigation();


  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#00A24D' }}>
        <View
          style={styles.searchInputStyle}
        >
            <EvilIcons name="location" size={40}  style={{color: '#00A24D'}}/>
            <TextInput
              style={{ 
                flex: 1,
                height: 55,
                backgroundColor: '#fff',
                color: '#e6e6e6',
                borderRadius: 20,
                fontSize: 13,
                marginLeft: 8,
              }}
              onPressIn={() => setIsVisibleModal(true)}
              placeholder='Localizar cinema'
              placeholderTextColor={'#979797'}
            />
            <Feather name="search" size={30}  style={{color: '#00A24D'}}/>
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
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
});
