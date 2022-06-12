import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonStyle, { BORDER_COLOR } from "../common/CommonStyle";
import { useNavigation } from "@react-navigation/native";

const HeaderLogo = () => {
  const nav = useNavigation();
  const { height } = useWindowDimensions();
  const auth = useSelector((state) => state.authReducers.auth);
  const avatar = auth?.user?.avatar?.includes("http")
    ? { uri: auth?.user?.avatar }
    : require("../../assets/avatar-default-icon.png");
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={[styles.logo, { marginBottom: 5 }]}
          source={require("../../assets/VNU_logo.png")}
        />
        <Text style={styles.title}>SOCIENT</Text>
      </View>

      <Pressable
        style={[styles.avatarContainer, styles.borderWidth]}
        onPress={() => nav.navigate("Profile")}
      >
        <Image style={[styles.avt, { marginBottom: 5 }]} source={avatar} />
        <Text style={styles.name}>{auth.user?.username}</Text>
      </Pressable>
    </View>
  );
};

export default HeaderLogo;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginHorizontal: 5,
    // marginTop: 20
  },
  avt: {
    width: 40,
    height: 40,
    // backgroundColor: "black",
    zIndex: 1000,
    transform: [{ translateX: -5 }],
    borderRadius: 50,
    overflow: "hidden",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 25,
    justifyContent: "space-between",
    shadowColor: "red",
  },
  borderWidth: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 400,
  },
  name: {
    fontSize: 16,
    paddingHorizontal: 5,
    paddingBottom: 2,
    marginRight: 5,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontWeight: "700",
    color: "#5D5FEF",
  },
});
