import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
import { SmallButton } from "../../components/ButtonComponent/SmallButton";
import { EventInfo } from "../../components/EventItem/EventInfo";

export const DetailEvent = (navigation) => {
  console.log("hey");
  const itemId = navigation.route.params.id;
  const data = {
    id: "121",
    title: "birthday",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42dec7jSJc9r9eJNqo-6s7S-JMANOe5_1uNd3ca6ZHObtoOGuf5ejxVzhODUTiIiA2lI&usqp=CAU",
    date: "15",
    month: "May",
    location: "Đống Đa",
    screen: "MapScreen",
    start: "8am 15 May",
    end: "10am 15 May",
    host: "Do Duc Tam",
    description: "Ki niem sinh nhat 22 tuoi cua An Ki niem sinh nhat 22 tuoi cua An Ki niem sinh nhat 22 tuoi cua An",
    topic: "birthday",
  };
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
              uri: data.image,
            }}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.introContainer}>
            <Text style={styles.introTime}>
              {data.start + " - " + data.end}
            </Text>
            <Text style={styles.introTitle}>{data.title}</Text>
            <Text style={styles.introLocation}>{data.location}</Text>
          </View>
          <View style={styles.main}>
            <Text style={styles.titleMain}>Chi tiết sự kiện</Text>

            {/* <EventInfo info={data.host} source={require('../../assets/sand-clock.png')}></EventInfo>| */}
            
            <EventInfo info={"1h45"} source={require('../../assets/sand-clock.png')}></EventInfo>
            <EventInfo info={`Event by ${data.host}`} source={require('../../assets/flag.png')}></EventInfo>

            <EventInfo info={data.location} source={require('../../assets/pin.png')}></EventInfo>

            <EventInfo info={data.description} source={require('../../assets/info.png')}></EventInfo>
            <View style={{ flexDirection: "row" }}>
              <SmallButton title={data.topic}></SmallButton>
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
