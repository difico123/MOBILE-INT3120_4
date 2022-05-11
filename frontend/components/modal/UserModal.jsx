import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../ButtonComponent/CustomButton";
import EventItemHot from "../EventItem/EventItemHot";
import SlideModal from "./SlideModal";
import EventService from "../../service/EventService";
import FriendService from "../../service/FriendService";
import { CustomInfoItem } from "../../screens/Event/data/components/CustomInfoItem";
import { SimpleInfoBox } from "../../screens/Event/data/components/SimpleInfoBox";
import {
  FRIEND_BUTTON_DEFAULT,
  FRIEND_STATUS,
} from "../../config/friendStatus";
import { handleBgColorFriendButton } from "./helper/handleBgColorFriendButton";
import UserService from "../../service/UserService";
import { SimpleLoading } from "../LoadingComponent/simpleLoading";

export const UserModal = ({
  userId,
  modalUserVisible,
  setModalUserVisible,
}) => {
  if (!userId) {
    return <View></View>;
  }
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingPage, setLoadingPage] = useState(false);

  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();
  useEffect(() => {
    const getUserEvent = async () => {
      setLoadingPage(true);
      setUserInfo(await UserService.getUserById(auth.token, userId));
      setUserEvents(
        await EventService.getEvents(auth.token, {
          host_info: userInfo?.email,
        })
      );
      
      setLoadingPage(false);
    };
    getUserEvent();
  }, [modalUserVisible]);

  const avatar = userInfo?.avatar?.includes("http")
    ? { uri: userInfo.avatar }
    : require("../../assets/avatar-default-icon.png");
  const [userEvents, setUserEvents] = useState([]);
  const [friendButton, setFriendButton] = useState(
    handleBgColorFriendButton(userInfo?.is_friend)
  );
  const goToDetail = (id) => {
    nav.navigate("Profile");
    nav.navigate("DetailEvent", { id });
  };

  const onAddFriend = async () => {
    setLoading(true);
    await FriendService.addFriend(auth.token, userId);
    const updatedUser = await UserService.getUserById(auth.token, userId);
    setFriendButton(handleBgColorFriendButton(updatedUser.is_friend));
    setUserInfo(updatedUser);
    setLoading(false);
    alert("Kết bạn thành công");
  };
  const onRemoveFriend = async () => {
    setLoading(true);
    await FriendService.removeFriend(auth.token, userInfo.id);
    const updatedUser = await UserService.getUserById(auth.token, userId);
    setFriendButton(handleBgColorFriendButton(updatedUser.is_friend));
    setUserInfo(updatedUser);
    setLoading(false);
  };
  const createTwoButtonAlert = async (message, onPress) =>
    Alert.alert("Xác nhận", message, [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: onPress },
    ]);
  const EventsByHost = userEvents.map((item, index) => (
    <EventItemHot item={item} key={index} onPress={() => goToDetail(item.id)} />
  ));

  const friendButtonController = async (status) => {
    switch (status) {
      case FRIEND_STATUS.self:
        break;
      case FRIEND_STATUS.none:
        await onAddFriend();
        break;
      case FRIEND_STATUS.pending:
        // await onRemoveFriend();
        await createTwoButtonAlert("Hủy yêu cầu kết bạn", onRemoveFriend);
        break;
      case FRIEND_STATUS.friend:
        await createTwoButtonAlert("Hủy kết bạn", onRemoveFriend);
        // await onRemoveFriend();
        break;
      default:
        await onAddFriend();
        break;
    }
  };

  return isLoadingPage ? 
    <SimpleLoading customStyle={{ marginTop: 20 }}></SimpleLoading>
  : (
    userInfo && (
      <SlideModal
        setModalVisible={setModalUserVisible}
        modalVisible={modalUserVisible}
      >
        <>
          <View style={styles.imageBox}>
            <Image style={styles.image} source={avatar} />
            <View style={styles.nameBox}>
              <Text style={styles.name}>
                {userInfo.first_name + " " + userInfo.last_name}
              </Text>
            </View>
          </View>
          <ScrollView>
            <SimpleInfoBox host={userInfo}></SimpleInfoBox>
            <Text style={styles.upcomingText}>Upcoming</Text>
            {EventsByHost}
            <View style={{ marginBottom: 100 }}></View>
          </ScrollView>

          <View></View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 1 }}>
              <CustomButton
                text={friendButton.name}
                textStyle={{ fontSize: 20 }}
                bgColor={friendButton.backgroundColor}
                disabled={friendButton.disabled}
                onPress={() => friendButtonController(userInfo.is_friend)}
                loading={isLoading}
              ></CustomButton>
            </View>
            <View style={{ flex: 0.02 }}></View>
            <View style={{ flex: 1 }}>
              <CustomButton
                text="Liên hệ"
                textStyle={{ fontSize: 20 }}
                onPress={() => alert("contact")}
              ></CustomButton>
            </View>
          </View>
        </>
      </SlideModal>
    )
  );
};

const styles = StyleSheet.create({
  imageBox: {
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  nameBox: {
    height: 50,
  },
  name: {
    //   marginVertical: "auto"
    fontSize: 30,
    fontWeight: "bold",
  },
  upcomingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
