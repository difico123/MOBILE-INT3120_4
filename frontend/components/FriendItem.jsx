import React from "react";
import { View, StyleSheet, Text, Image,TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
export const FriendItem = ({ name, avatar, onPress }) => {
  const avatarSource = avatar.includes("http") ? {uri: avatar} : require("../assets/avatar-default-icon.png");
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          source={avatarSource}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  main: {
    height: 50,
    width: "80%",
    paddingLeft: 10,
    paddingTop: "auto",
    flexDirection: "row",
    marginLeft: 10
  },
  avatar: {
    paddingBottom: 10,
  },
  name: {
    paddingVertical: 7
  }
});
