import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import Home from "../screens/Home";
import Me from "../screens/MeTab/Me";
import HeaderLogo from "../components/Layout/HeaderLogo";
import EventList from "../screens/EventTab/EventList";
import EventCreateMe from "../screens/EventTab/EventCreateMe";
import EventListLike from "../screens/EventTab/EventListLike";
import {
  BORDER_COLOR,
  MAIN_COLOR,
  SECOND_COLOR,
} from "../components/common/CommonStyle";
import { useSelector } from "react-redux";
import Rooms from "../screens/ChatScreen/Rooms";
import ChatService from "../service/ChatService";
import { useEffect } from "react";
import { useState } from "react";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const favorite = useSelector((state) => state.authReducers.favorite);
  const [eventLength, setEventLength] = useState(0);
  useEffect(() => {
    (async () => {
      let res = await ChatService.getChatRooms();
      setEventLength(res?.data?.items?.length);
    })();
  }, []);
  return (
    <>
      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <HeaderLogo />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            display: "flex",
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 1,
            backgroundColor: "#FFFFFF",
            zIndex: 10,
            borderRadius: 10,
            height: 70,
            paddingBottom: 10,
            paddingTop: 5,
            borderWidth: 1,
            borderColor: BORDER_COLOR,
          },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarShowLabel: false,
            headerShown: false,
            headerTitle: (props) => <Text>abc</Text>,
            tabBarStyle: { display: "none" },
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  height: focused ? 50 : 40,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="home"
                  color={focused ? MAIN_COLOR : SECOND_COLOR}
                  size={focused ? 50 : 40}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="EventListLike"
          component={EventListLike}
          options={{
            tabBarLabel: "???? Th??ch",
            tabBarShowLabel: false,
            headerShown: false,
            tabBarBadge: favorite.length,
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  height: focused ? 50 : 40,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="heart"
                  color={focused ? MAIN_COLOR : SECOND_COLOR}
                  size={focused ? 50 : 40}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="EventCreateMe"
          component={EventCreateMe}
          options={{
            tabBarLabel: "S??? ki???n",
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  height: focused ? 50 : 40,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  color={focused ? MAIN_COLOR : SECOND_COLOR}
                  size={focused ? 50 : 40}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Room"
          component={Rooms}
          options={{
            tabBarLabel: "Room",
            tabBarShowLabel: false,
            headerShown: false,
            tabBarBadge: eventLength,
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  height: focused ? 50 : 40,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="chat"
                  color={focused ? MAIN_COLOR : SECOND_COLOR}
                  size={focused ? 50 : 40}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="C?? nh??n"
          component={Me}
          options={{
            tabBarLabel: "Me",
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  height: focused ? 50 : 40,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="account-box-outline"
                  color={focused ? MAIN_COLOR : SECOND_COLOR}
                  size={focused ? 50 : 40}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  homeTitleStyle: {},
});
