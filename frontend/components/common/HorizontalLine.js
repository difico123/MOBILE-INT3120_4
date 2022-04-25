import React from "react";
import { StyleSheet, View } from "react-native";

export const HorizontalLine = () => <View style={styles.horizontalLine}></View>;

const styles = StyleSheet.create({
  horizontalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#909090",
    marginVertical: 15
  },
});
