/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { facebookLogin } from "../redux/actions/auth_actions";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "./CustomButton";

const SocialSignInButtons = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authReducers.auth);

    const doLoginFB = () => {
        dispatch(facebookLogin());
    };

    return (
        <View style={{ marginTop: 20 }}>
            <CustomButton icon={{ name: "google", type: "font-awesome", color: "#FFFFFF", style: { backgroundColor: "rgba(255,255,255,0.2)", padding: 5, borderRadius: 5 } }} text="Đăng nhập với tài khoản google" ftColor="#E7EAF4" bgColor="#DD4D44" />
            <CustomButton onPress={doLoginFB} icon={{ name: "facebook", type: "font-awesome", color: "blue", style: { backgroundColor: "rgba(255,255,255,0.9", padding: 5, paddingLeft: 8, paddingRight: 8, borderRadius: 5 } }} text="Đăng nhập với tài khoản facebook" ftColor="#4765A9" bgColor="#E7EAF4" />
        </View>
    );
};

export default SocialSignInButtons;
