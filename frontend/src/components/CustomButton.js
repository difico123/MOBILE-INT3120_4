/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type = 'primary', bgColor, ftColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`color_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          ftColor ? {color: ftColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  color_primary: {
    backgroundColor: '#3B71F3',
  },
  text_primary: {
    color: '#FFFFFF',
  },
  color_tertiary: {
    backgroundColor: 'transparen',
  },
  text_tertiary: {
    color: '#000000',
  },
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
