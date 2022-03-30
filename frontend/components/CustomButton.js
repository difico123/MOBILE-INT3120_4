/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const CustomButton = ({ icon, onPress, text, type = 'primary', bgColor, ftColor, loading = false, ...props }) => {
    let iconBtn = !icon ? '' : <Icon style={icon.style} {...icon} />;
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, styles[`color_${type}`], bgColor ? { backgroundColor: bgColor } : {}]}>
            <Text style={props.title ? styles.title : ""}>{props.title ?? iconBtn}</Text>
            {!loading ? <Text style={[styles.text, styles[`text_${type}`], ftColor ? { color: ftColor } : {}]}>{text}</Text> : <ActivityIndicator style={styles.loading} size="large" color="#FFA500" />}
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    color_primary: {
        backgroundColor: '#3B71F3',
    },
    text_primary: {
        color: '#FFFFFF',
    },
    color_tertiary: {
        backgroundColor: 'transparent',
    },
    text_tertiary: {
        color: '#000000',
    },
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
    },
    loading: {
        position: 'absolute',
        left: '50%',
        textAlign: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        marginLeft: 100
    }
});
