import React from "react";
import { StyleSheet, View } from "react-native";

export const VerticalLine = () => <View style={styles.verticalLine}></View>;
const styles = StyleSheet.create({
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});
