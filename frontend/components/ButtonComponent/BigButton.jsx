import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { categories } from "../../screens/EventTab/data/image";
export const BigButton = ({imageName, text}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image style={styles.image} source={categories[imageName]} />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 120,
    width: 120,
    alignItems: "center",
    backgroundColor: "rgb(228,230,235)",
    borderRadius: 10,
  },
  image: {
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 10,
    height: 70,
    width: 70,
    marginVertical: 10,
  },
});
