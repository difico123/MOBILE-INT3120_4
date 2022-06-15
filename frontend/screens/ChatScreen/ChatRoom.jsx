import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { RoomItem, ChatItem } from "./components";
import { IP } from "../../config/app";
import { Icon } from "react-native-elements";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import {
  initSocket,
  disconnectSocket,
  joinRoom,
  messageSocket,
  sendMessage,
} from "../../service/socket";
import ChatService from "../../service/ChatService";
const data = [
  {
    id: "1",
    name: "biladen",
    image:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
    me: true,
    time: "10 gio",
    text: "vcl em",
  },
  {
    id: "2",
    name: "biladen",
    image:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
    me: false,
    time: "10 gio",
    text: "vcl vc lorem 25 adfdasfdsafas lorem 25 adfdas lorem25 loadfadsfadsfasdfsa",
  },
  {
    id: "1",
    name: "biladen",
    image:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
    me: false,
    time: "10 gio",
    text: "vxc🙃🙃",
  },
  {
    id: "2",
    name: "biladen",
    image:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
    me: false,
    time: "10 gio",
    text: "vcl z",
  },
  {
    id: "2",
    name: "biladen",
    image:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
    me: false,
    time: "10 gio",
    text: "vcl z",
  },
  {
    id: "2",
    name: "biladen",
    image:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
    me: false,
    time: "10 gio",
    text: "vcl z",
  },
  {
    id: "2",
    name: "biladen",
    image:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
    me: false,
    time: "10 gio",
    text: "vcl z",
  },
];
const ChatRoom = ({ route, navigation }) => {
  const { container, room, flatlist, userOnline } = styles;

  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([...data]);
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [chat, setChat] = useState("");
  const [chatListening, setChatListening] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: route.params?.name });
  }, []);

  useEffect(() => {
    messageSocket("message", (message) => {
      setChatListening(message);
    });

    ChatService.chatRoom(route.params.room).then((res) => {
      console.log("🚀 ~ file: ChatRoom.jsx ~ line 107 ~ useEffect ~ res", res);
    });
  }, []);

  useEffect(() => {
    let { name, room, text, time } = chatListening;

    if (room === route.params?.room) {
      let newChat = {
        name,
        text,
        time,
        image:
          "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
        me: false,
        id: "1",
      };
      setChatList([...chatList, newChat]);
    }
  }, [chatListening]);

  const goRoom = () => {};
  const handleEscape = () => {
    // socket.current.emit("disconnect");
  };

  const send = () => {
    let newChat = {
      name: "bill",
      text: chat,
      time: "10 gio",
      image:
        "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
      me: true,
      id: "1",
    };
    setChatList([...chatList, newChat]);
    sendMessage("chatMessage", { room: route.params?.room, msg: chat });
    setChat("");
  };
  return (
    <View style={container}>
      <View style={styles.chatWrap}>
        <FlatList
          data={chatList}
          inverted
          scrollEnabled={true}
          scrollsToBottom={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={flatlist}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <ChatItem
              chat={item.text}
              image={item.image}
              name={item.name}
              me={item.me}
            />
          )}
        />
      </View>

      {toggleEmoji ? (
        <View style={styles.emoji}>
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              setChat(chat + emoji);
            }}
            showSearchBar={false}
            showTabs={true}
            showHistory={true}
            showSectionTitles={false}
          />
        </View>
      ) : null}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            setToggleEmoji(!toggleEmoji);
          }}
        >
          <Icon style={styles.icon} name="face" type="Octicons" color="brown" />
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput
            placeholder="Nhắn tin"
            value={chat}
            onChangeText={setChat}
          />
        </View>
        <TouchableOpacity style={styles.buttonChat} onPress={send}>
          <Icon style={styles.icon} name="send" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrap: {
    paddingHorizontal: 10,
  },
  emoji: {
    width: "90%",
    height: 200,
    elevation: 1,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    position: "absolute",
    bottom: 60,
    marginLeft: 10,
    backgroundColor: "white",
  },
  icon: {
    paddingHorizontal: 5,
  },
  buttonChat: {
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    height: "80%",
    borderColor: "rgba(0, 0, 0,0.3)",
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    height: 70,
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0,0.2)",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
  },
  room: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
  },
  flatlist: {
    borderColor: "#FFFFFF",
    paddingTop: 100,
    flexDirection: "column-reverse",
  },
  userOnline: {
    padding: 10,
  },
});
