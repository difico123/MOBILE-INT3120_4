import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { color, background } from "../../theme";
import { Icon } from "react-native-elements";
import moment from "moment";

const CustomDateTimePicker = ({ title, onPressTime, onPressDate, time, date }) => {
    const { container, title: titleStyle, titleWrap, icon, monthWrap, timeWrap, dateTimeWrap, text } = styles;
    const formatTime = useMemo(() => {
        return moment(time).format("hh:mm A");
    }, [time]);

    const formatDate = useMemo(() => {
        return moment(time).format("ddd, MMM D, YY");
    }, [date]);

    return (
        <View style={container}>
            <View style={titleWrap}>
                <Text style={titleStyle}>{title}</Text>
            </View>
            <View style={dateTimeWrap}>
                <View style={monthWrap}>
                    <TouchableOpacity onPress={onPressDate} style={icon}>
                        <Icon type="font-awesome" name="calendar"></Icon>
                    </TouchableOpacity>
                    <Text style={text}>{formatDate}</Text>
                </View>
                <View style={timeWrap}>
                    <TouchableOpacity onPress={onPressTime} style={icon}>
                        <Icon type="font-awesome" name="clock-o"></Icon>
                    </TouchableOpacity>
                    <Text style={text}>{formatTime}</Text>
                </View>
            </View>
        </View>
    );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
        flexDirection: "row",
        height: 50,
        backgroundColor: background.lightGray,
    },
    title: {
        color: color.white,
        fontWeight: "bold",
    },
    titleWrap: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 100,
    },
    monthWrap: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    timeWrap: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    dateTimeWrap: {
        flex: 2,
        flexDirection: "row",
        padding: 5,
        borderRadius: 10,
        backgroundColor: background.lightPink,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        marginLeft: 15,
        fontWeight: "bold",
    },
    icon: {},
});
