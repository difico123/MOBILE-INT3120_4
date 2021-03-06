import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CommonStyle, {
  BORDER_COLOR,
  MAIN_COLOR,
  SECOND_COLOR,
} from "../common/CommonStyle";
import { MONTH } from "../../config/date";
import moment from "moment";
import { DateCard } from "./DateCard";

const EventItemIncomming = ({ onPress, item }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri:
            item.images.length > 0
              ? item.images[0]
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42dec7jSJc9r9eJNqo-6s7S-JMANOe5_1uNd3ca6ZHObtoOGuf5ejxVzhODUTiIiA2lI&usqp=CAU",
        }}
      />

      <DateCard item={item}></DateCard>
      <View style={styles.titleContainer}>
        <View style={styles.shortDescription}>
          <View style={styles.titleWrap}>
            <MaterialCommunityIcons
              style={[styles.icon]}
              name="party-popper"
              color="orange"
              type="font-awesome"
            />
            <Text style={[styles.title]}>{item.event_name}</Text>
          </View>
          <View style={styles.titleWrap}>
            <MaterialCommunityIcons
              style={[styles.icon]}
              name="map-marker-outline"
              color="red"
            />
            <Text style={styles.title}>
              {item.location.length <= 50
                ? item.location
                : item.location.slice(0, 50) + "..."}
            </Text>
          </View>
        </View>

        <View style={styles.smallImage}>
          <Image
            style={styles.avt}
            source={{
              uri:
                item.images.length > 0
                  ? item.images[0]
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42dec7jSJc9r9eJNqo-6s7S-JMANOe5_1uNd3ca6ZHObtoOGuf5ejxVzhODUTiIiA2lI&usqp=CAU",
            }}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default EventItemIncomming;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    elevation: 1,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  header: {
    marginTop: 10,
  },
  dateContainer: {
    position: "absolute",
    borderRadius: 10,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    borderWidth: 1,
    backgroundColor: MAIN_COLOR,
    borderColor: BORDER_COLOR,
    elevation: 10,
  },
  dateText: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  monthText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  avt: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  image: {
    position: "relative",
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  eventItem: {},
  title: {
    fontSize: 14,
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 25,
    padding: 2,
    marginRight: 2,
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    padding: 5,
    height: "auto",
    backgroundColor: "#ffffff",
    shadowColor: "black",
    elevation: 10,
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  shortDescription: {
    flex: 0.7,
  },
  smallImage: {
    flex: 0.1,
    alignItems: "flex-end",
    textAlign: "right",
  },
});
