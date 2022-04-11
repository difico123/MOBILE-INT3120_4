import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const EventInfo = ({ styleBox, styleTitle, title, styleInfo, info }) => {
  return (
    <View style={styleBox ?? styles.contentBox}>
      <Text style={styleTitle ?? styles.titleContent}>{title}</Text>
      <Text style={styleInfo ?? styles.content}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentBox: {
    marginLeft: 10,
    flexDirection: "row",
    padding: 10,
  },
  titleContent: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  content: {
    marginLeft: "auto",
    color: "#FFBF13",
    fontWeight: "bold",
    fontSize: 18,
  },
});
