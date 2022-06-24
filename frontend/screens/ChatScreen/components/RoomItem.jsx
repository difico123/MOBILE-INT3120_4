import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { color, background } from "../../../theme";

export const RoomItem = ({
  onPress,
  name,
  image,
  notseen,
  room,
  message,
  chater,
}) => {
  return (
    <Pressable onPress={() => onPress(room, name)}>
      <View style={styles.room}>
        <View style={styles.contentWrap}>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLrW7MwE4yjLYfZnLpcy02zmlb7yXPloXpxA&usqp=CAU",
              }}
            />
          </View>
          <View style={styles.title}>
            <Text style={styles.txt}>{name}</Text>
            <Text numberOfLines={1}>
              {chater}: {message}
            </Text>
          </View>
        </View>
        <View style={styles.notseen}>
          <Text style={styles.num}>{notseen || 0}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  room: {
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#ccc",
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentWrap: {
    flexDirection: "row",
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 70,
    borderRadius: 10,
  },
  title: {
    paddingLeft: 10,
    justifyContent: "space-around",
    paddingVertical: 5,
    width: "60%",
    overflow: "hidden",
  },
  txt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notseen: {
    backgroundColor: color.red,
    padding: 5,
    width: 35,
    borderRadius: 25,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  num: {
    color: color.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
