import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { BigButton } from "../../components/ButtonComponent/BigButton";
import { SmallButton } from "../../components/ButtonComponent/SmallButton";
import EventItemHot from "../../components/EventItem/EventItemHot";
import SearchBar from "../../components/InputComponent/SearchBar";
import { wait } from "../../helpers/helpers";
import EventService from "../../service/EventService";
import { OptionsModal } from "./OptionsModal";

export const EventList = (navigation) => {
  const filterType = ["event_name", "topic"];
  const items = navigation.route.params.data;
  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();

  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState(
    navigation.route.params.searchEvent
  );

  const [refreshing, setRefreshing] = useState(false);

  const [searchBy, setSearchBy] = useState(
    filterType.includes(navigation.route.params.searchBy)
      ? navigation.route.params.searchBy
      : "event_name"
  );
  
  const [modalOptionsVisible, setModalOptionsVisible] = useState(false);

  const handleSearchEvent = (type = searchBy) => {
    const getEvents = async () => {
      const params =
        type == "topic" ? { topic: searchEvent } : { event_name: searchEvent };
      const result = await EventService.getEvents(auth.token, params);
      nav.navigate("Tabs");
      nav.navigate("EventList", {
        data: result,
        searchEvent,
        searchBy: type ?? "event_name",
      });
    };
    getEvents();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleSearchEvent(searchBy);
    setRefreshing(false);
  }, []);

  const goToDetail = (id) => {
    nav.navigate("DetailEvent", { id });
  };

  const EventItemList = items.map((item, index) => (
    <EventItemHot
      item={item}
      key={index}
      onPress={() => goToDetail(item.id)}
      onFresh={refreshing}
    />
  ));
  const handleFilter = (type) => {
    setSearchBy(type);
    handleSearchEvent(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Tìm kiếm"
          setToggleNav={setToggleNav}
          setValue={setSearchEvent}
          value={searchEvent}
          onPress={() => handleSearchEvent(searchBy)}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <OptionsModal
          modalOptionsVisible={modalOptionsVisible}
          setModalOptionsVisible={setModalOptionsVisible}
          title="Lọc"
        >
          <BigButton imageName="time" text="Thời gian"></BigButton>
          <BigButton imageName="location" text="Địa điểm"></BigButton>
        </OptionsModal>
        <View style={styles.eventContainer}>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => setModalOptionsVisible(true)}
            >
              <Image
                style={styles.filter}
                source={require("./data/image/action/filter.png")}
              />
            </TouchableOpacity>

            <SmallButton
              title={"tên sự kiện"}
              customStyle={{
                width: "30%",
                backgroundColor: searchBy == "event_name" ? "#E1ECF4" : "grey",
                textColor: searchBy == "event_name" ? "#39739D" : "white",
              }}
              onPress={() => handleFilter("event_name")}
            ></SmallButton>
            <SmallButton
              title={"chủ đề"}
              onPress={() => handleFilter("topic")}
              customStyle={{
                backgroundColor: searchBy == "topic" ? "#E1ECF4" : "grey",
                textColor: searchBy == "topic" ? "#39739D" : "white",
              }}
            ></SmallButton>
          </View>

          {EventItemList}
        </View>
        <View style={{ marginBottom: 140 }}></View>
      </ScrollView>
    </View>
  );
};

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
  filter: {
    width: 30,
    height: 30,
    marginTop: -10,
  },
});
