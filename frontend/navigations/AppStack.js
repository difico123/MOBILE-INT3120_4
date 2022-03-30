import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import EventList from "../screens/EventList";
import Home from "../screens/Home";
import Tabs from "./Tabs";
import Profile from "../screens/MeTab/Profile";
import {PasswordChange} from "../screens/MeTab/PasswordChange";
import { InfoChange } from "../screens/MeTab/InfoChange";
import { Friend } from "../screens/MeTab/Friend";
const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="EventList" component={EventList} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Change Password" component={PasswordChange} />
            <Stack.Screen name="Change Information" component={InfoChange} />
            <Stack.Screen name="Friend" component={Friend} />
        </Stack.Navigator>
    );
};

export default Navigation;
