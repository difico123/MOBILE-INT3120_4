import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import auth from '@react-native-firebase/auth';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
const SignInScreen = () => {
  const {height} = useWindowDimensions();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const fbLogin = resCallback => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        console.log(result, 'result');

        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback({mesage: 'email ís required'});
        }
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );

          const infoRequest = new GraphRequest(
            '/me?fileds=email,name,picture,friend',
            null,
            resCallback,
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
    );
  };

  const onFbLogin = async () => {
    try {
      await fbLogin(_responseInfoCallback);
    } catch (err) {
      console.log('err', err);
    }
  };

  const _responseInfoCallback = async (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('Success fetching data: ' + result);
    }
  };

  // const fbLogin = async () => {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = await auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   console.log(result);
  //   // Sign-in the user with the credential
  //   await auth().signInWithCredential(facebookCredential);
  // };
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user info', userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdadted
      } else {
        // some other error happened
      }
    }
  };

  const googleLogOut = async () => {
    try {
      const userInfo = await GoogleSignin.signOut();
      console.log(userInfo, 'userInfo');
    } catch (error) {
      console.error(error);
    }
  };

  const onSignInPressed = () => {
    console.warn('onSignInPressed', email, password);
  };
  return (
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
        onPress={onSignInPressed}
        type="tertiary"
      />
      <TouchableOpacity onPress={googleLogin}>
        <Text>gg login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={googleLogOut}>
        <Text>googleLogOut</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onFbLogin}>
        <Text>fb login</Text>
      </TouchableOpacity>

      <LoginButton
        onLoginFinished={(error, result) => {
          // login();
          console.log(result, 'red');
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
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
