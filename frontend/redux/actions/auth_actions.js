import AsyncStorage from '@react-native-async-storage/async-storage';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, GET_USER_INFO, LOGIN, LOGOUT } from './type.js';
import * as Facebook from 'expo-facebook';
import AuthService from '../../service/AuthService';

import axios from 'axios';
const doFacebookLogin = async (dispatch) => {
    try {
        await Facebook.initializeAsync({
            appId: '1112246939320622',
        });
        const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
            // let user = await response.json();

            // axios.get(`https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events`).then((user) => {
            //     console.log("userrrrrrrrrrrrrr", user);
            //     dispatch({ type: GET_USER_INFO, user: user.data });
            //     console.log("ok");
            // });
            AuthService.getFbUser(token).then((user) => {
                dispatch({ type: GET_USER_INFO, user: user.data });
            });
        } else {
            // type === 'cancel'
            dispatch({ type: FACEBOOK_LOGIN_FAIL, token: null });
            return 0;
        }

        await AsyncStorage.setItem('fbLogin', token);
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, token: token });
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
};

export const getFBLoginUser = (token) => async (dispatch) => {
    // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
    // let user = await response.json();
    // dispatch({ type: GET_USER_INFO, user: user });

    AuthService.getFbUser(token).then((user) => {
        dispatch({ type: GET_USER_INFO, user: user });
    });
};
export const updateEmail = (email) => async (dispatch) => {
    try {
        // dispatch({ type: UPDATE_EMAIL, email: email });
        // console.log("update email");

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });

        dispatch({ type: UPDATE_EMAIL, email: email });
        // console.log(email);
    } catch (err) {}
};

export const facebookLogin = () => async (dispatch) => {
    try {
        let token = await AsyncStorage.getItem('fbLogin');
        if (token) {
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, token: token });
        } else {
            await doFacebookLogin(dispatch);
        }
    } catch (err) {
        console.warn(err);
    }
};

export const setLogin = () => async (dispatch) => {
    try {
        dispatch({ type: LOGIN });
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
