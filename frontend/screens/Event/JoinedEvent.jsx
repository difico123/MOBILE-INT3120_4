import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ImageButton } from "../../components/ButtonComponent/ImageButton";
import EventItemHot from "../../components/EventItem/EventItemHot";
import EventService from "../../service/EventService";

import SearchBar from "../../components/InputComponent/SearchBar";
import { nonAccentVietnamese } from "../../utils/convert";
export const JoinedEvent = () => {
  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const [page, setPage] = useState(1);

  const [isToggleNav, setToggleNav] = useState(false);

  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    (async () => {
      const record = await EventService.getEvents(auth.token, { type: "join" });
      setItems([...record]);
      setShowItems([...record]);
    })();
  }, []);
  //   console.log(items);
  const loadMoreItem = () => {
    const getMoreItem = async () => {
      const data = await EventService.getEvents(auth.token, {
        page: page + 1,
        type: "join",
      });
      if (data.length > 0) {
        const newData = [...items, ...data];
        setItems([...newData]);
        setShowItems([...newData]);
        setPage(page + 1);
      } else alert("Không còn sự kiện nào nữa");
    };
    getMoreItem();
  };
  const handleSearch = () => {
    if (keyword.trim() === "") setShowItems([...items]);
    const filterList = items.filter((event) => {
      return nonAccentVietnamese(event.event_name)
        .trim()
        .toLowerCase()
        .includes(keyword.trim().toLowerCase());
    });

    setShowItems([...filterList]);
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
      <ScrollView>
        {showItems.map((item, index) => (
          <EventItemHot
            item={item}
            key={index + item.id + 1}
            onPress={() => nav.navigate("DetailEvent", { id: item.id })}
          />
        ))}
        <ImageButton
          source={require("../../assets/down-arrow.png")}
          customImageStyle={{ height: 100, width: 100 }}
          containerStyle={{ alignItems: "center" }}
          onPress={loadMoreItem}
        />
        <View style={{ marginTop: 200 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
});
