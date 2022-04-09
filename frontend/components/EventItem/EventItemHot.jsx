import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CommonStyle, { BORDER_COLOR, MAIN_COLOR } from "../common/CommonStyle";
const EventItemHot = ({ item }) => {
    return (
        <View>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.contentContainer}>
                    <View style={styles.contentWrap}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.contentWrap}>
                        <MaterialCommunityIcons size={30} style={[styles.icon]} name="party-popper" color="orange" type="font-awesome" />
                        <Text style={[styles.text]}>{item.title}</Text>
                    </View>
                    <View style={styles.contentWrap}>
                        <MaterialCommunityIcons size={30} style={[styles.icon]} name="map-marker-outline" color="red" type="font-awesome" />
                        <Text style={[styles.text]}>{item.location}</Text>
                    </View>
                </View>
                <View style={styles.heartContainer}>
                    <View>
                        <MaterialCommunityIcons style={[styles.heart]} size={30} name="heart-outline" color="black" type="font-awesome" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EventItemHot;

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: "100%",
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: "40%",
        height: 100,
        borderRadius: 10,
        resizeMode: "contain",
        overflow: "hidden",
        transform: [{ translateX: -10 }],
    },
    contentWrap: {
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
    contentContainer: {
        flex: 2,
    },
    heartContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heart: {
        // width: 30,
        // height: 20,
    },
    text: {},
    icon: {
        marginRight: 10,
    },
});
