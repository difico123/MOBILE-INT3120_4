import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, LogBox } from "react-native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { disconnectSocket, initSocket } from "./service/socket";
import Navigation from "./navigations";

LogBox.ignoreAllLogs();
export default function App() {
    useEffect(() => {
        initSocket();
        return () => {
            disconnectSocket();
        };
    }, []);
    return (
        <Provider store={store}>
            <Navigation />
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
