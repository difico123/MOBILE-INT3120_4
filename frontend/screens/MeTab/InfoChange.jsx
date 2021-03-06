import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Picker, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomDatePicker from "../../components/InputComponent/CustomDatePicker";
import CustomInput from "../../components/InputComponent/CustomInput";
import SelectBox from "../../components/InputComponent/SelectBox";
import { setLogin } from "../../redux/actions/auth_actions";
import UserService from "../../service/UserService";
export const InfoChange = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducers.auth);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const userApi = await UserService.getUser(auth.token);
    setUser(userApi);
  }, []);

  const [selectedGender, setSelectedGender] = useState(auth.user?.gender);
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState({
    updated: false,
  });

  const [dob, setDob] = useState(auth.user?.dob);
  
  const [open, setOpen] = useState(false);
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
    if (selectedGender !== "" && selectedGender !== user.gender) {
      data.gender = selectedGender;
    } else if (!selectedGender && !user.gender) {
      data.gender = "Nam";
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
        dispatch(setLogin(auth.token));
        navigation.navigate("Profile", { isUpdated: true });
        alert("Updated successfully");
      })
      .catch((error) => setLoading({ ...loading, login: false }));
  };
  return (
    <ScrollView>
      <View style={styles.main}>
        <CustomInput
          titleInput="H???"
          setValue={(first_name) => setFirstName(first_name)}
        >
          {user?.first_name}
        </CustomInput>

        <CustomInput
          titleInput="T??n ?????m"
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

        <SelectBox
          titleInput="Gi???i t??nh"
          selectedValue={selectedGender}
          setSelectedValue={setSelectedGender}
          values={["Nam", "N???", "Kh??c"]}
        ></SelectBox>

        <CustomInput
          titleInput="S??? ??i???n tho???i"
          setValue={(phone_number) => setPhoneNumber(phone_number)}
        >
          {user?.phone_number}
        </CustomInput>

        <CustomDatePicker
          title="Ng??y sinh"
          date={dob}
          setDate={setDob}
          open={open}
          setOpen={setOpen}
        ></CustomDatePicker>

        <View style={styles.confirmButton}>
          <CustomButton
            text="X??c nh???n"
            onPress={onConfirmPress}
            loading={loading.updated}
          ></CustomButton>
        </View>
      </View>
      <View style={{ marginBottom: 200 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginLeft: 10,
  },
  confirmButton: {
    // paddingLeft:
    width: "93%",
    marginTop: 10,
  },
});
