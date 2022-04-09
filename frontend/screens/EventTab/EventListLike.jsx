import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import EventItemHot from "../../components/EventItem/EventItemHot";
import SearchBar from "../../components/InputComponent/SearchBar";

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

const EventListLike = () => {
    const EventHotList = data.map((item, index) => <EventItemHot item={item} key={index} />);

    return (
        <View style={styles.nav}>
            <SearchBar placeholder="Tìm kiếm sự kiện" />
            <View style={styles.headerContainer}></View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
                {EventHotList}
            </ScrollView>
        </View>
    );
};

export default EventListLike;

const styles = StyleSheet.create({
    nav: {
        // marginTop: 20,
        // padding: 10,
    },
    contentContainer: {
        marginBottom: 160,
        padding: 10,
    },
    headerContainer: {
        marginBottom: 20,
    },
});
