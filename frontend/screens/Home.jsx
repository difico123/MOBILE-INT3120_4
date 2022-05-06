import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  VirtualizedList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../components/InputComponent/SearchBar";
import HeaderLogo from "../components/Layout/HeaderLogo";
import EventItemIncomming from "../components/EventItem/EventItemIncomming";
import EventItemHot from "../components/EventItem/EventItemHot";
import CommonStyle from "../components/common/CommonStyle";

import { MAIN_COLOR, BORDER_COLOR } from "../components/common/CommonStyle";
import EventService from "../service/EventService";
import { toEventCollection } from "../resources/events/EventResource";
import { wait } from "../helpers/helpers";
import moment from "moment";
import { updateList } from "../redux/actions/favorite_actions";
import { updateListFriend } from "../redux/actions/friend_action";
import FriendService from "../service/FriendService";

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState("");
  const [allEvents, setAllEvents] = useState([]);

  const auth = useSelector((state) => state.authReducers.auth);
  const dispatch = useDispatch();
  const nav = useNavigation();

  useEffect(() => {
    if (isToggleNav) {
      navigation.setOptions({
        tabBarLabel: "Home",
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
        tabBarLabel: "Home",
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          borderWidth: 1,
          borderColor: BORDER_COLOR,
        },
      });
    }
  }, [isToggleNav]);

  useEffect(() => {
    (async () => {
      dispatch(
        updateList(await EventService.getEvents(auth.token, { type: "like" })) //update favorite list
      );
      const myFriends = await FriendService.getMyFriends(auth.token);
      if (myFriends) {
        dispatch(updateListFriend(myFriends.pagination.total_items));
      }
    })();
  }, [refreshing]);

  useEffect(() => {
    const getAll = async () => {
      setAllEvents(await EventService.getEvents(auth.token));
    };
    getAll();
  }, [refreshing]);

  const getItemCount = allEvents.length;
  const showEventList = () => {
    nav.navigate("EventList");
  };

  const EventHotList = allEvents.map((item, index) => (
    <EventItemHot
      item={item}
      key={index}
      onPress={() => goToDetail(item.id)}
      onFresh={refreshing}
    />
  ));

  const goToDetail = (id) => {
    nav.navigate("DetailEvent", { id });
  };

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    const updateUpcomingEvent = async () => {
      const record = await EventService.getEvents(auth.token, {
        start_at_start: moment().format("YYYY-MM-DD HH:mm:ss"),
        start_at_end: moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss"),
      });
      // console.log("upcoming", await toEventCollection(record));
      setUpcomingEvents(await toEventCollection(record));
    };
    updateUpcomingEvent();
  }, [refreshing]);

  const handleSearchEvent = () => {
    const getEvents = async () => {
      const data =  await EventService.getEvents(auth.token, {event_name: searchEvent});
      navigation.navigate("EventList", {data, searchEvent});
    };
    getEvents();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Tìm kiếm"
          setToggleNav={setToggleNav}
          setValue={setSearchEvent}
          value={searchEvent}
          onPress={handleSearchEvent}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.eventContainer}>
          <View style={[CommonStyle.spaceBetween]}>
            <TouchableOpacity>
              <Text style={styles.title}>Sự kiện sắp diễn ra</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={showEventList}>
              <Text style={styles.title}>Xem tất cả</Text>
            </TouchableOpacity> */}
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={upcomingEvents}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <EventItemIncomming
                item={item}
                key={index}
                onPress={() => goToDetail(item.id)}
              />
            )}
          />
        </View>
        <View style={styles.eventContainer}>
          <View style={[CommonStyle.spaceBetween, styles.hotEventTitle]}>
            <TouchableOpacity>
              <Text style={styles.title}>Sự kiện đang HOT</Text>
            </TouchableOpacity>
          </View>

          {/* <FlatList data={data} keyExtractor={(item) => item.id} renderItem={({ item, index }) => <EventItemHot item={item} key={index} />} /> */}

          {EventHotList}
          {/* <VirtualizedList data={data} initialNumToRender={4} renderItem={(item, index) => <EventItemHot item={item} key={index} />} keyExtractor={(item, index) => index} getItemCount={getItemCount} getItem={() => {}} /> */}
        </View>
        <View style={{ marginBottom: 140 }}></View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scroll: {
    overflow: "hidden",
    height: 10000,
  },
  container: {},
  header: {
    marginTop: 10,
    marginBottom: 5,
  },
  eventItem: {},
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {},
  eventContainer: {
    padding: 15,
  },
  hotEventTitle: {
    marginBottom: 10,
  },
});
