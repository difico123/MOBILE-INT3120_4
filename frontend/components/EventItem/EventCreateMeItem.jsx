import { StyleSheet, Text, View, Image } from "react-native";
import React, { memo, useMemo } from "react";
import { border, color, background } from "../../theme";
import moment from "moment";
export const EventCreateMeItem = memo(({ name, status, image, time }) => {
  const timeTx = useMemo(() => {
    return moment(time.start).format("MMMM Do YYYY, h:mm");
  }, [time]);

  const duration = useMemo(() => {
    let now = moment(time.start); //todays date
    let end = moment(time.end); // another date
    let duration = moment.duration(end.diff(now));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;
    return `${hours} giờ ${minutes} phút`;
  }, []);

  return (
    <View style={styles.containerWrap}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              image ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png",
          }}
        />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.time}>{timeTx}</Text>
        </View>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <View
        style={[
          styles.status,
          { backgroundColor: status ? background.active : background.inactive },
        ]}
      ></View>
    </View>
  );
});

const styles = StyleSheet.create({
  containerWrap: {
    padding: 2,
  },
  status: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    zIndex: 99,
  },
  container: {
    borderWidth: 1,
    height: "100%",
    alignItems: "center",
    borderRadius: 10,
    borderColor: border.black,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    width: "30%",
    borderRadius: 10,
    height: "100%",
    marginLeft: -10,
  },
  title: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    marginLeft: 10,
  },
  duration: {
    justifyContent: "flex-end",
    position: "absolute",
    right: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
});
