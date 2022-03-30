import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const InfoBox = ({ name, isPassWord, hasImage, onPress, children }) => {
  let boxStyle = styles.box;
  if (isPassWord) boxStyle = styles.box_v2;

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={boxStyle}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{name}</Text>
        <TouchableOpacity>
          <Text
            style={styles.editButton}
            onPress={hasImage ? pickImage : onPress}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      {hasImage && (
        <Image style={styles.avatar} source={require("../assets/avatar.jpg")} />
      )}

      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgb(27,27,27)",
    height: 200,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 5,
  },
  box_v2: {
    backgroundColor: "rgb(27,27,27)",
    height: 100,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 5,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    color: "#3B71F3",
    fontSize: 20,
    fontWeight: "500",
  },
  avatar: {
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 50,
    maxWidth: "40%",
    maxHeight: "60%",
  },
});
