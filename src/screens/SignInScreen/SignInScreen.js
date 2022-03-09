import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// import {
//   LoginManager,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';
const SignInScreen = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  // const fbLogin = resCallback => {
  //   LoginManager.logOut();
  //   return LoginManager.logInWithPermissions(['public_profile']).then(
  //     result => {
  //       console.log(result, 'result');

  //       if (
  //         result.declinedPermissions &&
  //         result.declinedPermissions.includes('email')
  //       ) {
  //         resCallback({mesage: 'email ís required'});
  //       }
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log(
  //           'Login success with permissions: ' +
  //             result.grantedPermissions.toString(),
  //         );

  //         const infoRequest = new GraphRequest(
  //           '/me?fileds=email,name,picture,friend',
  //           null,
  //           resCallback,
  //         );

  //         new GraphRequestManager().addRequest(infoRequest).start();
  //       }
  //     },
  //   );
  // };

  // const onFbLogin = async () => {
  //   try {
  //     await fbLogin(_responseInfoCallback);
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };

  // const _responseInfoCallback = async (error, result) => {
  //   if (error) {
  //     console.log('Error fetching data: ' + error.toString());
  //   } else {
  //     console.log('Success fetching data: ' + result.toString());
  //   }
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

  return (
    <View style={styles.root}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://intphcm.com/data/upload/logo-the-thao-dep.jpg',
        }}
      />

      <TouchableOpacity onPress={googleLogin}>
        <Text>gg login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={googleLogOut}>
        <Text>googleLogOut</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={onFbLogin}>
        <Text>fb login</Text>
      </TouchableOpacity> */}
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
    height: 200,
    resizeMode: 'contain',
  },
});
