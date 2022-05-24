import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Autocomplete from "../../components/InputComponent/AutoComplete";
import { color } from "../../theme";
import DropDownPicker from "react-native-dropdown-picker";
import EventService from "../../service/EventService";
import { useDispatch, useSelector } from "react-redux";
import FriendService from "../../service/FriendService";
import { SmallButton } from "../../components/ButtonComponent/SmallButton";
import { FriendItem } from "../../components/FriendItem";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
import { setLogin } from "../../redux/actions/auth_actions";
export const InviteFriend = (navigation) => {
  const auth = useSelector((state) => state.authReducers.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(navigation.route.params.event.name);

  console.log(value, "--------");
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);

  const [selectedEventId, setSelectedEventId] = useState(
    navigation.route.params.event.id
  );
  const [invitedFriendId, setInvitedFriendId] = useState([]);
  const [pendingInvitedFriendId, setPendingInvitedFriendId] = useState([]);

  const [refresh, setRefresh] = useState(false);;
  const onChangeEvent = (value) => {
    const event = events.filter((event) => event.value === value);
    setSelectedEventId(event && event.length > 0 ? event[0].id : []);
  };
  useEffect(() => {
    const getEvents = async () => {
      const myEvents = await EventService.getEvents(auth.token, {
        type: "host",
      });
      setEvents(
        myEvents.map((event) => {
          return {
            label: event.event_name,
            value: event.event_name,
            id: event.id,
          };
        })
      );
    };

    const getFriends = async () => {
      const myFriends = await FriendService.getMyFriends(auth.token);
      setFriends(
        myFriends?.items.map((friend) => {
          return {
            name: friend.first_name + " " + friend.last_name,
            id: friend.id,
            avatar: friend.avatar,
          };
        })
      );
    };

    const getPendingInvitedFriendRequest = async () => {
      setPendingInvitedFriendId(
        (await EventService.getInvitedRequest(auth.token, selectedEventId, 0)).items
      );
    };
    const getInvitedFriendRequest = async () => {
      setInvitedFriendId(
        (await EventService.getInvitedRequest(auth.token, selectedEventId, 1)).items
      );
    };
    getEvents();
    getFriends();
    getPendingInvitedFriendRequest();
    getInvitedFriendRequest();
  }, [refresh, selectedEventId]);

  const isInvitedFriend = (friend_id) => {
    console.log(pendingInvitedFriendId, invitedFriendId);
    return (
      pendingInvitedFriendId.some((item) => item.id === friend_id) ||
      invitedFriendId.some((item2) => item2.id === friend_id)
    );
  };

  const onInvitedFriend = () => {
    const inviteFriends = async () => {
      const isInvited = await EventService.inviteFriend(
        auth.token,
        selectedEventId,
        listInvitedFriend.map((item) => item.id)
      );
      if (!isInvited) {
        alert("Có lỗi xảy ra, vui lòng thử lại sau");
      } else {
        alert("Mời bạn bè thành công");
        setListInvitedFriend([]);
        setRefresh(!refresh);
      }
    };
    inviteFriends();
  };

  const [selectedFriend, setSelectedFriend] = useState({
    id: 0,
    name: "",
    avatar: "",
  });
  const [selectedFriendId, setSelectedFriendId] = useState("");

  useEffect(() => {
    if (selectedFriend.id) {
      setSelectedFriendId(selectedFriend.id);
    }
  }, [selectedFriend]);

  const [listInvitedFriend, setListInvitedFriend] = useState([]);
  useEffect(() => {
    if (
      selectedFriend.id &&
      listInvitedFriend.filter((item) => item.id === selectedFriend.id)
        .length == 0
    ) {
      if (isInvitedFriend(selectedFriend.id)) {
        alert("Bạn đã mời " + selectedFriend.name + " rồi nhé :v");
      } else {
        let updateList = [...listInvitedFriend, selectedFriend];
        setListInvitedFriend(updateList);
      }
    }
  }, [selectedFriendId]);

  const setAllFriend = () => {
    const invitedAlreadyList = friends
      .filter((item) => isInvitedFriend(item.id))
      .map((item) => item.name);
    const notInvitedYetList = friends.filter(
      (item) => !isInvitedFriend(item.id)
    );
    if (notInvitedYetList.length == 0) {
      alert("Tất cả các bạn bè của bạn đã được mời");
    } else if (invitedAlreadyList.length > 0) {
      alert("Bạn đã mời " + invitedAlreadyList.join(", ") + " rồi nhé =))");
    }
    setListInvitedFriend([...notInvitedYetList]);
  };

  const onRemoveInvitedList = (friendId) => {
    const updatedList = [...listInvitedFriend];
    setListInvitedFriend(updatedList.filter((item) => item.id !== friendId));
  };
  return (
    <View>
      <View style={styles.plusWrap}>
        <Text>Event: </Text>
        <View style={styles.filterBox}>
          <DropDownPicker
            open={open}
            value={value}
            items={events}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setEvents}
            onChangeValue={onChangeEvent}
          />
        </View>
      </View>
      <Autocomplete
        value={selectedFriend.name}
        setValue={setSelectedFriend}
        style={[styles.input]}
        containerStyle={[bs.my2]}
        label="Mời bạn bè"
        detailData={friends}
        menuStyle={{ backgroundColor: "white" }}
        onChange={(data) => console.log()}
        id={selectedFriendId}
        setId={setSelectedFriendId}
      />

      <View style={{ marginTop: 100 }}>
        <CustomButton
          text="Lấy danh sách tất cả bạn bè"
          onPress={setAllFriend}
        ></CustomButton>
        <Text style={styles.waitingList}>Danh sách chờ xác nhận</Text>
        {listInvitedFriend.map((friend, index) => {
          return (
            <View
              style={{ flexDirection: "row" }}
              key={index + listInvitedFriend.length + 1}
            >
              <FriendItem
                name={`${friend.name}`}
                avatar={friend.avatar}
                key={index}
                onPress={() => console.log("invite press")}
              ></FriendItem>
              <ImageButton
                source={require("../../assets/crossed.png")}
                customImageStyle={{ width: 20, height: 20 }}
                onPress={() => onRemoveInvitedList(friend.id)}
                key={friend.id}
              ></ImageButton>
            </View>
          );
        })}

        {listInvitedFriend && listInvitedFriend.length > 0 && (
          <CustomButton
            text={"Xác nhận"}
            onPress={onInvitedFriend}
          ></CustomButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plusWrap: {
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
  },
  filter: {
    marginRight: 7,
  },
  filterBox: { flex: 7 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.blackText,
  },
  picker: {
    borderRadius: 50,
    width: 35,
  },
  waitingList: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
});

const bs = StyleSheet.create({});
