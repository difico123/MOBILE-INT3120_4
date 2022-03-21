import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import EventList from "../screens/EventList";
import Home from "../screens/Home";
import Tabs from "./Tabs";

const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="EventList" component={EventList} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Navigation;
