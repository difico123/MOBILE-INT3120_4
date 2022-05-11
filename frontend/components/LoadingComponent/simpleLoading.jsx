import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MAIN_COLOR } from "../common/CommonStyle";

export const SimpleLoading = ({customStyle}) => {
  return (
    <View style={{ ...styles.container, ...customStyle }}>
      <ActivityIndicator size="large" color={MAIN_COLOR} />
    </View>
);;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
