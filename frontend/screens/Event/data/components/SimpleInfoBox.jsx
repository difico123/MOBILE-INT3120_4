import { StyleSheet, View } from "react-native";
import { CustomInfoItem } from "./CustomInfoItem";
import React from "react";

export const SimpleInfoBox = ({host}) => (
  <View style={styles.contact}>
    <CustomInfoItem
      source={require("../../data/image/action/phone-call.png")}
      info={host.phone_number}
    ></CustomInfoItem>
    <CustomInfoItem
      source={require("../../data/image/action/gmail.png")}
      info={host.email}
    ></CustomInfoItem>
  </View>
);
const styles = StyleSheet.create({
    contact: {
        alignItems: "center"
    }
})
