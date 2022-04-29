import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MAIN_COLOR } from "../common/CommonStyle";

export const SimpleStatistic = ({ number, title, onPress }) => (
  <Pressable style={styles.container} onPress={onPress}>
    <Text style={styles.number}>{number}</Text>
    <Text style={styles.title}>{title}</Text>
  </Pressable>
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
