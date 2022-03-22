import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CommonStyle, { BORDER_COLOR } from "../common/CommonStyle";

const EventPostBtn = ({ title, iconName, bgColor, text }) => {
    return (
        <View style={[styles.btnContainer, { backgroundColor: bgColor || "#D8BBBB" }]}>
            <View style={styles.option}>
                <Text style={styles.title}>{title}</Text>
                <MaterialCommunityIcons size={30} style={[styles.icon]} name={iconName} color="black" />
            </View>
            <View style={styles.selected}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
};

export default EventPostBtn;

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
    },
    selected: {
        flex: 1,
        paddingHorizontal: 10,
    },
    text: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    option: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F3E1E1",
        height: "100%",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    icon: {
        paddingHorizontal: 10,
    },
});
