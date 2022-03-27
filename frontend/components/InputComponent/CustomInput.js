import { View, Text, TextInput, StyleSheet, width, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;

const CustomInput = ({ style, icon, value, setValue, onPress, iconRight, ...props }) => {
    let iconInput = !icon ? "" : <Icon {...icon} />;
    let icon2 =
        props.placeholder !== "Password" ? (
            ""
        ) : (
            <TouchableOpacity onPress={onPress}>
                <Icon {...iconRight} />
            </TouchableOpacity>
        );

    return (
        <View style={[styles.container, style]}>
            <Text>{iconInput}</Text>
            <TextInput style={styles.input} value={value} onChangeText={setValue} {...props} />
            <Text style={styles.iconEye}>{icon2}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: windowWidth * 0.9,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    input: {
        marginLeft: 10,
        width: "100%",
        height: "100%",
    },
    iconEye: {
        position: "absolute",
        right: 10,
    },
});
export default CustomInput;
