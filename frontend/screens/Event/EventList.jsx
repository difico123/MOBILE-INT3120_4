import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Picker } from "react-native";
import { useSelector } from "react-redux";
import { SmallButton } from "../../components/ButtonComponent/SmallButton";
import EventItemHot from "../../components/EventItem/EventItemHot";
import SearchBar from "../../components/InputComponent/SearchBar";
import EventService from "../../service/EventService";
import { color } from "../../theme";

const typePicker = {
  today: "Hôm nay",
  tomorrow: "Ngày mai",
  yesterday: "Ngày hôm qua",
  thisWeek: "Tuần này",
  thisMonth: "Tháng này",
  thisYear: "Năm nay",
  none: "Chọn",
};
export const EventList = (navigation) => {
  const filterType = ["event_name", "topic"];
  const [items, setItems] = useState([...navigation.route.params.data]);
  const [showItems, setShowItems] = useState(items);
  const auth = useSelector((state) => state.authReducers.auth);
  const nav = useNavigation();

  const [isToggleNav, setToggleNav] = useState(false);
  const [searchEvent, setSearchEvent] = useState(
    navigation.route.params.searchEvent
  );

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(0);
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

  const [selectedValue, setSelectedValue] = useState("Lọc");

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
      setItems([...result]);
      setShowItems([...result]);
      nav.navigate("Home");
      nav.navigate("EventList", {
        data: [...result],
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

  const showMode = (currentMode, type) => {
    setShow(type === "start" ? 1 : 2);
    setMode(currentMode);
  };
  const showTimepicker = useCallback(
    (type) => {
      showMode("time", type);
    },
    [show]
  );
  const showDatepicker = useCallback(
    (type) => {
      showMode("date", type);
    },
    [show]
  );
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date(),
  });
  const onChange = (event, selectedDate) => {
    let value = { ...date };
    if (show === 1) {
      value.start = selectedDate;
    } else {
      value.end = selectedDate;
    }
    setShow(0);
    setDate(value);
  };

  const onChangePicker = async (itemValue, itemIndex) => {
    console.log(itemValue);
    let activeEventList = [];
    if (itemValue === typePicker.today) {
      activeEventList = await EventService.getEvents(auth.token, {
        start_at_start: moment().format("YYYY-MM-DD HH:mm:ss"),
        start_at_end: moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss"),
      });
    } else if (itemValue === typePicker.tomorrow) {
      activeEventList = await EventService.getEvents(auth.token, {
        start_at_start: moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss"),
        start_at_end: moment().add(2, "days").format("YYYY-MM-DD HH:mm:ss"),
      });
    } else if (itemValue === typePicker.yesterday) {
      activeEventList = await EventService.getEvents(auth.token, {
        start_at_start: moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss"),
        start_at_end: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    } else if (itemValue === typePicker.thisMonth) {
      activeEventList = await EventService.getEvents(auth.token, {
        start_at_start: moment().startOf("month").format("YYYY-MM-DD hh:mm"),
        start_at_end: moment().endOf("month").format("YYYY-MM-DD hh:mm"),
      });
    } else if (itemValue === typePicker.thisWeek) {
      activeEventList = await EventService.getEvents(auth.token, {
        start_at_start: moment().startOf("week").format("YYYY-MM-DD hh:mm"),
        start_at_end: moment().endOf("week").format("YYYY-MM-DD hh:mm"),
      });
    } else if (itemValue === typePicker.thisYear) {
      activeEventList = await EventService.getEvents(auth.token, {
        start_at_start: moment().startOf("year").format("YYYY-MM-DD hh:mm"),
        start_at_end: moment().endOf("year").format("YYYY-MM-DD hh:mm"),
      });
    } else {
      activeEventList = [...items];
    }
    const result = [];
    for (let j = 0; j < activeEventList.length; j++) {
      for (let i = 0; i < items.length; i++) {
        if (activeEventList[j].id === items[i].id) {
          result.push(items[i]);
        }
      }
    }
    setShowItems([...result]);
    setSelectedValue(itemValue);
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
        <View style={styles.eventContainer}>
          <View style={styles.plusWrap}>
            <Text style={[styles.filter, styles.title]}>{selectedValue}</Text>
            {/* <Icon name="filter" type="font-awesome" color={background.gray} /> */}

            <Picker
              style={[styles.picker]}
              selectedValue={selectedValue}
              onValueChange={onChangePicker}
            >
              <Picker.Item label={typePicker.none} value={typePicker.none} />
              <Picker.Item label={typePicker.today} value={typePicker.today} />
              <Picker.Item
                label={typePicker.tomorrow}
                value={typePicker.tomorrow}
              />
              <Picker.Item
                label={typePicker.yesterday}
                value={typePicker.yesterday}
              />
              <Picker.Item
                label={typePicker.thisWeek}
                value={typePicker.thisWeek}
              />
              <Picker.Item
                label={typePicker.thisMonth}
                value={typePicker.thisMonth}
              />
              <Picker.Item
                label={typePicker.thisYear}
                value={typePicker.thisYear}
              />
            </Picker>
          </View>
          <View
            style={{ flexDirection: "row", marginBottom: 20, marginLeft: 15 }}
          >
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
          {showItems.length > 0 ? (
            showItems.map((item, index) => (
              <EventItemHot
                item={item}
                key={index}
                onPress={() => goToDetail(item.id)}
                onFresh={refreshing}
              />
            ))
          ) : (
            <Text>Không có sự kiện nào!</Text>
          )}
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
    // padding: 15,
  },
  hotEventTitle: {
    marginBottom: 10,
  },
  filter: {
    width: 30,
    height: 30,
    marginTop: -10,
  },
  plusWrap: {
    // paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
  },
  filter: {
    marginRight: 7,
  },
  filterBox: { flex: 7 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.blackText,
  },
  picker: {
    borderRadius: 50,
    width: 35,
  },
  waitingList: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
});
