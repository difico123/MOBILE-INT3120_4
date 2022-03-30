import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
export const InfoChange = () => {
  return (
    <View style={styles.main}>
      <CustomInput titleInput="Họ">Đỗ</CustomInput>
      <CustomInput titleInput="Tên đệm">Đức Tâm</CustomInput>
      <CustomInput titleInput="Email">dotam308@gmail.com</CustomInput>
      <CustomInput titleInput="Giới tính">Nam</CustomInput>
      <CustomInput titleInput="Số điện thoại">0123451234</CustomInput>
      <CustomInput titleInput="Ngày sinh">30/08/2001</CustomInput>
      <CustomButton title="Confirm"></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginLeft: 10,
  },
});
