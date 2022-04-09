import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import EventList from "../screens/EventTab/EventList";
import Home from "../screens/Home";
import Tabs from "./Tabs";
import Profile from "../screens/MeTab/Profile";
import { PasswordChange } from "../screens/MeTab/PasswordChange";
import { InfoChange } from "../screens/MeTab/InfoChange";
import { Friend } from "../screens/MeTab/Friend";
import MapScreen from "../screens/MapScreen/MapScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="EventList" component={EventList} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Change Password" component={PasswordChange} />
            <Stack.Screen name="Change Information" component={InfoChange} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen
                name="Friend"
                component={Friend}
                options={{
                    title: "Bạn bè",
                    headerStyle: {
                        backgroundColor: "transparent",
                        elevator: 0,
                    },
                }}
            />
        </Stack.Navigator>
    );
};

export default Navigation;
