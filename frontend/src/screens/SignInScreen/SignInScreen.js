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

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    console.warn('onSignInPressed', email, password);
    navigation.navigate('Home');
  };

  const onSignInFacebookPressed = () => {
    console.warn('onSignInFacebookPressed');
  };
  const onSignInGooglePressed = () => {
    console.warn('onSignInGooglePressed');
  };
  const onForgotPasswordPressed = () => {
    console.warn('onForgotPasswordPressed');
  };

  const onSignUpPressed = () => {
    console.warn('onsignuppressed');
    navigation.navigate('Signup');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          style={[styles.logo, {height: height * 0.4}]}
          source={{
            uri: 'https://intphcm.com/data/upload/logo-the-thao-dep.jpg',
          }}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomButton text="Đăng Nhập" onPress={onSignInPressed} />
        <CustomButton
          text="Quên mật khẩu"
          onPress={onForgotPasswordPressed}
          type="tertiary"
        />
        <SocialSignInButtons />

        <CustomButton
          text="Chưa có tài khoản? Tạo tài khoản ngay"
          onPress={onSignUpPressed}
          bgColor="transparent"
          type="tertiary"
        />
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
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
});
