import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BigButton } from "../../components/ButtonComponent/BigButton";
import SlideModal from "../../components/modal/SlideModal";
import { categories } from "../EventTab/data/image";

export const OptionsModal = ({
  modalOptionsVisible,
  setModalOptionsVisible,
  title,
  children,
}) => {
  return (
    <SlideModal
      setModalVisible={setModalOptionsVisible}
      modalVisible={modalOptionsVisible}
    >
      <View>
        <Text style={styles.modalText}>{title}</Text>
        <View style={styles.content}>{children}</View>
      </View>
    </SlideModal>
  );
};

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  category: {
    width: "50%",
  },
  categoryWrap: {
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 20,
  },
});
