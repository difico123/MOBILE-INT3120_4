import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const EventListLike = () => {
    return (
        <View style={styles.nav}>
            <Text>EventListLike</Text>
        </View>
    );
};

export default EventListLike;

const styles = StyleSheet.create({
    nav: {
        marginTop: 20,
    },
});
