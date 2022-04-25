import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const CustomInfoItem = ({source, info}) => (
  <View style={{ flexDirection: "row" }}>
    <Image
      source={source}
      style={styles.contactIcon}
    ></Image>
    <Text style={styles.contactInfo}>{info}</Text>
  </View>
);

const styles = StyleSheet.create({
  contactInfo: {
    fontSize: 15,
  },
  contactIcon: {
    height: 15,
    width: 15,
    marginRight: 15,
  },
});
