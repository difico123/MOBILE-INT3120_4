import { View, Text, StyleSheet, TextInput, ScrollView, Modal, Pressable, Switch, ImageBackground, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import EventPostBtn from "../../components/EventItem/EventPostBtn";
import { BORDER_COLOR } from "../../components/common/CommonStyle";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import { background } from "../../theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EventCreate = ({ navigation }) => {
    console.log(background.black);
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
    const image = { uri: "https://reactjs.org/logo-og.png" };
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons size={30} style={[styles.icon]} name="notebook-outline" color="black" type />
                <Text style={styles.title}>Đăng bài viết</Text>
            </View>
            <ImageBackground source={image} blurRadius={1} resizeMode="cover" style={styles.image}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    statusBarTranslucent={false}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputTitle}>
                    <TextInput style={styles.input} onFocus={onFocus} onBlur={onBlur}></TextInput>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onFocus={onFocus} onBlur={onBlur}></TextInput>
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
    input: {
        borderWidth: 1,
        width: "90%",
    },
    scrollView: {
        height: "3000%",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        backgroundColor: "white",
        padding: 35,
        width: windowWidth,
        height: windowHeight * 0.9,
        position: "absolute",
        top: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        textAlign: "center",
    },
    switch: {},
});
