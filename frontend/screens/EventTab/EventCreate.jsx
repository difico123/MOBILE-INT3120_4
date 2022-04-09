import { View, Text, StyleSheet, TextInput, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import EventPostBtn from "../../components/EventItem/EventPostBtn";
import { BORDER_COLOR } from "../../components/common/CommonStyle";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomInput from "../../components/InputComponent/CustomInput";
import SlideModal from "../../components/modal/SlideModal";
import CustomSwitch from "../../components/switch/Switch";
import { Category, CategoryList } from "./component";
import { background } from "../../theme";

const EventCreate = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isToggleNav, setToggleNav] = useState(false);
    const [timeStart, setTimeStart] = useState(moment().format("h:mm a Do M "));
    const [timeEnd, setTimeEnd] = useState(moment().format("h:mm a Do M "));
    const onFocus = () => {
        setToggleNav(true);
    };
    const onBlur = () => {
        setToggleNav(false);
    };
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

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const goSelectMap = () => {
        navigation.navigate("MapScreen");
    };
    const handleConfirmStartTime = (date) => {
        setTimeStart(moment(date).format("Do M, h:mm a "));
        hideDatePicker();
    };
    const handleConfirmEndTime = (date) => {
        setTimeEnd(moment(date).format("Do M, h:mm a  "));
        hideDatePicker();
    };
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons size={30} style={[styles.icon]} name="notebook-outline" color="black" type />
                <Text style={styles.title}>Đăng bài viết</Text>
            </View>
            <SlideModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
                <View>
                    <Text style={styles.modalText}>Chọn thể loại</Text>
                    <CategoryList />
                </View>
            </SlideModal>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputTitleContainer}>
                    <TextInput style={styles.input} onFocus={onFocus} onBlur={onBlur} placeholder="Tiêu đề"></TextInput>
                    <CustomSwitch isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onFocus={onFocus} onBlur={onBlur} placeholder="Mô tả"></TextInput>
                </View>
                <View>
                    <EventPostBtn title="Giờ bắt đầu" onPress={showDatePicker} iconName="clock" text={timeStart} bgColor={background.lightGray} />
                    <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleConfirmStartTime} onCancel={hideDatePicker} isDarkModeEnabled={true} />
                </View>
                <View>
                    <EventPostBtn title="Giờ kết thúc" onPress={showDatePicker} iconName="clock" text={timeEnd} bgColor={background.gray} />
                    <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleConfirmEndTime} onCancel={hideDatePicker} isDarkModeEnabled={true} />
                </View>
                <EventPostBtn title="Thể loại sự kiện" text="party" iconName="notebook-outline" onPress={() => setModalVisible(true)} />
                <EventPostBtn title="Địa điểm" text="Đống Đa" iconName="map-marker" bgColor={background.brown} onPress={goSelectMap} />
                <EventPostBtn title="Số lượng người" text="30" iconName="group" bgColor={background.lightGreen} />

                <View style={{ marginTop: 15, marginBottom: 120 }}>
                    <CustomButton text="Đăng bài viết" bgColor={background.lightPurple} />
                </View>
            </ScrollView>
        </View>
    );
};

export default EventCreate;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        zIndex: 1000,
    },
    icon: {},
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    inputTitle: {
        borderWidth: 1,
        flexDirection: "row",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
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
    inputTitleContainer: {
        height: 50,
        borderWidth: 1,
        flexDirection: "row",
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingLeft: 15,
        paddingVertical: 5,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "90%",
    },
    scrollView: {
        height: "3000%",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
});
