import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import CustomButton from './CustomButton';

const SocialSignInButtons = () => {
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

  const onSignInFacebookPressed = () => {
    console.warn('onSignInFacebookPressed');
  };
  const onSignInGooglePressed = () => {
    console.warn('onSignInGooglePressed');
  };
  return (
    <>
      <CustomButton
        text="Đăng nhập với tài khoản google"
        onPress={googleLogin}
        ftColor="#E7EAF4"
        bgColor="#DD4D44"
      />
      <CustomButton
        text="Đăng nhập với tài khoản facebook"
        onPress={onSignInFacebookPressed}
        ftColor="#4765A9"
        bgColor="#E7EAF4"
      />
      <TouchableOpacity onPress={googleLogOut}>
        <Text>googleLogOut</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={googleLogin}>
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
      /> */}
    </>
  );
};

export default SocialSignInButtons;
