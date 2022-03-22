import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../../components/InputComponent/CustomInput";
import CustomButton from "../../components/ButtonComponent/CustomButton";

const Signup = () => {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const auth = useSelector((state) => state.authReducers.auth);
    const onSignUnPressed = () => {
        console.warn("onSignUnPressed", email, password);
    };

    const onSignInPressed = () => {
        console.warn("onSignInGooglePressed");
        navigation.navigate("Signin");
    };

    const onSignUpPressed = () => {
        console.warn("onsignuppressed");
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <View>
                    <Image
                        style={[styles.logo, { height: height * 0.4 }, { marginBottom: 5 }]}
                        source={{
                            uri: "https://intphcm.com/data/upload/logo-the-thao-dep.jpg",
                        }}
                    />
                    <Text style={styles.title}>TẠO TÀI KHOẢN MỚI</Text>
                    <CustomInput placeholder="Tên người dùng" value={username} setValue={setUsername} icon={{ name: "user", type: "font-awesome" }} />
                    <CustomInput placeholder="Email" value={email} setValue={setEmail} icon={{ name: "email" }} />
                    <CustomInput placeholder="Mật khẩu" value={password} setValue={setPassword} secureTextEntry={true} icon={{ name: "lock" }} />
                    <CustomInput placeholder="Nhập lại mật khẩu" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true} icon={{ name: "lock" }} />
                    <CustomButton text="Đăng ký tài khoản" onPress={onSignUnPressed} />
                    <CustomButton text="Đã có tài khoản? Đăng nhập ngay" bgColor="transparent" onPress={onSignInPressed} type="tertiary" />
                </View>
            </View>
        </ScrollView>
    );
};

export default Signup;
const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        height: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
        textAlign: "center",
    },
    logo: {},
});
