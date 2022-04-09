/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { facebookLogin, setLogin, getLoginUser } from "../../redux/actions/auth_actions";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "./CustomButton";
import AuthService from "../../service/AuthService";

const SocialSignInButtons = ({ loading, setLoading }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authReducers.auth);

    const doLoginFB = async () => {
        setLoading({ ...loading, fbLogin: true });
        await dispatch(facebookLogin());
        setLoading({ ...loading, fbLogin: false });
    };

    useEffect(() => {
        // get fb login user info
        // let token = auth.token;
        // console.log(token);
        // if (token) {
        //     AuthService.getFbUser(token).then((user) => {
        //         dispatch(getLoginUser(user.data));
        //     });
        // }
    }, [auth.token]);

    return (
        <View style={{ marginTop: 20 }}>
            <CustomButton loading={loading.ggLogin} icon={{ name: "google", type: "font-awesome", color: "#FFFFFF", style: { backgroundColor: "rgba(255,255,255,0.2)", padding: 5, borderRadius: 5 } }} text="Đăng nhập với tài khoản google" ftColor="#E7EAF4" bgColor="#DD4D44" />
            <CustomButton loading={loading.fbLogin} onPress={doLoginFB} icon={{ name: "facebook", type: "font-awesome", color: "blue", style: { backgroundColor: "rgba(255,255,255,0.9", padding: 5, paddingLeft: 8, paddingRight: 8, borderRadius: 5 } }} text="Đăng nhập với tài khoản facebook" ftColor="#4765A9" bgColor="#E7EAF4" />
        </View>
    );
};

export default SocialSignInButtons;
