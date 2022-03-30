import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const CustomInput = ({ icon, value, setValue, ...props }) => {
  let iconInput = !icon ? "" : <Icon {...icon} />;
  return (
    <View>
      {props.titleInput && (
        <Text style={styles.titleInput}>{props.titleInput}</Text>
      )}

      <View style={styles.container}>
        <Text>{iconInput}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    marginLeft: 10,
    width: "100%",
    height: "100%",
  },
  titleInput: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default CustomInput;
