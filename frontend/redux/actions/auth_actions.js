import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_SUCCESS, LOGOUT, GET_USER_INFO } from "./type.js";
import * as Facebook from "expo-facebook";
import AuthService from "../../service/AuthService";

const doFacebookLogin = async (dispatch) => {
    try {
        await Facebook.initializeAsync({
            appId: "1112246939320622",
        });
        const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ["public_profile"],
        });
        if (type === "success") {
            await AsyncStorage.setItem("fbLogin", token);
            dispatch({ type: LOGIN_SUCCESS, token: token });
            AuthService.getFbUser(token).then((res) => {
                const user = {
                    id: res.data.id,
                    name: res.data.name,
                    imageUrl: res.data.picture.data.url,
                };
                dispatch({ type: GET_USER_INFO, user: user });
            });
        } else {
            // type === 'cancel'
            dispatch({ type: LOGOUT, token: null });
            await AsyncStorage.setItem("fbLogin", null);
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
};

export const getLoginUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_INFO, user: user });
    } catch (err) {
        console.log(err);
    }
};

export const facebookLogin = () => async (dispatch) => {
    try {
        let token = await AsyncStorage.getItem("fbLogin");
        if (token) {
            await AuthService.getFbUser(token)
                .then((res) => {
                    const data = { ...res.data };
                    const user = {
                        id: data.id,
                        name: data.name,
                        imageUrl: data.picture.data.url,
                    };
                    dispatch({ type: GET_USER_INFO, user });
                })
                .catch((err) => {
                    console.log(err);
                });

            dispatch({ type: LOGIN_SUCCESS, token: token });
        } else {
            await doFacebookLogin(dispatch);
        }
    } catch (err) {
        console.warn(err);
    }
};

export const setLogin = (token) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_SUCCESS, token: token });
    } catch (err) {
        console.warn(err);
    }
};

export const setLogout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT });
    } catch (err) {
        console.warn(err);
    }
};
