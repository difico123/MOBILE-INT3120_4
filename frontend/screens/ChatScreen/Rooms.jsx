import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { RoomItem } from "./components";
import CustomSearchBar from "../../components/InputComponent/CustomSearchBar";
import { joinRoom, messageSocket, offSocket } from "../../service/socket";

const Rooms = ({ navigation }) => {
    const { container, room } = styles;
    const [messageRoom, setMessageRoom] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([
        {
            chater: "duc",
            message: "abc",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ftq77i_uaywvUW_XbtUzZgX6RZenuGZ_Nw&usqp=CAU",
            room: "1",
            name: "Cuộc sống mưu sinh",
            notseen: 3,
        },
        {
            chater: "duc",
            message: "fadsfsdafsadfdafsdafsdafsdafsadfsadfsdafsadfsadfabc",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdBsMM0S5_5wGUMQW49SaCHo-jGEBN39EeQ&usqp=CAU",
            room: "2",
            name: "Tiệc tùng say sỉn",
            notseen: 2,
        },
        { chater: "duc", message: "abc", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6U9FQ5rJr1jxgQ5d25uxoQeuvBAHS8Vupg&usqp=CAU", room: "3", name: "Thác loạn", notseen: 2 },
        {
            chater: "duc",
            message: "abc",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-_3B8DqJrmjgffiIE_dZvMMJ-GtKRriLSw&usqp=CAU",
            room: "4",
            name: "Không say không về",
            notseen: 1,
        },
        { chater: "duc", message: "abc", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLrW7MwE4yjLYfZnLpcy02zmlb7yXPloXpxA&usqp=CAU", room: "5", name: "Rượu chè bê bết", notseen: 5 },
    ]);
    const [chat, setChat] = useState("");

    useEffect(() => {
        chatRoomList.map((room) => {
            joinRoom(room.room, "xx");
        });
        messageSocket("message", (message) => {
            setChat(message);
        });
    }, []);

    useEffect(() => {
        if (chat) {
            let { name, room, text } = chat;
            const newList = chatRoomList.map((chatRoom) => {
                if (chatRoom.room === room) {
                    const chatRef = {
                        ...chatRoom,
                        chater: name,
                        message: text,
                        notseen: chatRoom.notseen + 1,
                    };

                    return chatRef;
                } else {
                    return chatRoom;
                }
            });
            setChatRoomList([...newList]);
        }
    }, [chat]);

    const goChat = (room, name) => {
        navigation.navigate("ChatRoom", { room, name });
    };
    return (
        <View style={container}>
            <CustomSearchBar placeholder="Tìm kiếm" />
            <FlatList
                contentContainerStyle={styles.flatlist}
                data={chatRoomList}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <RoomItem notseen={item.notseen} message={item.message} chater={item.chater} image={item.image} room={item.room} name={item.name} onPress={goChat} />}
            />
        </View>
    );
};

export default Rooms;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingTop: 10,
    },
    callVideo: {
        padding: 10,
        alignItems: "center",
        backgroundColor: "#FFFFF1",
    },
    room: {},
    flatlist: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
});
