import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { useTheme } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';

export default function ColorChangingButton({ buttonText, isPressed, onPress }) {

  const { colors } = useTheme();
  const { isDarkTheme } = useContext(AppContext);

  let textColor;
  if (isDarkTheme) {
    textColor = isPressed ? '#00A24D' : '#fff';
  } else {
    textColor = isPressed ? '#00A24D' : '#000';
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{ color: textColor, fontWeight: 'bold' }}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 0,
    backgroundColor: 'transparent',
  }, 
});
