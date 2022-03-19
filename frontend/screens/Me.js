import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/actions/auth_actions';
const Me = () => {
    const dispatch = useDispatch();
    const onSignOut = () => {
        dispatch(setLogout());
    };
    return (
        <View style={styles.nav}>
            <Button onPress={onSignOut} title="Sign Out" />
        </View>
    );
};

export default Me;
const styles = StyleSheet.create({
    nav: {
        marginTop: 20,
    },
});
