import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventList from "../screens/EventList";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Home from "../screens/Home";
import Me from "../screens/MeTab/Me";
import EventListLike from "../screens/EventListLike";
import EventCreate from "../screens/EventCreate";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();
import HeaderLogo from "../components/HeaderLogo";

const Tabs = () => {
    return (
        <>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <HeaderLogo />
            </View>
            <Tab.Navigator screenOptions={{ tabBarStyle: { display: "flex", position: "absolute", bottom: 15, left: 20, right: 20, elevation: 1, backgroundColor: "#FFFFFF", zIndex: 10, borderRadius: 10, height: 70, paddingBottom: 10, paddingTop: 5, gap: 0 } }} initialRouteName="Home">
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
                            <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                                <MaterialCommunityIcons name="home" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="EventListLike"
                    component={EventListLike}
                    options={{
                        tabBarLabel: "Đã Thích",
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarBadge: 12,
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                                <MaterialCommunityIcons name="heart" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="EventCreate"
                    component={EventCreate}
                    options={{
                        tabBarLabel: "Sự kiện",
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                                <MaterialCommunityIcons name="calendar" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Cá nhân"
                    component={Me}
                    options={{
                        tabBarLabel: "Me",
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={{ height: focused ? 50 : 40, alignItems: "center", textAlign: "center" }}>
                                <MaterialCommunityIcons name="account-box-outline" color={focused ? "rgba(75,119,190,1)" : "rgba(173, 216, 230,1)"} size={focused ? 50 : 40} />
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
