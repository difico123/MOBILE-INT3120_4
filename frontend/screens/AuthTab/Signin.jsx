import { View, Text, StyleSheet, useWindowDimensions, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { facebookLogin } from "../../redux/actions/auth_actions";
import { getFBLoginUser, setLogin } from "../../redux/actions/auth_actions";
import SocialSignInButtons from "../../components/ButtonComponent/SocialSignInButtons";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomInput from "../../components/InputComponent/CustomInput";
import AuthSerVice from "../../service/AuthService";
import { validateUser, validatePassword } from "../../utils/Validate";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        status: false,
        msg: "",
    });
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authReducers.auth);
    const { height } = useWindowDimensions();

    const [loading, setLoading] = useState({
        login: false,
        fbLogin: false,
        ggLogin: false,
    });
    const navigation = useNavigation();

    const onSignInPressed = async (e) => {
        if (validateUser(username).status) {
            setError(validateUser(username));
        } else if (validatePassword(password).status) {
            setError(validatePassword(password));
        } else {
            setLoading({ ...loading, login: true });
            AuthSerVice.signIn({ username: username, password })
                .then((res) => {
                    dispatch(setLogin(res.data.data.access_token));
                    setLoading({ ...loading, login: false });

                    setError({
                        status: false,
                        msg: "",
                    });
                })
                .catch((err) => {
                    setLoading({ ...loading, login: false });
                    console.log(err?.response?.data);

                    setError({
                        status: true,
                        msg: "T??i kho???n ho???c m???t kh???u kh??ng ????ng",
                    });
                });
        }
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    };

    const onSignUpPressed = () => {
        navigation.navigate("Signup");
    };
    const [showPw, setShowPw] = useState({
        name: "eye-slash",
        status: true,
    });
    const onEyePress = () => {
        if (!showPw.status) {
            setShowPw({
                name: "eye-slash",
                status: true,
            });
        } else {
            setShowPw({
                name: "eye",
                status: false,
            });
        }
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    style={[styles.logo, { height: height * 0.4 }, { marginBottom: 5 }]}
                    source={require('../../assets/logo.jpg')}
                />
                <CustomInput placeholder="Username" value={username} setValue={setUsername} icon={{ name: "user", type: "font-awesome" }} />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={showPw.status}
                    icon={{ name: "lock" }}
                    iconRight={{ name: showPw.name, type: "font-awesome" }}
                    onPress={onEyePress}
                />
                {error.status && <Text style={{ color: "red", paddingTop: 5 }}>{error.msg}</Text>}
                <View style={styles.buttons}>
                    <CustomButton text="????ng Nh???p" onPress={onSignInPressed} loading={loading.login} />
                    <SocialSignInButtons loading={loading} setLoading={setLoading} />
                    {/* <CustomButton text="Qu??n m???t kh???u" onPress={onForgotPasswordPressed} type="tertiary" /> */}
                    <CustomButton text="Ch??a c?? t??i kho???n? T???o t??i kho???n ngay" onPress={onSignUpPressed} bgColor="transparent" type="tertiary" />
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
        borderRadius: 100
    },
    buttons: {
        marginTop: 25,
        width: "100%",
    },
});

export default Signin;
