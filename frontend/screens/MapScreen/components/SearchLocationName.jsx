import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export const SearchLocationName = ({ name, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.content}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    fontSize: 12,
  },
});
