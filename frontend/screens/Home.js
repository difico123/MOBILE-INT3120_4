import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "../components/SearchBar";
import HeaderLogo from "../components/HeaderLogo";
import EventItemIncomming from "../components/EventItemIncomming";
import EventItemHot from "../components/EventItemHot";
import CommonStyle from "../components/common/CommonStyle";

const Home = ({ navigation }) => {
    const [isToggleNav, setToggleNav] = useState(false);
    const [searchEvent, setSearchEvent] = useState("");

    const auth = useSelector((state) => state.authReducers.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isToggleNav) {
            navigation.setOptions({
                tabBarLabel: "Home",
                tabBarStyle: { display: "none" },
            });
        } else {
            navigation.setOptions({
                tabBarLabel: "Home",
                tabBarStyle: { display: "flex", position: "absolute", bottom: 15, left: 20, right: 20, elevation: 1, backgroundColor: "#FFFFFF", borderRadius: 10, height: 70, paddingBottom: 10, paddingTop: 5, gap: 0 },
            });
        }
    }, [isToggleNav]);

    useEffect(() => {
        // console.log(auth.user);
    }, []);

    const data = [
        {
            id: "121",
            title: "birthday",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42dec7jSJc9r9eJNqo-6s7S-JMANOe5_1uNd3ca6ZHObtoOGuf5ejxVzhODUTiIiA2lI&usqp=CAU",
            date: "15",
            month: "May",
            location: "Đống Đa",
            screen: "MapScreen",
        },
        {
            id: "123",
            title: "get a ride",
            image: "https://links.papareact.com/3pn",
            date: "15",
            month: "May",
            location: "Đống Đa",
            screen: "MapScreen",
        },

        {
            id: "124",
            title: "get a ride",
            image: "https://links.papareact.com/28w",
            date: "15",
            month: "May",
            location: "Đống Đa",
            screen: "MapScreen",
        },
        {
            id: "1224",
            title: "get a ride",
            image: "https://links.papareact.com/28w",
            date: "15",
            month: "May",
            location: "Đống Đa",
            screen: "MapScreen",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar placeholder="Tìm kiếm" setToggleNav={setToggleNav} setValue={setSearchEvent} value={searchEvent} />
            </View>
            <View style={styles.scroll}>
                <View style={styles.eventContainer}>
                    <View style={[CommonStyle.spaceBetween]}>
                        <TouchableOpacity>
                            <Text style={styles.title}>Sự kiện sắp diễn ra</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.title}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList showsHorizontalScrollIndicator={false} data={data} horizontal keyExtractor={(item) => item.id} renderItem={({ item, index }) => <EventItemIncomming item={item} key={index} />} />
                </View>
                <View style={styles.eventContainer}>
                    <View style={[CommonStyle.spaceBetween, styles.hotEventTitle]}>
                        <TouchableOpacity>
                            <Text style={styles.title}>Sự kiện đang HOT</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList showsHorizontalScrollIndicator={true} data={data} keyExtractor={(item) => item.id} renderItem={({ item, index }) => <EventItemHot item={item} key={index} />} />
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    scroll: {
        overflow: "hidden",
        height: 10000,
    },
    container: {},
    header: {
        marginTop: 10,
    },
    eventItem: {},
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    icon: {},
    eventContainer: {
        padding: 15,
    },
    hotEventTitle: {
        marginBottom: 10,
    },
});
