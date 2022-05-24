import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
import EventItemHot from "../../components/EventItem/EventItemHot";
import SearchBar from "../../components/InputComponent/SearchBar";
import EventService from "../../service/EventService";
import { nonAccentVietnamese } from "../../utils/convert";

export const RequestEvent = ({ route }) => {
  const isInvited = route.params.invited;
  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const [page, setPage] = useState(1);

  const [isToggleNav, setToggleNav] = useState(false);

  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    (async () => {
      const events = await EventService.getEventRequests(auth.token);
      setItems([...events]);
      setShowItems([...events]);
    })();
  }, []);
  const loadMoreItem = () => {
    const getMoreItem = async () => {
      const data = await EventService.getEventRequests(auth.token, {
        page: page + 1,
      });
      console.log(data);
      if (data.length > 0) {
        setItems([...items, ...data]);

        setShowItems([...items, ...data]);

        setPage(page + 1);
      } else alert("Không còn sự kiện nào nữa");
    };
    getMoreItem();
  };
  const handleSearch = () => {
    // setRefreshing(true);
    if (keyword.trim() === "") setShowItems([...items]);
    const filterList = items.filter((event) =>
      nonAccentVietnamese(event.event_name)
        .trim()
        .toLowerCase()
        .includes(keyword.trim().toLowerCase())
    );
    setShowItems([...filterList]);

    // setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm"
        setToggleNav={setToggleNav}
        value={keyword}
        setValue={setKeyword}
        onPress={handleSearch}
      />
      <View style={{ marginBottom: 20 }}></View>
      <ScrollView>
        {showItems &&
          showItems.length > 0 &&
          showItems.map((item, index) => (
            <EventItemHot
              item={item}
              key={index}
              onPress={() =>
                nav.navigate("DetailEvent", {
                  id: item.event_id,
                  invited: isInvited,
                })
              }
            />
          ))}
        {showItems && showItems.length > 0 ? (
          <ImageButton
            source={require("../../assets/down-arrow.png")}
            customImageStyle={{ height: 100, width: 100 }}
            containerStyle={{ alignItems: "center" }}
            onPress={loadMoreItem}
          />
        ) : (
          <Text>Chưa có lời mời</Text>
        )}
        <View style={{ marginTop: 100 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
