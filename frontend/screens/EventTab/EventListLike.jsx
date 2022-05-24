import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import EventItemHot from "../../components/EventItem/EventItemHot";
import SearchBar from "../../components/InputComponent/SearchBar";
import { useNavigation } from "@react-navigation/native";
import EventService from "../../service/EventService";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateList } from "../../redux/actions/favorite_actions";
import { wait } from "../../helpers/helpers";
import { border } from "../../theme";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
const EventListLike = ({ params, navigation }) => {
  const favorite = useSelector((state) => state.authReducers.favorite);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [isToggleNav, setToggleNav] = useState(false);
  useEffect(() => {
    if (isToggleNav) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
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
          borderColor: border.white,
        },
      });
    }
  }, [isToggleNav]);
  const auth = useSelector((state) => state.authReducers.auth);
  const [likedEvents, setLikedEvents] = useState(favorite);
  const [showLikedEvents, setShowLikedEvents] = useState(favorite);
  useEffect(() => {
    const getLikedEvents = async () => {
      const record = await EventService.getEvents(auth.token, { type: "like" });
      setLikedEvents([...record]);
      setShowLikedEvents([...record]);
      record.length !== favorite.length
        ? dispatch(updateList([...record]))
        : "";
    };
    getLikedEvents();
  }, [refreshing, favorite]);

  const nav = useNavigation();
  const goToDetail = (id) => {
    nav.navigate("DetailEvent", { id });
  };
  const handleSearch = () => {
    setRefreshing(true);
    if (keyword.trim() === "") setShowLikedEvents([...likedEvents]);
    const filterList = likedEvents.filter((event) =>
      event.event_name
        .trim()
        .toLowerCase()
        .includes(keyword.trim().toLowerCase())
    );
    setShowLikedEvents([...filterList]);

    setRefreshing(false);
  };
  const myFavoriteEvents = showLikedEvents.map((item, index) => (
    <EventItemHot
      item={item}
      key={item.id}
      onPress={() => goToDetail(item.id)}
    />
  ));
  const loadMoreItem = () => {
    const getMoreItem = async () => {
      const data = await EventService.getEvents(auth.token, {
        type: "like",
        page: page + 1,
      });
      if (data.length > 0) {
        setLikedEvents([...likedEvents, ...data]);
        setShowLikedEvents([...likedEvents, ...data]);
        setPage(page + 1);
      } else alert("Không còn sự kiện nào nữa");
    };
    getMoreItem();
  };
  return (
    <View style={styles.nav}>
      <SearchBar
        placeholder="Tìm kiếm"
        setToggleNav={setToggleNav}
        value={keyword}
        setValue={setKeyword}
        onPress={handleSearch}
      />

      <View style={styles.headerContainer}></View>

      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {myFavoriteEvents}

          <ImageButton
            source={require("../../assets/down-arrow.png")}
            customImageStyle={{ height: 100, width: 100 }}
            containerStyle={{ alignItems: "center" }}
            onPress={loadMoreItem}
          ></ImageButton>
          <View style={{ marginBottom: 200 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EventListLike;

const styles = StyleSheet.create({
  nav: {
    // marginTop: 20,
    // padding: 10,
  },
  contentContainer: {
    marginBottom: 160,
    padding: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
});
