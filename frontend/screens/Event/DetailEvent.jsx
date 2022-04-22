import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
import { SmallButton } from "../../components/ButtonComponent/SmallButton";
import { EventInfo } from "../../components/EventItem/EventInfo";
import { toEventResource } from "../../resources/events/EventResource";
import EventService from "../../service/EventService";

export const DetailEvent = (navigation) => {
  const auth = useSelector((state) => state.authReducers.auth);
  const itemId = navigation.route.params.id;
  const [event, setEvent] = useState({});
  useEffect(() => {
    const getEvent = async () => {
      const record = await EventService.getById(auth.token, itemId);
      setEvent(toEventResource(record));
    };
    getEvent();
  }, []);


  const onJoinPress = () => {
    alert("Joined successfully");
  };
  const onLikePress = () => {
    alert("Liked successfully");
  };
  const onRatePress = () => {
    alert("on rate");
  };
  const onSharePress = () => {
    alert("on share");
  };
  const onEditPress = () => {
    alert("on edit");
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.bannerContainer}>
          <Image
            style={styles.banner}
            source={{
              uri: event.images && event.images.length > 0
                ? event.images[0]
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42dec7jSJc9r9eJNqo-6s7S-JMANOe5_1uNd3ca6ZHObtoOGuf5ejxVzhODUTiIiA2lI&usqp=CAU",
            }}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.introContainer}>
            <Text style={styles.introTime}>
              {event.start_at + " - " + event.end_at}
            </Text>
            <Text style={styles.introTitle}>{event.event_name}</Text>
            <Text style={styles.introLocation}>{event.location}</Text>
          </View>
          <View style={styles.main}>
            <Text style={styles.titleMain}>Chi tiết sự kiện</Text>

            {/* <EventInfo info={data.host} source={require('../../assets/sand-clock.png')}></EventInfo>| */}

            <EventInfo
              info={"1h45"}
              source={require("../../assets/sand-clock.png")}
            ></EventInfo>
            <EventInfo
              info={event.host_id}
              source={require("../../assets/flag.png")}
              type="host"
            ></EventInfo>

            <EventInfo
              info={event.location}
              source={require("../../assets/pin.png")}
            ></EventInfo>

            <EventInfo
              info={event.description}
              source={require("../../assets/info.png")}
            ></EventInfo>
            <View style={{ flexDirection: "row" }}>
              <SmallButton title={event.topic}></SmallButton>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 100 }}></View>
      </ScrollView>

      <View style={styles.actionContainer}>
        <View style={styles.actions}>
          <ImageButton
            source={require("./data/image/action/join.png")}
            onPress={onJoinPress}
          ></ImageButton>
          <ImageButton
            source={require("./data/image/action/heart.png")}
            onPress={onLikePress}
          ></ImageButton>
          <ImageButton
            source={require("./data/image/action/rate.png")}
            onPress={onRatePress}
          ></ImageButton>
          <ImageButton
            source={require("./data/image/action/sharing.png")}
            onPress={onSharePress}
          ></ImageButton>
          <ImageButton
            source={require("./data/image/action/pencil.png")}
            onPress={onEditPress}
          ></ImageButton>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  body: {},
  bannerContainer: {
    justifyContent: "space-between",
  },
  banner: {
    height: 137,
    width: 405,
    maxWidth: "95%",
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 20,
  },
  titleContainer: {
    backgroundColor: "#6B42DD",
    height: 100,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
    paddingVertical: 20,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
  time: {
    textAlign: "center",
    color: "white",
  },
  main: {
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
    paddingVertical: 20,
  },
  titleMain: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  actionContainer: {
    // maxHeight: 50,
    // marginTop: 50,
    flex: 0.2,
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    width: "95%",
    shadowColor: "grey",
    borderColor: "grey",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
  },
  introContainer: {
    marginHorizontal: 20,
    // marginTop: 10
  },
  introTime: {
    color: "#5A5C60",
    fontSize: 15,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  introLocation: {
    color: "#5A5C60",
    fontSize: 15,
  },
});
