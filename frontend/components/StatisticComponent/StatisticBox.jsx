import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const StatisticBox = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginVertical: 10,
    // marginBottom: 20,
  },
});
