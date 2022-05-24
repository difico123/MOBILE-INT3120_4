import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import { BORDER_COLOR } from "../../components/common/CommonStyle";
import CustomSwitch from "../../components/switch/Switch";
import { MAIL_TYPE } from "../../config/mail";
import { sendMail } from "../../service/MailService";
export const MailTemplate = ({ route, navigation }) => {
  const auth = useSelector((state) => state.authReducers.auth);
  const toEmail = route.params.email;
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [isToggleNav, setToggleNav] = useState(false);
  useEffect(() => {
    if (isToggleNav) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          borderWidth: 1,
          borderColor: BORDER_COLOR,
        },
      });
    }
  }, [isToggleNav]);
  const onFocus = () => {
    setToggleNav(true);
  };
  const onBlur = () => {
    setToggleNav(false);
  };
  const onSendMail = () => {
    const sendMailTo = async () => {
      setLoading(true);
      const check = await sendMail(
        auth.token,
        [toEmail],
        MAIL_TYPE.COMMON,
        route.params.eventId,
        body,
        subject
      );
      if (check) alert("Gửi email thành công");
      else alert("Có lỗi xảy ra. Vui lòng thử lại sau");
      setLoading(false);
    };
    sendMailTo();
  };
  return (
    <View>
      <View>
        <View style={styles.inputTitleContainer}>
          <Text style={{ marginRight: 5, marginLeft: 10 }}>Tới : </Text>
          <Text style={styles.input}>{toEmail}</Text>
        </View>

        <View style={{ ...styles.inputTitleContainer }}>
          <Text style={{ marginRight: 5 }}>Tiêu đề</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Subject"
            ></TextInput>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.descriptionInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={body}
            onChangeText={setBody}
            multiline
            placeholder="Body"
          ></TextInput>
        </View>
      </View>
      <CustomButton
        text="Gửi"
        onPress={onSendMail}
        loading={isLoading}
      ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitleContainer: {
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrap: {
    height: 50,
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "70%",
  },
  descriptionInput: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
