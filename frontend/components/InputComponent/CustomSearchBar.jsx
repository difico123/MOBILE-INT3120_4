import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const CusTomSearchBar = ({ value, setValue, onPress, ...props }) => {
    return (
        <View style={styles.container}>
            <TextInput {...props} style={styles.input} onChangeText={setValue} value={value} />
            <TouchableOpacity onPress={onPress}>
                <Icon name="search" style={styles.icon} type="font-awesome"></Icon>
            </TouchableOpacity>
        </View>
    );
};

export default CusTomSearchBar;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        margin: "auto",
    },
    icon: {
        width: 30,
        right: 0,
    },
    input: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 10,
        width: "92%",
    },
});
