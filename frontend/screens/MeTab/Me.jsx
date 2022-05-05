import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import CustomTextBox from "../../components/InputComponent/CustomTextBox";
import { getLoginUser, setLogout } from "../../redux/actions/auth_actions";
import { useNavigation } from "@react-navigation/native";
import Profile from "./Profile";
import { SimpleInfoBox } from "../Event/data/components/SimpleInfoBox";
import { SimpleStatistic } from "../../components/StatisticComponent/SimpleStatistic";
import { VerticalLine } from "../../components/common/VerticalLine";
import { CustomInfoItem } from "../Event/data/components/CustomInfoItem";
import { HorizontalLine } from "../../components/common/HorizontalLine";
import { StatisticBox } from "../../components/StatisticComponent/StatisticBox";
import { StatisticItem } from "../../components/StatisticComponent/StatisticItem";
import CustomSwitch from "../../components/switch/Switch";
import { updateListFriend } from "../../redux/actions/friend_action";
import FriendService from "../../service/FriendService";

const Me = () => {
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(setLogout());
  };
  const navigation = useNavigation();

  const auth = useSelector((state) => state.authReducers.auth);
  const favorite = useSelector((state) => state.authReducers.favorite);
  const events = useSelector((state) => state.authReducers.events);
  const friend = useSelector((state) => state.authReducers.friend);

  const [isEnabledCopyToCalender, setEnabledCopyToCalender] = useState(false);
  const toggleSwitchCopyToCalender = () =>
    setEnabledCopyToCalender((previousState) => !previousState);

  const onProfilePress = () => {
    navigation.navigate("Profile");
  };
  const onFriendPress = () => {
    navigation.navigate("Friend");
  };
  console.log(auth.user);
  const hostNameObject = {
    lastName: auth?.user.last_name ?? "",
    firstName: auth?.user.first_name ?? "",
  };
  const hostName = hostNameObject.firstName + " " + hostNameObject.lastName;
  const avatar = auth?.user.avatar?.includes("http")
    ? { uri: auth?.user.avatar }
    : require("../../assets/avatar-default-icon.png");

  useEffect(() => {
    (async () => {
      dispatch(
        updateListFriend(
          (await FriendService.getMyFriends(auth.token)).pagination.total_items
        )
      );
    })();
  });
  console.log(hostName, "hostName");
  return (
    <View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.nav}>
          <View style={styles.top}>
            <Image style={styles.avatar} source={avatar} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.hostName} onPress={onProfilePress}>
                {hostName == " " ? "<Cập nhật tên>" : hostName}
              </Text>
              <Pressable onPress={onProfilePress}>
                <Image
                  style={styles.editIcon}
                  source={require("../../assets/edit-text.png")}
                />
              </Pressable>
            </View>
            <SimpleInfoBox host={auth.user}></SimpleInfoBox>
          </View>

          <View style={styles.general}>
            <SimpleStatistic
              number={favorite.length}
              title={"Favorites"}
              onPress={() => navigation.navigate("EventListLike")}
            ></SimpleStatistic>
            <VerticalLine></VerticalLine>
            <SimpleStatistic
              number={events.length}
              title={"My events"}
              onPress={() => navigation.navigate("EventCreateMe")}
            ></SimpleStatistic>
            <VerticalLine></VerticalLine>
            <SimpleStatistic
              number={friend}
              title={"Friends"}
              onPress={onFriendPress}
            ></SimpleStatistic>
          </View>

          <View style={styles.notification}>
            <CustomInfoItem
              source={require("../../assets/bell.png")}
              info="Notification centre"
            ></CustomInfoItem>
          </View>

          <HorizontalLine></HorizontalLine>

          <StatisticBox title="Settings">
            <StatisticItem title="Copy events to calendar">
              <CustomSwitch
                isEnabled={isEnabledCopyToCalender}
                toggleSwitch={toggleSwitchCopyToCalender}
              />
            </StatisticItem>
            <HorizontalLine></HorizontalLine>
            <StatisticItem
              title="Manage events"
              touchable={true}
              onPress={() => alert("Manage events")}
            ></StatisticItem>
            <HorizontalLine></HorizontalLine>
            <StatisticItem
              title="Account settings"
              touchable={true}
              onPress={onProfilePress}
            ></StatisticItem>

            <HorizontalLine></HorizontalLine>
          </StatisticBox>
          {/* <View style={styles.main}>
            <TouchableOpacity style={styles.content} onPress={onProfilePress}>
              <CustomTextBox text={"See my profile"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.content}>
              <CustomTextBox text={"Check my calendar"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.content} onPress={onFriendPress}>
              <CustomTextBox text={"Friends"} />
            </TouchableOpacity>
          </View> */}
          <View style={styles.buttonBox}>
            <Button
              onPress={onSignOut}
              title="Sign Out"
              style={styles.buttonSignout}
            />
          </View>
          <View style={{ marginBottom: 150 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    // marginTop: 20,
  },
  top: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    borderRadius: 100,
    maxWidth: "100%",
    maxHeight: "100%",
    width: 120,
    height: 120,
    // marginBottom: 10
  },
  hostName: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  editIcon: {
    height: 18,
    width: 18,
    marginTop: 20,
    marginLeft: 5,
  },
  general: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  notification: {
    marginLeft: 20,
    marginTop: 10,
  },
  camera: {
    color: "black",
    fontSize: 20,
  },
  main: {
    backgroundColor: "#C4C4C4",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    borderRadius: 20,
  },
  content: {
    marginHorizontal: 10,
  },
  buttonBox: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  buttonSignout: {
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // paddingVertical: 20,
    flexGrow: 0,
    height: "100%",
  },
});
export default Me;
