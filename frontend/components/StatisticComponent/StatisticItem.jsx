import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HorizontalLine } from "../common/HorizontalLine";

export const StatisticItem = ({ title, children, touchable, onPress }) => {
  return (
    <View>
      {touchable ? (
        <Pressable style={styles.container} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
          {children}
        </Pressable>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    height: 30,
  },
  title: {
    marginTop: 10,
  },
});
