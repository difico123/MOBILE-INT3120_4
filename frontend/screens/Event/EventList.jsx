import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  LogBox,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
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
  const [items, setItems] = useState(navigation.route.params.data);
  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();

  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState(
    navigation.route.params.searchEvent
  );

  const [refreshing, setRefreshing] = useState(false);

  const navSearchBy = navigation.route.params.searchBy;
  const [searchBy, setSearchBy] = useState(
    navSearchBy &&
      navSearchBy.length > 0 &&
      filterType.includes(navSearchBy[0] || filterType.includes(navSearchBy[1]))
      ? navSearchBy
      : ["event_name"]
  );
  const [modalOptionsVisible, setModalOptionsVisible] = useState(false);

  // useEffect(() => {
  //   handleSearchEvent();
  // }, [refreshing]);

  const handleSearchEvent = (searchProperty = searchBy) => {
    const getEvents = async () => {
      let params = {};
      if (searchProperty.length == 2) {
        params = {
          event_name: searchEvent,
          topic: searchEvent,
        };
      } else if (searchProperty.length == 1) {
        params =
          searchProperty[0] == "topic"
            ? { topic: searchEvent }
            : { event_name: searchEvent };
      } else {
        // update
        params = { event_name: searchEvent };
      }
      const result = await EventService.getEvents(auth.token, params);
      setItems(result);
      nav.navigate("Profile");
      nav.navigate("EventList", {
        data: result,
        searchEvent,
        searchBy: searchProperty.length > 0 ? searchProperty : ["event_name"], //update
      });
    };
    getEvents();
  };


  const goToDetail = (id) => {
    nav.navigate("DetailEvent", { id });
  };

  const handleFilter = (type) => {
    let newSearchBy = searchBy;
    if (searchBy.includes(type)) {
      newSearchBy = searchBy.filter((item) => item != type);
    } else {
      newSearchBy.push(type);
    }
    setSearchBy(newSearchBy);
    handleSearchEvent(newSearchBy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Tìm kiếm"
          setToggleNav={setToggleNav}
          setValue={setSearchEvent}
          value={searchEvent}
          onPress={() => handleSearchEvent()}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
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
                backgroundColor: searchBy.includes("event_name")
                  ? "#E1ECF4"
                  : "grey",
                textColor: searchBy.includes("event_name")
                  ? "#39739D"
                  : "white",
              }}
              onPress={() => handleFilter("event_name")}
            ></SmallButton>
            <SmallButton
              title={"chủ đề"}
              onPress={() => handleFilter("topic")}
              customStyle={{
                backgroundColor: searchBy.includes("topic")
                  ? "#E1ECF4"
                  : "grey",
                textColor: searchBy.includes("topic") ? "#39739D" : "white",
              }}
            ></SmallButton>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <EventItemHot
                  item={item}
                  key={index}
                  onPress={() => goToDetail(item.id)}
                  onFresh={refreshing}
                />
              );
            }}
          />
          {/* {items.length > 0 ? (
            items.map((item, index) => (
              <EventItemHot
                item={item}
                key={index}
                onPress={() => goToDetail(item.id)}
                onFresh={refreshing}
              />
            ))
          ) : (
            <Text>Không có sự kiện nào!</Text>
          )} */}
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
