import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import AuthStack from "./navigations/AuthStack";
import AppStack from "./navigations/AppStack";
import Tabs from "./navigations/Tabs";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    const [authLogin, setAuthLogin] = useState(true);

    useEffect(() => {}, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>{!authLogin ? <AuthStack /> : <Tabs />}</SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
