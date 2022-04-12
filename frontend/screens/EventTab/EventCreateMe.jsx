import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Platform, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, FlatList, ScrollView } from "react-native";
import SearchBar from "../../components/InputComponent/SearchBar";
import { BORDER_COLOR } from "../../components/common/CommonStyle";
import { Icon } from "react-native-elements";
import { background, color } from "../../theme";
import Swipeout from "react-native-swipeout";

import EventCreateMeItem from "../../components/EventItem/EventCreateMeItem";

const data = [
    {
        id: 1,
        name: "birthday",
    },
    {
        id: 2,
        name: "birthday",
    },
    {
        id: 3,
        name: "birthday",
    },
    {
        id: 4,
        name: "birthday",
    },
    {
        id: 5,
        name: "birthday",
    },
    {
        id: 6,
        name: "birthday",
    },
    {
        id: 7,
        name: "birthday",
    },
    {
        id: 8,
        name: "birthday",
    },
    {
        id: 9,
        name: "birthday",
    },
    {
        id: 10,
        name: "birthday",
    },
    {
        id: 11,
        name: "birthday",
    },
    {
        id: 12,
        name: "birthday",
    },
    {
        id: 13,
        name: "birthday",
    },
    {
        id: 14,
        name: "birthday",
    },
    {
        id: 15,
        name: "birthday",
    },
];
const EventCreateMe = ({ navigation }) => {
    const goCreateEvent = () => {
        navigation.navigate("EventCreate");
    };
    const [isToggleNav, setToggleNav] = useState(false);
    useEffect(() => {
        if (isToggleNav) {
            navigation.setOptions({
                tabBarStyle: { display: "none" },
            });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    display: "flex",
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    right: 10,
                    elevation: 1,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 5,
                    borderWidth: 1,
                    borderColor: BORDER_COLOR,
                },
            });
        }
    }, [isToggleNav]);

    const swipeoutBtns = [
        {
            text: "Sửa",
            color: "black",
            backgroundColor: "transparent",
            component: (
                <View style={[styles.center, styles.edit]}>
                    <Icon name="edit" type="font-awesome" color="white" />
                </View>
            ),
        },
        {
            text: "Xóa",
            backgroundColor: "transparent",
            component: (
                <View style={[styles.center, styles.delete]}>
                    <Icon name="trash" type="font-awesome" />
                </View>
            ),
        },
    ];
    return (
        <View>
            <SearchBar placeholder="tìm kiếm" setToggleNav={setToggleNav} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.wrap}>
                    <TouchableOpacity onPress={goCreateEvent}>
                        <View style={styles.plusWrap}>
                            <Icon name="plus" type="font-awesome" color={background.gray} />
                            <Text style={styles.add}>Tạo mới</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goCreateEvent}>
                        <View style={styles.plusWrap}>
                            <Icon name="filter" type="font-awesome" color={background.gray} />
                            <Text style={styles.add}>Lọc</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.main}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={true}
                        renderItem={({ item, index }) => (
                            <Swipeout right={swipeoutBtns} style={styles.btns}>
                                <EventCreateMeItem name={item.name} />
                            </Swipeout>
                        )}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={<View style={{ paddingBottom: 300 }}></View>}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default EventCreateMe;
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        overflow: "hidden",
    },
    delete: {
        marginHorizontal: 2,
        backgroundColor: background.brown,
    },
    edit: {
        marginHorizontal: 2,
        backgroundColor: background.gray,
    },
    plusWrap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    wrap: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    add: {
        marginLeft: 5,
    },
    main: {
        marginTop: 10,
    },
    btns: {
        height: 60,
        borderRadius: 10,
        height: 55,
        marginVertical: 5,
        backgroundColor: "transparent",
    },
});
