import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-web";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import { SmallButton } from "../../components/ButtonComponent/SmallButton";
import { FriendItem } from "../../components/FriendItem";
import { SimpleLoading } from "../../components/LoadingComponent/simpleLoading";
import EventService from "../../service/EventService";

import { useNavigation } from "@react-navigation/native";
import { UserModal } from "../../components/modal/UserModal";
import { sendMail } from "../../service/MailService";
import { MAIL_TYPE } from "../../config/mail";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
export const Attendance = (navigation) => {
  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();
  const eventId = navigation.route.params.event.id;
  const [status, setStatus] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [modalUserVisible, setModalUserVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [reload, setReload] = useState(-1);
  const [joinedNumber, setJoinedNumber] = useState(0);
  const [notConfirmed, setNotConfirmed] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onStatusPress = (newStatus) => {
    setLoading(true);
    setStatus(newStatus);
    setLoading(false);
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    const getFriendInvited = async () => {
      setLoading(true);
      const record = await EventService.getInvitedRequest(
        auth.token,
        eventId,
        status
      );
      setItems(record.items);
      setRefreshing(!refreshing);
      setLoading(false);
    };
    getFriendInvited();
  }, [status, auth]);

  useEffect(() => {
    (async () => {
      setJoinedNumber(
        (await EventService.getInvitedRequest(auth.token, eventId, 1))?.pagination?.total_items
      );
      setNotConfirmed(
        (await EventService.getInvitedRequest(auth.token, eventId, 0))?.pagination?.total_items ?? 0
      );
    })();
  }, [refreshing]);
  
  const [isSendingEmail, setSendingEmail] = useState(false);
  const onRemindPress = () => {
    const remindAttendants = async () => {
      setSendingEmail(true);
      const pendingAttendants = (await EventService.getInvitedRequest(
        auth.token,
        eventId,
        0
      )).items;
      const pendingAttendantsId = pendingAttendants.map((item) => item.email);
      await sendMail(
        auth.token,
        pendingAttendantsId,
        MAIL_TYPE.REMIND,
        eventId
      );
      
      setSendingEmail(false);
      alert("Đã gửi email nhắc nhở");
    };
    remindAttendants();
  };

  const onInvitePress = () => {
    nav.navigate("InviteFriend", { event: navigation.route.params.event });
  };

  const onFriendPress = (friendId) => {
    setSelectedId(friendId);
    setModalUserVisible(true);
  };
  const onRemoveRequestMember = (friendId) => {
    const removeInvitedFriend = async () => {
      const check = await EventService.deleteInvitedFriend(
        auth.token,
        eventId,
        [friendId]
      );
      if (check) {
        onStatusPress(!status);
        onStatusPress(status);
        alert("Xóa thành viên thành công");
      } else alert("Xảy ra vấn đề ở hệ thống. Vui lòng thử lại sau");
      setRefreshing(!refreshing);
    };

    Alert.alert("Xác nhận", "Xóa lời mời tham dự", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: removeInvitedFriend },
    ]);
  };
  return (
    <SafeAreaView>
      <UserModal
        setModalUserVisible={setModalUserVisible}
        modalUserVisible={modalUserVisible}
        userId={selectedId}
      ></UserModal>
      <View style={{ marginTop: 20, flexDirection: "row", marginLeft: 20 }}>
        <SmallButton
          title={"Đã xác nhận" + (status == 1 ? " (" + joinedNumber + ")": "")}
          customStyle={{
            backgroundColor: status == 1 ? "#E1ECF4" : "grey",
            textColor: status == 1 ? "#39739D" : "white",
            width: "30%",
          }}
          onPress={() => onStatusPress(1)}
        ></SmallButton>
        <SmallButton
          title={"Chưa xác nhận" + (status == 0 ?  "(" + notConfirmed + ")" : "")}
          customStyle={{
            width: "30%",
            backgroundColor: status == 0 ? "#E1ECF4" : "grey",
            textColor: status == 0 ? "#39739D" : "white",
          }}
          onPress={() => onStatusPress(0)}
        ></SmallButton>
      </View>
      {isLoading ? (
        <SimpleLoading></SimpleLoading>
      ) : (
        <View style={{ marginTop: 20 }}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          {items && items.length > 0 ? (
            <View>
              {items.map((item, index) => (
                <View
                  style={{ flexDirection: "row" }}
                  key={index + items.length + 1}
                >
                  <FriendItem
                    name={item.first_name + " " + item.last_name}
                    avatar={item.avatar}
                    onPress={() => onFriendPress(item.id)}
                    key={index}
                  />
                  <ImageButton
                    source={require("../../assets/crossed.png")}
                    customImageStyle={{ width: 20, height: 20 }}
                    onPress={() => onRemoveRequestMember(item.id)}
                    key={item.id}
                  ></ImageButton>
                </View>
              ))}
              <View>
                {status == 0 ? (
                  <CustomButton
                    text="Nhắc nhở"
                    onPress={onRemindPress}
                    loading={isSendingEmail}
                  ></CustomButton>
                ) : (
                  <CustomButton
                    text="Mời bạn bè"
                    onPress={onInvitePress}
                  ></CustomButton>
                )}
              </View>
            </View>
          ) : (
            <View>
              <Text style={{ marginLeft: 20 }}>
                {status == 1
                  ? "Chưa có thành viên nào xác nhận tham gia"
                  : "Chưa mời thành viên nào"}
              </Text>
              {status == 1 && (
                <CustomButton
                  text="Mời ngay"
                  onPress={onInvitePress}
                ></CustomButton>
              )}
            </View>
          )}
          {/* </ScrollView> */}
        </View>
      )}
    </SafeAreaView>
  );
};
