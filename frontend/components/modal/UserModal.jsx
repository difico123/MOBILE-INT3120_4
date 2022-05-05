import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../ButtonComponent/CustomButton";
import EventItemHot from "../EventItem/EventItemHot";
import SlideModal from "./SlideModal";
import EventService from "../../service/EventService";
import FriendService from "../../service/FriendService";
import { CustomInfoItem } from "../../screens/Event/data/components/CustomInfoItem";
import { SimpleInfoBox } from "../../screens/Event/data/components/SimpleInfoBox";

export const UserModal = ({ user, modalUserVisible, setModalUserVisible }) => {
  console.log("hey", user);
  const avatar = user.avatar?.includes("http")
    ? { uri: user.avatar }
    : require("../../assets/avatar-default-icon.png");
  const auth = useSelector((state) => state.authReducers.auth);
  const [userEvents, setUserEvents] = useState([]);
  const nav = useNavigation();
  useEffect(() => {
    (async () => {
      setUserEvents(
        await EventService.getEvents(auth.token, { host_info: user.email })
      );
    })();
  }, []);

  const goToDetail = (id) => {
    nav.navigate("Tabs");
    nav.navigate("DetailEvent", { id });
  };

  const onAddFriend = async () => {
    const status = await FriendService.addFriend(auth.token, user.id);
    if (status) {
      alert("Success");
    } else {
      alert("Failed", status);
    }
  };
  const EventsByHost = userEvents.map((item, index) => (
    <EventItemHot item={item} key={index} onPress={() => goToDetail(item.id)} />
  ));
  return (
    <SlideModal
      setModalVisible={setModalUserVisible}
      modalVisible={modalUserVisible}
    >
      <>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={avatar} />
          <View style={styles.nameBox}>
            <Text style={styles.name}>
              {user.first_name + " " + user.last_name}
            </Text>
          </View>
        </View>
        <ScrollView>
          <SimpleInfoBox host={user}></SimpleInfoBox>
          <Text style={styles.upcomingText}>Upcoming</Text>
          {EventsByHost}
          <View style={{ marginBottom: 100 }}></View>
        </ScrollView>

        <View></View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <CustomButton
              text="Kết bạn"
              textStyle={{ fontSize: 20 }}
              onPress={onAddFriend}
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
