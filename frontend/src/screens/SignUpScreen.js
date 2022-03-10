/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
const SignUpScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const onSignUnPressed = () => {
    console.warn('onSignUnPressed', email, password);
  };

  const onSignInPressed = () => {
    console.warn('onSignInGooglePressed');
    navigation.navigate('Signin');
  };

  const onSignUpPressed = () => {
    console.warn('onsignuppressed');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>TẠO TÀI KHOẢN MỚI</Text>
        <CustomInput
          placeholder="Tên người dùng"
          value={username}
          setValue={setUsername}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Mật khẩu"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Nhập lại mật khẩu"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />

        <CustomButton text="Đăng ký tài khoản" onPress={onSignUnPressed} />

        <CustomButton
          text="Đã có tài khoản? Đăng nhập ngay"
          bgColor="transparent"
          onPress={onSignInPressed}
          type="tertiary"
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
});
