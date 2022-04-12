import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Navigation from "./navigations";
export default function App() {
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
