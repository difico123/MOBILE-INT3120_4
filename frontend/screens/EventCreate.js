import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EventPostBtn from "../components/EventPostBtn";

import CustomButton from "../components/CustomButton";

const EventCreate = ({ navigation }) => {
    const [isToggleNav, setToggleNav] = useState(false);
    const onFocus = () => {
        setToggleNav(true);
    };
    const onBlur = () => {
        setToggleNav(false);
    };
    useEffect(() => {
        if (isToggleNav) {
            navigation.setOptions({
                tabBarStyle: { display: "none" },
            });
        } else {
            navigation.setOptions({
                tabBarStyle: { display: "flex", position: "absolute", bottom: 10, left: 10, right: 10, elevation: 1, backgroundColor: "#FFFFFF", borderRadius: 10, height: 70, paddingBottom: 10, paddingTop: 5, gap: 0 },
            });
        }
    }, [isToggleNav]);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons size={30} style={[styles.icon]} name="notebook-outline" color="black" type />
                <Text style={styles.title}>Đăng bài viết</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onFocus={onFocus} onBlur={onBlur}></TextInput>
                </View>

                <EventPostBtn title="Thể loại sự kiện" text="party" iconName="notebook-outline" />
                <EventPostBtn title="Địa điểm" text="Đống Đa" iconName="map-marker" bgColor="rgba(38, 72, 113, 0.68)" />
                <EventPostBtn title="Số lượng người" text="30" iconName="group" bgColor="rgba(120, 147, 126, 0.68)" />

                <EventPostBtn title="Thể loại sự kiện" text="party" iconName="notebook-outline" />
                <EventPostBtn title="Địa điểm" text="Đống Đa" iconName="map-marker" bgColor="rgba(38, 72, 113, 0.68)" />
                <EventPostBtn title="Số lượng người" text="30" iconName="group" bgColor="rgba(120, 147, 126, 0.68)" />

                <View style={{ marginTop: 15, marginBottom: 120 }}>
                    <CustomButton text="Đăng bài viết" bgColor="rgba(38, 72, 113, .7)" />
                </View>
            </ScrollView>
        </View>
    );
};

export default EventCreate;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    icon: {},
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
    inputContainer: {
        width: "100%",
        height: 150,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    input: {},
    scrollView: {
        height: "3000%",
    },
});
