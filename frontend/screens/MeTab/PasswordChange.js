import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Image, TextInput, StyleSheet, Button } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

export const PasswordChange = () => {
  return (
    <View style={styles.main}>
      <CustomInput titleInput="Old Password">****</CustomInput>
      <CustomInput titleInput="New Password"></CustomInput>
      <CustomInput titleInput="Confirm New Password"></CustomInput>
      <CustomButton title="Confirm"></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginLeft: 10,
  }
});
