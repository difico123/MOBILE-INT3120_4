import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import EventItemHot from "../../components/EventItem/EventItemHot";
import SlideModal from "../../components/modal/SlideModal";
import EventService from "../../service/EventService";
import FriendService from "../../service/FriendService";
import { CustomInfoItem } from "./data/components/CustomInfoItem";
import { SimpleInfoBox } from "./data/components/SimpleInfoBox";

export const HostModal = ({ host, modalHostVisible, setModalHostVisible }) => {
  const avatar = host.avatar?.includes("http")
    ? { uri: host.avatar }
    : require("./data/image/avatar/avatar-default-icon.png");
  const auth = useSelector((state) => state.authReducers.auth);
  const [hostEvents, setHostEvents] = useState([]);
  const nav = useNavigation();
  useEffect(() => {
    (async () => {
      setHostEvents(
        await EventService.getEvents(auth.token, { host_info: host.email })
      );
    })();
  }, []);

  const goToDetail = (id) => {
    nav.navigate("Tabs");
    nav.navigate("DetailEvent", { id });
  };

  const onAddFriend = async () => {
    alert("on press");
    // const status = await FriendService.addFriend(auth.token, host.id);
    // if (status) {
      // dispatch
    // }
  };
  const EventsByHost = hostEvents.map((item, index) => (
    <EventItemHot item={item} key={index} onPress={() => goToDetail(item.id)} />
  ));
  return (
    <SlideModal
      setModalVisible={setModalHostVisible}
      modalVisible={modalHostVisible}
    >
      <>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={avatar} />
          <View style={styles.nameBox}>
            <Text style={styles.name}>
              {host.first_name + " " + host.last_name}
            </Text>
          </View>
        </View>
        <ScrollView>
          <SimpleInfoBox host={host}></SimpleInfoBox>
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
              onPress={onAddFriend}
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
