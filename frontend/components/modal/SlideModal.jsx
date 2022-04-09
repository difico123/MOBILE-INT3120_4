import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SlideModal = ({ modalVisible, setModalVisible, children }) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={false}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.close}>Đóng</Text>
                        </TouchableOpacity>
                        {children}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SlideModal;

const styles = StyleSheet.create({
    close: {
        textAlign: "right",
    },
    txt: {
        color: "black",
    },
    modalView: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: windowWidth,
        height: windowHeight * 0.85,
        position: "absolute",
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "white",
    },
    centeredView: {
        flex: 1,
    },
});
