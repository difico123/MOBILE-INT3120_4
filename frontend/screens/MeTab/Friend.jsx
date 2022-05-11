import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Picker,
  SafeAreaView,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FriendItem } from "../../components/FriendItem";
import SearchBar from "../../components/InputComponent/SearchBar";
import { UserModal } from "../../components/modal/UserModal";
import { updateListFriend } from "../../redux/actions/friend_action";
import FriendService from "../../service/FriendService";
import { color } from "../../theme";
const typePicker = {
  friend: "Bạn bè",
  pending: "Đã gửi lời mời kết bạn",
  request: "Lời mời kết bạn",
};
export const Friend = () => {
  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState("");
  const [modalUserVisible, setModalUserVisible] = useState({});
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.authReducers.auth);
  const [friends, setFriends] = useState([]);
  const [friendsRequest, setFriendsRequest] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Lọc");
  useEffect(async () => {
    const record = await FriendService.getMyFriends(auth.token);
    setFriends(record.items);

    (async () => {
      dispatch(
        updateListFriend(
          (await FriendService.getMyFriends(auth.token))?.pagination.total_items
        )
      );
    })();
  }, []);

  const FriendList = friends?.map((friend, index) => (
    <FriendItem
      name={`${friend.first_name + " " + friend.last_name}`}
      avatar={friend.avatar}
      key={index}
      onPress={() => onFriendPress(friend)}
    ></FriendItem>
  ));

  const onFriendPress = (friend) => {
    console.log(friend, "heyy");
    setSelectedId(friend.id);
    setModalUserVisible(true);
  };

  const onChangePicker = async (itemValue, itemIndex) => {
    let activeFriendList = [];
    if (itemValue === typePicker.friend) {
      activeFriendList = (await FriendService.getMyFriends(auth.token)).items;
    } else if (itemValue === typePicker.pending) {
      activeFriendList = (await FriendService.getMyFriends(auth.token, {status: 0})).items;
    } else if (itemValue === typePicker.request) {
      console.log("request");
      activeFriendList = (await FriendService.getFriendRequest(auth.token)).items;
    }

    setFriends([...activeFriendList]);
    setSelectedValue(itemValue);
  };
  console.log(friends, "friend");
  return (
    <SafeAreaView>
      <UserModal
        setModalUserVisible={setModalUserVisible}
        modalUserVisible={modalUserVisible}
        userId={selectedId}
      ></UserModal>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.header}>
            <SearchBar
              placeholder="Tìm kiếm"
              setToggleNav={setToggleNav}
              setValue={setSearchEvent}
              value={searchEvent}
            />
          </View>

          <View style={styles.plusWrap}>
            <Text style={[styles.filter, styles.title]}>{selectedValue}</Text>
            {/* <Icon name="filter" type="font-awesome" color={background.gray} /> */}

            <Picker
              style={[styles.picker]}
              selectedValue={selectedValue}
              onValueChange={onChangePicker}
            >
              <Picker.Item
                label={typePicker.friend}
                value={typePicker.friend}
                disabled={true}
              />
              <Picker.Item
                label={typePicker.pending}
                value={typePicker.pending}
              />
              <Picker.Item
                label={typePicker.request}
                value={typePicker.request}
              />
            </Picker>
          </View>
        </View>
        <ScrollView style={styles.scrollFriend}>
          {FriendList}
          <View style={{ marginBottom: 100 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  header: {
    marginTop: 10,
    marginBottom: 5,
  },
  scrollFriend: {
    marginRight: 200,
  },
  plusWrap: {
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15
  },
  filter: {
    marginRight: 7,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.blackText,
  },
  picker: {
    borderRadius: 50,
    width: 35,
  },
});
