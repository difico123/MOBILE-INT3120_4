import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { InfoBox } from "../../components/infoBox";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../service/UserService";
export default Profile = () => {
  
  const navigation = useNavigation();
  const auth = useSelector((state) => state.authReducers.auth);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const userApi = await UserService.getUser(auth.token);
    setUser(userApi);
  }, []);
  return (
    <View style={styles.container}>
      <InfoBox name="Profile Picture" hasImage="true"></InfoBox>
      <InfoBox
        name="Details"
        onPress={() => navigation.navigate("Change Information")}
      >
        <Text style={styles.textDetail}>{`${user?.first_name} ${user?.last_name}`}</Text>
        <Text style={styles.textDetail}>{user?.email}</Text>
        <Text style={styles.textDetail}>{user?.gender}</Text>
        <Text style={styles.textDetail}>{user?.phone_number}</Text>
        <Text style={styles.textDetail}>{user?.dob}</Text>
      </InfoBox>
      <InfoBox
        name="Password"
        isPassWord="true"
        onPress={() => navigation.navigate("Change Password")}
      >
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
    paddingTop: 10,
  },
});
