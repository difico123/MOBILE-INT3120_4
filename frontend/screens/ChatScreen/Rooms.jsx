import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { RoomItem } from "./components";
import CustomSearchBar from "../../components/InputComponent/CustomSearchBar";
import { joinRoom, messageSocket, offSocket } from "../../service/socket";
import ChatService from "../../service/ChatService";

const Rooms = ({ navigation }) => {
  const { container, room } = styles;
  const [messageRoom, setMessageRoom] = useState([]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    ChatService.getChatRooms().then((res) => {
      let eventRooms = res.data.items;
      setChatRoomList(eventRooms);
    });
  }, []);

  useEffect(() => {
    chatRoomList.map((room) => {
      joinRoom(room.event_id, "xx");
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
        renderItem={({ item }) => (
          <RoomItem
            notseen={item.notseen}
            message={item.message}
            chater={item.user_name}
            image={
              item.event_images?.length > 0 ? item.event_images[0] : undefined
            }
            room={item.event_id}
            name={item.event_name}
            onPress={goChat}
          />
        )}
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
