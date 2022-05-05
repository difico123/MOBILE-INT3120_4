import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FriendItem } from "../../components/FriendItem";
import SearchBar from "../../components/InputComponent/SearchBar";
import { UserModal } from "../../components/modal/UserModal";
import { updateListFriend } from "../../redux/actions/friend_action";
import FriendService from "../../service/FriendService";
export const Friend = () => {
  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState("");
  const [modalUserVisible, setModalUserVisible] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.authReducers.auth);
  const [friends, setFriends] = useState([]);
  useEffect(async () => {
    const record = await FriendService.getMyFriends(auth.token);
    console.log(record, "record");
    setFriends(record.items);

    (async () => {
      dispatch(
        updateListFriend(
          (await FriendService.getMyFriends(auth.token)).pagination.total_items
        )
      );
    })();
  }, []);

  const FriendList = friends.map((friend, index) => (
    <FriendItem
      name={`${friend.first_name + " " + friend.last_name}`}
      avatar={friend.avatar}
      key={index}
      onPress={() => onFriendPress(friend)}
    ></FriendItem>
  ));

  const onFriendPress = (friend) => {
    setSelectedUser(friend);
    setModalUserVisible(true);
  };
  return (
    <SafeAreaView>
      <UserModal
        setModalUserVisible={setModalUserVisible}
        modalUserVisible={modalUserVisible}
        user={selectedUser}
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
});
