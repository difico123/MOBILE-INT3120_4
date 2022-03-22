import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { facebookLogin } from "../../redux/actions/auth_actions";
import { getFBLoginUser, setLogin } from "../../redux/actions/auth_actions";
import SocialSignInButtons from "../../components/ButtonComponent/SocialSignInButtons.js";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomInput from "../../components/InputComponent/CustomInput";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authReducers.auth);
    const { height } = useWindowDimensions();

    const [loading, setLoading] = useState({
        login: false,
        fbLogin: false,
        ggLogin: false,
    });
    const navigation = useNavigation();

    const submit = () => {
        console.log("ok");
    };

    const onSignInPressed = async (e) => {
        setLoading({ ...loading, login: true });
        await axios.get(`https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events`).then((user) => {
            console.log("userrrrrrrrrrrrrr", user.data);

            dispatch(setLogin("abc"));
            setLoading({ ...loading, login: false });
        });
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    };

    const onSignUpPressed = () => {
        console.warn("onsignuppressed");
        navigation.navigate("Signup");
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    style={[styles.logo, { height: height * 0.4 }, { marginBottom: 5 }]}
                    source={{
                        uri: "https://intphcm.com/data/upload/logo-the-thao-dep.jpg",
                    }}
                />
                <CustomInput placeholder="Email" value={email} setValue={setEmail} icon={{ name: "email" }} />
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} icon={{ name: "lock" }} />

                <View style={styles.buttons}>
                    <CustomButton text="Đăng Nhập" onPress={onSignInPressed} loading={loading.login} />
                    <SocialSignInButtons loading={loading} setLoading={setLoading} />
                    {/* <CustomButton text="Quên mật khẩu" onPress={onForgotPasswordPressed} type="tertiary" /> */}
                    <CustomButton text="Chưa có tài khoản? Tạo tài khoản ngay" onPress={onSignUpPressed} bgColor="transparent" type="tertiary" />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: "100%",
        maxWidth: 300,
        maxHeight: 250,
        resizeMode: "contain",
    },
    buttons: {
        marginTop: 25,
        width: "100%",
    },
});

export default Signin;
