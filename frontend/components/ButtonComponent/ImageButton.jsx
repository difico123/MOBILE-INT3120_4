import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export const ImageButton = ({ source }) => {
  return (
    <TouchableOpacity>
      <Image style={styles.action} source={source} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  action: {
    maxHeight: 50,
    maxWidth: 50,
    marginHorizontal: 15,
  },
});
