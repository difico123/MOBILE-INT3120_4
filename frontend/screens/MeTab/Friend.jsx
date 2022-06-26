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
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
import { FriendItem } from "../../components/FriendItem";
import SearchBar from "../../components/InputComponent/SearchBar";
import { UserModal } from "../../components/modal/UserModal";
import { updateListFriend } from "../../redux/actions/friend_action";
import FriendService from "../../service/FriendService";
import UserService from "../../service/UserService";
import { color } from "../../theme";
import { nonAccentVietnamese } from "../../utils/convert";
const typePicker = {
  friend: "Bạn bè",
  pending: "Đã gửi lời mời kết bạn",
  request: "Lời mời kết bạn",
  none: "Lọc"
};
export const Friend = () => {
  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState("");
  const [modalUserVisible, setModalUserVisible] = useState({});
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.authReducers.auth);
  const [friends, setFriends] = useState([]);
  const [showFriends, setShowFriends] = useState([]);
  const [friendsRequest, setFriendsRequest] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [friendId, setFriendId] = useState(0);
  const [selectedValue, setSelectedValue] = useState(typePicker.friend);
  const [page, setPage] = useState(1);
  useEffect(async () => {
    const record = await FriendService.getMyFriends(auth.token);
    setFriends(record.items);
    setShowFriends(record.items);

    (async () => {
      dispatch(
        updateListFriend(
          (await FriendService.getMyFriends(auth.token))?.pagination?.total_items
        )
      );
    })();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedValue]);

  useEffect(() => {
    if (modalUserVisible === false) {
      onChangePicker(selectedValue);
    }
  }, [modalUserVisible]);

  const FriendList = showFriends?.map((friend, index) => (
    <FriendItem
      name={`${friend.first_name + " " + friend.last_name}`}
      avatar={friend.avatar}
      key={index}
      onPress={() => onFriendPress(friend)}
    ></FriendItem>
  ));

  const onFriendPress = (friend) => {
    setSelectedId(friend.id);
    setFriendId(friend.friend_id);
    setModalUserVisible(true);
  };

  const onChangePicker = async (itemValue, itemIndex) => {
    let activeFriendList = [];
    if (itemValue === typePicker.friend) {
      activeFriendList = (await FriendService.getMyFriends(auth.token)).items;
    } else if (itemValue === typePicker.pending) {
      activeFriendList = (
        await FriendService.getFriendRequest(auth.token, 1)
      ).items.map((item) => {
        return {
          id: item.friend_id,
          friend_id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
        };
      });
    } else if (itemValue === typePicker.request) {
      activeFriendList = (
        await FriendService.getFriendRequest(auth.token, 0)
      ).items.map((item) => {
        return {
          id: item.friend_id,
          friend_id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
        };
      });
    } else {
      activeFriendList = (await UserService.getUserList(auth.token)).items;
    }

    setFriends([...activeFriendList]);
    setShowFriends([...activeFriendList]);
    setSelectedValue(itemValue);
  };

  const loadMoreItem = async () => {
    let plusFriend = [];
    switch (selectedValue) {
      case typePicker.pending:
        plusFriend = (
          await FriendService.getFriendRequest(auth.token, 1, page + 1)
        ).items.map((item) => {
          return {
            id: item.friend_id,
            friend_id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
          };
        });
        break;

      case typePicker.request:
        plusFriend = (
          await FriendService.getFriendRequest(auth.token, 0, page + 1)
        ).items.map((item) => {
          return {
            id: item.friend_id,
            friend_id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
          };
        });
        break;

      default: //friend
        plusFriend = (
          await FriendService.getMyFriends(auth.token, { page: page + 1 })
        ).items;
        break;
    }
    if (plusFriend.length <= 0) alert("Không còn bản ghi nào nữa");
    else {
      setPage(page + 1);
      setFriends([...friends, ...plusFriend]);
      setShowFriends([...friends, ...plusFriend]);
    }
  };

  const handleSearchEvent = async () => {
    if (searchEvent.trim() === "") {
      if (selectedValue == typePicker.none) {
        setShowFriends((await UserService.getUserList(auth.token)).items)
      } else {
        setShowFriends([...friends]);
      }
    } else {
      const filterList = friends.filter((friend) => {
        return nonAccentVietnamese(friend.first_name + friend.last_name)
          .trim()
          .toLowerCase()
          .includes(searchEvent.trim().toLowerCase());
      });

      setShowFriends([...filterList]);
    }
  };
  return (
    <SafeAreaView>
      <UserModal
        setModalUserVisible={setModalUserVisible}
        modalUserVisible={modalUserVisible}
        userId={selectedId}
        friendId={friendId}
      ></UserModal>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.header}>
            <SearchBar
              placeholder="Tìm kiếm"
              setToggleNav={setToggleNav}
              setValue={setSearchEvent}
              value={searchEvent}
              onPress={handleSearchEvent}
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
                label={typePicker.none}
                value={typePicker.none}
              />
              <Picker.Item
                label={typePicker.friend}
                value={typePicker.friend}
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
          <View>{FriendList}</View>

          {showFriends.length > 8 && (
            <ImageButton
              source={require("../../assets/down-arrow.png")}
              customImageStyle={{ height: 100, width: 100 }}
              containerStyle={{ alignItems: "center", marginTop: 50 }}
              onPress={loadMoreItem}
            ></ImageButton>
          )}

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
    marginLeft: 15,
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
