import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MAIN_COLOR } from "../common/CommonStyle";

export const SimpleStatistic = ({ number, title }) => (
  <View style={styles.container}>
    <Text style={styles.number}>{number}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
    flex: 1,
  },
  number: {
    fontSize: 25,
    fontWeight: "bold",
  },
  title: {
    color: MAIN_COLOR,
    fontWeight: "bold",
  },
});
