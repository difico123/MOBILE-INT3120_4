import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { color, background } from "../../../theme";

export const RoomItem = ({ onPress, name, image, notseen, room, message, chater }) => {
    return (
        <TouchableOpacity onPress={() => onPress(room, name)}>
            <View style={styles.room}>
                <View style={styles.contentWrap}>
                    <View>
                        <Image style={styles.image} source={{ uri: image }} />
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.txt}>{name}</Text>
                        <Text numberOfLines={1}>
                            {chater}: {message}
                        </Text>
                    </View>
                </View>
                <View style={styles.notseen}>
                    <Text style={styles.num}>{notseen}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    room: {
        elevation: 2,
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: "row",
        overflow: "hidden",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentWrap: {
        flexDirection: "row",
    },
    image: {
        resizeMode: "cover",
        width: 100,
        height: 70,
        borderRadius: 10,
    },
    title: {
        paddingLeft: 10,
        justifyContent: "space-around",
        paddingVertical: 5,
    },
    txt: {
        fontSize: 18,
        fontWeight: "bold",
    },
    notseen: {
        backgroundColor: color.red,
        padding: 5,
        width: 35,
        borderRadius: 25,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    num: {
        color: color.white,
        fontSize: 16,
        fontWeight: "bold",
    },
});
