import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { connect } from "react-redux";
import { facebookLogin } from '../redux/actions/auth_actions';
import { useDispatch, useSelector } from 'react-redux';
import { getFBLoginUser, setLogin } from '../redux/actions/auth_actions';
import SocialSignInButtons from '../components/SocialSignInButtons.js';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authReducers.auth);
    const { height } = useWindowDimensions();

    const [loading, setLoading] = useState({
        login: false,
        fbLogin: false,
        ggLogin: false,
    });
    const navigation = useNavigation();
    const [user, setUser] = useState({});

    const submit = () => {
        console.log('ok');
    };
    useEffect(() => {
        // (async () => {
        //     const response = await fetch(`https://graph.facebook.com/me?access_token=${auth.token}&fields=id,name,email,picture.height(500)`);
        //     let userInfo = await response.json();
        //     setUser(userInfo);
        //     console.log(auth.token, "abc");
        //     dispatch(getFBLoginUser())
        // })();
        console.log(auth);
    }, [auth.isLogin]);

    const onSignInPressed = async (e) => {
        // navigation.navigate("Home");
        console.log(user);
        setLoading({ ...loading, login: true });
        await axios.get(`https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events`).then((user) => {
            console.log('userrrrrrrrrrrrrr', user.data);
            // dispatch({ type: GET_USER_INFO, user: user });
            console.log('ok');

            dispatch(setLogin());
            setLoading({ ...loading, login: false });
        });
    };

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    };

    const onSignUpPressed = () => {
        console.warn('onsignuppressed');
        navigation.navigate('Signup');
    };
    return (
        // <View>
        //     <Text>{auth.email}</Text>
        //     <TextInput style={{ height: 50, width: "100%", borderWidth: 2, padding: 10 }} value={email} onChangeText={setEmail} />

        //     <CustomInput value={email} setValue={setEmail} />
        //     <Text>{auth.email}</Text>
        //     {/* <TouchableOpacity
        //         onPress={() => {
        //             dispatch(facebookLogin());
        //         }}
        //     >
        //         <Text>dang nhap</Text>
        //     </TouchableOpacity> */}
        // </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    style={[styles.logo, { height: height * 0.4 }, { marginBottom: 5 }]}
                    source={{
                        uri: 'https://intphcm.com/data/upload/logo-the-thao-dep.jpg',
                    }}
                />
                <CustomInput placeholder="Email" value={email} setValue={setEmail} icon={{ name: 'email' }} />
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} icon={{ name: 'lock' }} />

                <View style={styles.buttons}>
                    <CustomButton text="Đăng Nhập" onPress={onSignInPressed} loading={loading.login} />
                    <SocialSignInButtons />
                    {/* <CustomButton text="Quên mật khẩu" onPress={onForgotPasswordPressed} type="tertiary" /> */}
                    <CustomButton text="Chưa có tài khoản? Tạo tài khoản ngay" onPress={onSignUpPressed} bgColor="transparent" type="tertiary" />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '90%',
        maxWidth: 300,
        maxHeight: 200,
        resizeMode: 'contain',
    },
    buttons: {
        marginTop: 25,
        width: '100%',
    },
});

export default Signin;
