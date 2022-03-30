import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { InfoBox } from "../../components/infoBox";
import { useNavigation } from "@react-navigation/native";
export default Profile = () => {
  
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <InfoBox name="Profile Picture" hasImage="true">
      </InfoBox>
      <InfoBox name="Details" onPress={()=> navigation.navigate("Change Information")}>
        <Text style={styles.textDetail}>Đỗ Đức Tâm</Text>
        <Text style={styles.textDetail}>dotam308@gmail.com</Text>
        <Text style={styles.textDetail}>Nam</Text>
        <Text style={styles.textDetail}>0123451234</Text>
        <Text style={styles.textDetail}>30/08/2001</Text>
      </InfoBox>
      <InfoBox name="Password" isPassWord="true" onPress={()=> navigation.navigate("Change Password")}>
        <Text style={styles.textDetail}>********</Text>
      </InfoBox>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 105,
    maxWidth: "40%",
    maxHeight: "60%",
  },
  textDetail: {
    color: "white",
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10
  }
});
