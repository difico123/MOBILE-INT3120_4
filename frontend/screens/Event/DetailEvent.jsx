import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
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
    description: "Ki niem sinh nhat 22 tuoi cua An",
    topic: "birthday",
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          style={styles.banner}
          source={{
            uri: data.image,
          }}
        />
      </View>
      <View style={styles.body}>
        <EventInfo
          styleBox={styles.titleContainer}
          styleTitle={styles.title}
          title={data.title}
          styleInfo={styles.time}
          info={data.start + " - " + data.end}
        ></EventInfo>
        <View style={styles.main}>
          <Text style={styles.titleMain}>Chi tiết sự kiện</Text>

          <EventInfo title="Host" info={data.host}></EventInfo>
          <EventInfo title="Sự kiện" info={data.title}></EventInfo>

          <EventInfo title="Bắt đầu" info={data.start}></EventInfo>
          <EventInfo title="Kết thúc" info={data.end}></EventInfo>

          <EventInfo title="Địa điểm" info={data.location}></EventInfo>

          <EventInfo title="Mô tả" info={data.description}></EventInfo>
          <Text style={{ paddingVertical: 2, fontWeight: "600" }}>
            #topic {data.topic}
          </Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actions}>
          <ImageButton source={require("../../assets/join.png")}></ImageButton>
          <ImageButton source={require("../../assets/rate.png")}></ImageButton>
          <ImageButton source={require("../../assets/sharing.png")}></ImageButton>
          <ImageButton source={require("../../assets/pencil.png")}></ImageButton>
        </View>
      </View>
      <View style={{ marginBottom: -320 }}></View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {},
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
    marginTop: 50,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
