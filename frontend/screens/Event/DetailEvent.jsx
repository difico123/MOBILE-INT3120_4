import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BigButton } from "../../components/ButtonComponent/BigButton";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
import { SmallButton } from "../../components/ButtonComponent/SmallButton";
import { BORDER_COLOR, MAIN_COLOR } from "../../components/common/CommonStyle";
import { DateCard } from "../../components/EventItem/DateCard";
import { EventInfo } from "../../components/EventItem/EventInfo";
import { SimpleLoading } from "../../components/LoadingComponent/simpleLoading";
import SlideModal from "../../components/modal/SlideModal";
import { UserModal } from "../../components/modal/UserModal";
import { MONTH } from "../../config/date";
import { wait } from "../../helpers/helpers";
import { addItem, removeItem } from "../../redux/actions/favorite_actions";
import { toEventResource } from "../../resources/events/EventResource";
import EventService from "../../service/EventService";
import UserService from "../../service/UserService";
import { OptionsModal } from "./OptionsModal";

moment.locale("vi");
export const DetailEvent = (navigation) => {
  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();
  const dispatch = useDispatch();

  const itemId = navigation.route.params.id;
  const [event, setEvent] = useState({});
  const [liked, setLiked] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [host, setHost] = useState({});
  const [modalOptionsVisible, setModalOptionsVisible] = useState(false);

  const [modalHostVisible, setModalHostVisible] = useState(false);
  useEffect(() => {
    const getEvent = async () => {
      const record = await EventService.getById(auth.token, itemId);
      setEvent(await toEventResource(record, auth.token));
      setLoading(false);
    };
    getEvent();
  }, []);

  useEffect(() => {
    const isLiked = async () => {
      setLiked(event.liked);
      setJoined(event.joined);
      wait(1000).then(() => setReady(true));
    };
    isLiked();
  }, [event]);

  const onJoinPress = async () => {
    const toggleJoin = await EventService.toggleJoinedPublicEvent(
      auth.token,
      event.id,
      joined ? "cancel" : "join"
    );
    if (toggleJoin) {
      alert(
        joined
          ? "Đã xóa khỏi danh sách tham gia"
          : "Đã thêm vào danh sách tham gia"
      );
    }
    setJoined(!joined);
  };
  const onLikePress = async () => {
    const likeOrDislike = await EventService.toggleLikedEvent(
      auth.token,
      event.id,
      liked ? "dislike" : "like"
    );
    if (likeOrDislike) {
      alert(
        liked
          ? "Đã xóa khỏi danh sách yêu thích"
          : "Đã thêm vào danh sách yêu thích"
      );
      if (liked) {
        dispatch(removeItem(event));
      } else {
        dispatch(addItem(event));
      }
      setLiked(!liked);
    } else {
      alert("Vui lòng tải lại trang");
    }
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

  const seeHostInfo = async () => {
    console.log("host info click");
    const getHostInfo = async () => {
      setReady(false);
      const host = await UserService.getUserById(auth.token, event.host_id);
      setReady(true);
      if (host) {
        setHost(host);
        setModalHostVisible(true);
      } else alert("Something went wrong.\nCan't get host information now");
    };
    getHostInfo();
  };

  const onOptionPress = () => {
    setModalOptionsVisible(true);
  };

  const handleSearchEvent = () => {
    const getEvents = async () => {
      setReady(false);
      const params = { topic: event.topic };
      const result = await EventService.getEvents(auth.token, params);
      setReady(true);
      nav.navigate("Tabs");
      nav.navigate("EventList", {
        data: result,
        searchEvent: event.topic,
        searchBy: "topic",
      });
    };
    getEvents();
  };
  return isLoading || !ready ? (
    <SimpleLoading></SimpleLoading>
  ) : (
    Object.keys(event).length > 0 && (
      <View style={styles.container}>
        <UserModal
          modalUserVisible={modalHostVisible}
          setModalUserVisible={setModalHostVisible}
          user={host}
        ></UserModal>

        <OptionsModal
          modalOptionsVisible={modalOptionsVisible}
          setModalOptionsVisible={setModalOptionsVisible}
          title="Tùy chọn"
        >
          <BigButton
            imageName="contact"
            text="Gửi mail tới host"
          ></BigButton>
          <BigButton imageName="report" text="Báo cáo"></BigButton>
        </OptionsModal>
        <ScrollView style={styles.scrollView}>
          <View style={styles.bannerContainer}>
            <Image
              style={styles.banner}
              source={{
                uri:
                  event.images && event.images.length > 0
                    ? event.images[0]
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42dec7jSJc9r9eJNqo-6s7S-JMANOe5_1uNd3ca6ZHObtoOGuf5ejxVzhODUTiIiA2lI&usqp=CAU",
              }}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.introContainer}>
              <View style={{ flex: 0.6 }}>
                <Text style={styles.introTime}>
                  {/* {event.start_at + " - " + event.end_at} */}
                  {event.start_date
                    ? moment(event.start_date).calendar().includes("/")
                      ? moment(event.start_date).format("Do MMMM, h:mm")
                      : moment(event.start_date).calendar()
                    : ""}
                </Text>
                <Text style={styles.introTitle}>{event.event_name}</Text>
                <Text style={styles.introLocation}>{event.location}</Text>
              </View>
              <DateCard item={event}></DateCard>
            </View>
            <View style={styles.main}>
              <Text style={styles.titleMain}>Chi tiết sự kiện</Text>

              {/* <EventInfo info={data.host} source={require('../../assets/sand-clock.png')}></EventInfo>| */}
              {event.duration ? (
                <EventInfo
                  info={event.duration}
                  source={require("../../assets/sand-clock.png")}
                ></EventInfo>
              ) : (
                <Text style={{ height: 0 }}></Text>
              )}
              <EventInfo
                info={event.host?.first_name + " " + event.host?.last_name}
                source={require("../../assets/flag.png")}
                host={{ id: event.host_id }}
                onPress={seeHostInfo}
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
                <SmallButton
                  title={event.topic}
                  onPress={handleSearchEvent}
                ></SmallButton>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 100 }}></View>
        </ScrollView>

        <View style={styles.actionContainer}>
          <View style={styles.actions}>
            <TouchableOpacity
              style={{
                ...styles.going,
                ...{ backgroundColor: joined ? MAIN_COLOR : "grey" },
              }}
              onPress={onJoinPress}
            >
              <Text style={styles.optionText}>Tham gia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.liked,
                ...{ backgroundColor: liked ? MAIN_COLOR : "grey" },
              }}
              onPress={onLikePress}
            >
              <Text style={styles.optionText}>Quan tâm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.other} onPress={onOptionPress}>
              <Text style={styles.optionText}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
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
    flex: 1,
  },
  introContainer: {
    marginHorizontal: 20,
    // marginTop: 10
    flex: 1,
    flexDirection: "row",
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
  going: {
    backgroundColor: "grey",
    flex: 0.3,
    justifyContent: "center",
    borderRadius: 10,
    height: 40,
    elevation: 10,
  },
  liked: {
    backgroundColor: "grey",
    marginLeft: 10,
    flex: 0.5,
    justifyContent: "center",
    borderRadius: 10,
    height: 40,
    elevation: 10,
  },
  other: {
    backgroundColor: MAIN_COLOR,
    marginLeft: 10,
    flex: 0.2,
    justifyContent: "center",
    borderRadius: 10,
    height: 40,
    elevation: 10,
  },
  optionText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
