import { StyleSheet, Text, View, Image } from "react-native";
import React, { memo } from "react";
import { color } from "../../../theme";
export const ChatItem = memo(({ chat, image, name, me }) => {
    return (
        <View style={styles.container}>
            {!me ? (
                <View style={styles.other}>
                    <View style={styles.imageWrap}>
                        <Image style={styles.image} source={{ uri: image }} />
                    </View>
                    <View style={styles.chatWrap}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.otherTxt}>{chat}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.me}>
                    <View style={styles.chat}>
                        <Text style={styles.meTxt}>{chat}</Text>
                    </View>
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    other: {
        flexDirection: "row",
    },
    me: {
        alignItems: "flex-end",
    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
    },
    chat: {
        backgroundColor: color.blueDark,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        width: "65%",
    },
    meTxt: {
        color: color.white,
        fontSize: 16,
    },
    otherTxt: {
        fontSize: 16,
    },
    chatWrap: {
        backgroundColor: color.lightWhite,
        padding: 10,
        maxWidth: "65%",
        borderRadius: 15,
    },
    imageWrap: {
        marginRight: 10,
        paddingTop: 10,
    },
    image: {
        resizeMode: "cover",
        width: 40,
        borderRadius: 50,
        height: 40,
    },
});
