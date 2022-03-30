import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { FriendItem } from "../../components/FriendItem";
import SearchBar from "../../components/SearchBar";

export const Friend = () => {
  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState("");
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.header}>
          <SearchBar
            placeholder="Tìm kiếm"
            setToggleNav={setToggleNav}
            setValue={setSearchEvent}
            value={searchEvent}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.item}>
          <FriendItem
            name="Nông Lương Đức"
            avatar="https://www.w3schools.com/howto/img_avatar.png"
          ></FriendItem>
        </View>
        <View style={styles.item}>
          <FriendItem
            name="Nông Lương Đức"
            avatar="https://www.w3schools.com/howto/img_avatar.png"
          ></FriendItem>
        </View>
        <View style={{ marginBottom: 100 }}>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  header: {
    marginTop: 10,
    marginBottom: 5,
  },
  item: {
    marginRight: 200,
  }
});
