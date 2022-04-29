import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BORDER_COLOR, MAIN_COLOR } from "../common/CommonStyle";

export const DateCard = ({ item}) => (
  <View style={styles.dateContainer}>
    <Text style={styles.dateText}>{moment(item.start_date).format("DD")}</Text>
    <Text style={styles.monthText}>
      {moment(item.start_date).format("MMMM")}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  dateContainer: {
    position: "absolute",
    borderRadius: 10,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    borderWidth: 1,
    backgroundColor: MAIN_COLOR,
    borderColor: BORDER_COLOR,
    elevation: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  monthText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
