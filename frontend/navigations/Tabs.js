import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventList from "../screens/EventList";
import { SafeAreaView, View, Text } from "react-native";
import Home from "../screens/Home";
import Me from "../screens/Me";
import EventListLike from "../screens/EventListLike";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { position: "absolute", bottom: 15, left: 20, right: 20, elevation: 1, backgroundColor: "#ffffff", borderRadius: 10, height: 75, paddingBottom: 10, paddingTop: 5, gap: 0 } }}>
            <Tab.Screen
                name="EventListLike"
                component={EventListLike}
                options={{
                    tabBarLabel: "Đã Thích",
                    tabBarLabelStyle: ({ color, size, focused }) => {
                        console.log(color);
                    },
                    tabBarBadge: 12,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                            <MaterialCommunityIcons name="heart" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="EventList"
                component={EventList}
                options={{
                    tabBarLabel: "Sự kiện",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                            <MaterialCommunityIcons name="calendar" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                            <MaterialCommunityIcons name="home" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Me"
                component={Me}
                options={{
                    tabBarLabel: "Me",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                            <MaterialCommunityIcons name="account-box-outline" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
