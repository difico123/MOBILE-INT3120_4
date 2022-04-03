import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomInput from "../../components/InputComponent/CustomInput";
import UserService from "../../service/UserService";
export const InfoChange = () => {
  const auth = useSelector((state) => state.authReducers.auth);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const userApi = await UserService.getUser(auth.token);
    setUser(userApi);
  }, []);

  
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState({
    updated: false,
  });
  const onConfirmPress = async () => {
    let data = {};
    if (firstName !== "" && firstName !== user.first_name) {
      data.first_name = firstName;
    }
    if (lastName !== "" && lastName !== user.last_name) {
      data.last_name = lastName;
    }
    if (email !== "" && email !== user.email) {
      data.email = email;
    }
    if (gender !== "" && gender !== user.gender) {
      data.gender = gender;
    }
    if (phoneNumber !== "" && phoneNumber !== user.phone_number) {
      data.phone_number = phoneNumber;
    }
    if (dob !== "" && dob !== user.dob) {
      data.dob = dob;
    }

    setLoading({ ...loading, updated: true });
    UserService.updateUser(auth.token, JSON.stringify(data))
      .then((result) => {
        setLoading({ ...loading, updated: false });
        navigation.navigate("Profile");
        alert("Updated successfully");
      })
      .catch((error) => setLoading({ ...loading, login: false }));
  };
  return (
    <View style={styles.main}>
      <CustomInput
        titleInput="Họ"
        setValue={(first_name) => setFirstName(first_name)}
      >
        {user?.first_name}
      </CustomInput>
      <CustomInput
        titleInput="Tên đệm"
        setValue={(last_name) => setLastName(last_name)}
      >
        {user?.last_name}
      </CustomInput>
      <CustomInput
        titleInput="Email"
        name="email"
        setValue={(email) => setEmail(email)}
      >
        {user?.email}
      </CustomInput>
      <CustomInput
        titleInput="Giới tính"
        setValue={(gender) => setGender(gender)}
      >
        {user?.gender}
      </CustomInput>
      <CustomInput
        titleInput="Số điện thoại"
        setValue={(phone_number) => setPhoneNumber(phone_number)}
      >
        {user?.phone_number}
      </CustomInput>
      <CustomInput titleInput="Ngày sinh" setValue={(dob) => setDob(dob)}>
        {user?.dob}
      </CustomInput>
      <View style={styles.confirmButton}>
        <CustomButton
          title="Confirm"
          onPress={onConfirmPress}
          loading={loading.updated}
        ></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginLeft: 10,
  },
  confirmButton: {
    // paddingLeft: 
    width: "93%"
  },
});
