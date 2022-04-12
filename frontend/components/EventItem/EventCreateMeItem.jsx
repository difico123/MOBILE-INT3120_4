import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { border, color, background } from "../../theme";
const EventCreateMeItem = ({ name }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png" }}
            />
            <Text style={styles.title}>{name}</Text>
        </View>
    );
};

export default EventCreateMeItem;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        height: "100%",
        alignItems: "center",
        borderRadius: 10,
        borderColor: border.black,
        flexDirection: "row",
        overflow: "hidden",
    },
    image: {
        resizeMode: "cover",
        width: "30%",
        borderRadius: 10,
        height: "100%",
        marginLeft: -10,
    },
    title: {
        marginLeft: 10,
        fontWeight: "bold",
    },
});
