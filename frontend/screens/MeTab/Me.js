import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomTextBox from "../../components/CustomTextBox";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/actions/auth_actions";
const Me = () => {
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(setLogout());
  };
  return (
    <View style={styles.nav}>
      <View style={styles.top}>
        <Image
          style={styles.avatar}
          source={require("../../assets/avatar.jpg")}
        />
        <TouchableOpacity>
          <Icon style={styles.camera} name="camera" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <TouchableOpacity style={styles.content}>
          <CustomTextBox text={"Thông tin cá nhân"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.content}>
          <CustomTextBox text={"Check my calendar"} />
        </TouchableOpacity>
      </View>
      
      <Button onPress={onSignOut} title="Sign Out" />
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    marginTop: 20,
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    marginTop: 20,
    marginLeft: 80,
    textAlign: "center",
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 100,
    marginTop: 20,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  camera: {
    color: "black",
    fontSize: 20,
  },
  main: {
    backgroundColor: "#C4C4C4",
    marginLeft: 15,
    marginRight: 15,
  },
  content: {
    marginHorizontal: 10,
  },
});
export default Me;
