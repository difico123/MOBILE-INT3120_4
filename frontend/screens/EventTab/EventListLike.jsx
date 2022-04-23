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
const EventListLike = ({ params }) => {
  const favorite = useSelector((state) => state.authReducers.favorite);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const auth = useSelector((state) => state.authReducers.auth);
  const [likedEvents, setLikedEvents] = useState(favorite);
  useEffect(() => {
    const getLikedEvents = async () => {
      const record = await EventService.getEvents(auth.token, { type: "like" });
      setLikedEvents([]);
      setLikedEvents(record);
      record.length !== favorite.length ? dispatch(updateList(record)) : "";
    };
    getLikedEvents();
  }, [refreshing, favorite]);

  const nav = useNavigation();
  const goToDetail = (id) => {
    nav.navigate("DetailEvent", { id });
  };
  const myFavoriteEvents = likedEvents.map((item, index) => (
    <EventItemHot item={item} key={index} onPress={() => goToDetail(item.id)} />
  ));

  return (
    <View style={styles.nav}>
      <SearchBar placeholder="Tìm kiếm sự kiện" />
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
