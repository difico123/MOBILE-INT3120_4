import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import EventItemHot from "../../components/EventItem/EventItemHot";
import SlideModal from "../../components/modal/SlideModal";

export const OptionsModal = ({modalOptionsVisible, setModalOptionsVisible }) => {
  return (
    <SlideModal
      setModalVisible={setModalOptionsVisible}
      modalVisible={modalOptionsVisible}
    >
    <Text>Hey</Text>
    </SlideModal>
  );
};

const styles = StyleSheet.create({});
