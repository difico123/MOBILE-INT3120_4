import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import Tabs from "./Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export default function Nav() {
    const [authLogin, setAuthLogin] = useState(false);
    const auth = useSelector((state) => state.authReducers.auth);

    useEffect(() => {
        setAuthLogin(auth.isLogin);
    }, [auth.isLogin]);

    useEffect(() => {
        // console.log(auth.token, "ad");
        // Axios.get(`https://graph.facebook.com/me?access_token=${auth.token}&fields=id,name,email,picture.height(500)`).then((res) => {
        //     console.log(res.data);
        // });
    }, []);
    return (
        <NavigationContainer>
            <SafeAreaProvider>{!authLogin ? <AuthStack /> : <Tabs />}</SafeAreaProvider>
        </NavigationContainer>
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
