import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Button } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

import EventPostBtn from "../../components/EventItem/EventPostBtn";
import { BORDER_COLOR } from "../../components/common/CommonStyle";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomInput from "../../components/InputComponent/CustomInput";
import SlideModal from "../../components/modal/SlideModal";
import CustomSwitch from "../../components/switch/Switch";
import CustomDateTimePicker from "../../components/DateTimePicker/CustomDateTimePicker";
import { Category, CategoryList } from "./component";
import { categories } from "./data/category";
import { background } from "../../theme";

const EventCreate = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageVisible, setModalImageVisible] = useState(false);
    const [isToggleNav, setToggleNav] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectCategory, setSelectCategory] = useState({
        id: 1,
        name: categories[0].name,
    });

    const onFocus = () => {
        setToggleNav(true);
    };
    const onBlur = () => {
        setToggleNav(false);
    };

    const event = useSelector((state) => state.authReducers.event);

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

    const goSelectMap = () => {
        navigation.navigate("MapScreen");
    };

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const handlecheckCategory = useCallback(
        (id) => {
            let index = categories.findIndex((category) => category.id === id);
            if (index !== -1) {
                setSelectCategory({
                    id: id,
                    name: categories[index].name,
                });
            }
        },
        [selectCategory]
    );

    const [date, setDate] = useState({
        start: new Date(),
        end: new Date(),
    });

    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(0);

    const onChange = (event, selectedDate) => {
        let value = { ...date };
        if (show === 1) {
            value.start = selectedDate;
        } else {
            value.end = selectedDate;
        }
        setShow(0);
        setDate(value);
    };

    const showMode = (currentMode, type) => {
        setShow(type === "start" ? 1 : 2);
        setMode(currentMode);
    };

    const showDatepicker = (type) => {
        showMode("date", type);
    };

    const showTimepicker = (type) => {
        showMode("time", type);
    };

    const handleCategorySelect = () => {
        setModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialCommunityIcons size={30} style={[styles.icon]} name="notebook-outline" color="black" type />
                <Text style={styles.title}>Đăng bài viết</Text>
            </View>
            <SlideModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
                <View>
                    <Text style={styles.modalText}>Chọn thể loại</Text>
                    <CategoryList data={categories} onPress={handlecheckCategory} select={selectCategory.id} />
                    <View style={styles.categoryWrap}>
                        <View style={styles.category}>
                            <CustomButton text="Chọn thể loại" type="category" onPress={handleCategorySelect} />
                        </View>
                    </View>
                </View>
            </SlideModal>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputTitleContainer}>
                    <TextInput style={styles.input} value={title} onChangeText={setTitle} onFocus={onFocus} onBlur={onBlur} placeholder="Tiêu đề"></TextInput>
                    <CustomSwitch isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.descriptionInput} onFocus={onFocus} onBlur={onBlur} value={description} onChangeText={setDescription} multiline placeholder="Mô tả"></TextInput>
                </View>
                <CustomDateTimePicker title={"Bắt đầu"} onPressTime={() => showTimepicker("start")} onPressDate={() => showDatepicker("start")} time={date.start} date={date.start} />
                <CustomDateTimePicker title={"Kết thúc"} onPressTime={() => showTimepicker("end")} onPressDate={() => showDatepicker("end")} time={date.end} date={date.end} />
                <EventPostBtn title="Thể loại sự kiện" text={selectCategory.name} iconName="notebook-outline" onPress={() => setModalVisible(true)} />
                <EventPostBtn title="Địa điểm" text="Đống Đa" iconName="map-marker" bgColor={background.brown} onPress={goSelectMap} />
                <EventPostBtn title="Ảnh event" text="30" iconName="group" bgColor={background.lightGreen} onPress={() => setModalImageVisible(true)} />

                <View style={{ marginTop: 15, marginBottom: 120 }}>
                    <CustomButton text="Đăng bài viết" bgColor={background.lightPurple} />
                </View>
            </ScrollView>
            <SlideModal setModalVisible={setModalImageVisible} modalVisible={modalImageVisible}>
                <View>
                    <Text>Các hình ảnh liên quan đến sự kiện</Text>
                </View>
            </SlideModal>
            {show !== 0 && <DateTimePicker testID="dateTimePicker" display="spinner" value={show === 1 ? date.start : date.end} mode={mode} is24Hour={true} onChange={onChange} />}
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
    descriptionInput: {
        width: "100%",
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
    category: {
        width: "50%",
    },
    categoryWrap: {
        alignItems: "center",
    },
});
