import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import profile from './mock/profileMock';

import { useNavigation, useTheme } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';


export default function ProfileScreen() {

  const navigation = useNavigation();

  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [countdown, setCountdown] = useState(60 * 60);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 0) return prevCountdown - 1; // Decrement countdown
        return 0;
      });
    }, 1000); // Update every second

    return () => clearInterval(timerId);
  }, []);


  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    view: {
      alignItems: 'center',
      justifyContent: 'center',
      top: 50,
      position: 'absolute',
    },
    promotionText: {
      color: colors.text, 
      fontSize: 25,
      fontWeight: '200'
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      top: 130,
      position: 'absolute',
      borderColor: isDarkTheme ? '#979797' : '#000',
      borderWidth: 3
    },
    switchContainer: {
      position: 'absolute',
      top: 275,
      borderColor: '#000', 
      borderWidth: 2,
      padding: 0,
      borderRadius: 20,
    },
    usernameText: {
      color: colors.text,
      fontSize: 20,
      marginVertical: 20
    },
    planText: {
      color: "#00A24D",
      fontSize: 20,
      marginBottom: 30,
      fontWeight: 'bold'
    },
    infoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    infoText: {
      color: colors.text,
      marginBottom: 10,
      fontSize: 16,
      marginLeft: 7,
      fontWeight: '300'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.promotionText}>Promoção X acaba em:</Text>
        <Text style={{fontSize: 20, color: colors.text}}>
          {formatTime(countdown)}
        </Text>
      </View>    
      <Image
        style={styles.profileImage}
        source={require('../../../assets/andre.jpg')}
      />
      <View style={styles.switchContainer}>
        <Switch
            trackColor={{ false: "#000", true: "#00A24D" }}
            thumbColor={isEnabled ? "#000" : "#fff"}
            ios_backgroundColor="#979797"
            onValueChange={(value) => {
              toggleSwitch();
              setIsDarkTheme(value);
            }}
            value={isEnabled}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 190 }}>
        <Text style={ styles.usernameText}>{profile.userName}</Text>
        <Text style={styles.planText}>{profile.plan}</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => navigation.navigate('Info')}
        >
          <Entypo name="bar-graph" size={24} style={{ color: colors.text, marginBottom: 15, }} />
          <Text style={styles.infoText}>
              Informações adicionais
          </Text>
        </TouchableOpacity>
      <Image
        source={require('../../../assets/cine-logo.png')}
        style={{ height: 120, width: 120, marginBottom: -50 }}
      />
      </View>
    </View>
  );
}
