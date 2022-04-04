import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { InfoBox } from "../../components/infoBox";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../service/UserService";
import * as ImagePicker from "expo-image-picker";
export default Profile = (nav = null) => {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.authReducers.auth);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const userApi = await UserService.getUser(auth.token);
    setUser(userApi);
  }, []);

  if (nav.route.params?.isUpdated === true) {
    UserService.getUser(auth.token)
      .then((user) => {
        setUser(user);
        nav.route.params.isUpdated = false;
      })
      .catch((error) => console.log(error));
  }

  const [imageUrl, setImageUrl] = useState(auth.user?.avatar);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = "https://api.cloudinary.com/v1_1/dbiexlh94/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "mobile_app",
      };
      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();
          UserService.updateUser(auth.token, { avatar: data.secure_url })
            .then((result) => alert("Success"))
            .catch((err) => alert("Fail"));
          setImageUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log("pick image", err));
    }
  };
  return (
    <View style={styles.container}>
      <InfoBox
        name="Profile Picture"
        hasImage="true"
        onPress={pickImage}
        imageUrl={imageUrl}
      ></InfoBox>
      <InfoBox
        name="Details"
        onPress={() => navigation.navigate("Change Information")}
        user={user}
      >
        <Text
          style={styles.textDetail}
        >{`${user?.first_name} ${user?.last_name}`}</Text>
        <Text style={styles.textDetail}>{user?.email}</Text>
        <Text style={styles.textDetail}>{user?.gender}</Text>
        <Text style={styles.textDetail}>{user?.phone_number}</Text>
        <Text style={styles.textDetail}>{user?.dob}</Text>
      </InfoBox>
      <InfoBox
        name="Password"
        isPassWord="true"
        onPress={() => navigation.navigate("Change Password")}
      >
        <Text style={styles.textDetail}>********</Text>
      </InfoBox>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 105,
    maxWidth: "40%",
    maxHeight: "60%",
  },
  textDetail: {
    color: "white",
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
