import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export const EventInfo = ({
  styleBox,
  styleInfo,
  info,
  source,
  host,
  onPress,
}) => {
  const content =
    host ? (
      <Text>
        Event by{" "}
        <Text
          style={{ fontWeight: "bold" }}
          onPress={onPress}
        >
          {info}
        </Text>
      </Text>
    ) : (
      <Text>{info}</Text>
    );
  return (
    <View style={styleBox ?? styles.contentBox}>
      <Image source={source} style={styles.icon}></Image>
      <Text style={styleInfo ?? styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentBox: {
    marginLeft: 10,
    flexDirection: "row",
    padding: 10,
    flex: 1,
  },
  titleContent: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    flex: 0.1,
  },
  content: {
    marginLeft: "auto",
    // color: "#FFBF13",
    color: "black",
    // fontWeight: "700",
    fontSize: 18,
    flex: 0.9,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
