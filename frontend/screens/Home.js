import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';

const Home = ({ navigation }) => {
    const [isToggleNav, setToggleNav] = useState(false);
    const [searchEvent, setSearchEvent] = useState('');

    useEffect(() => {
        if (isToggleNav) {
            navigation.setOptions({
                tabBarLabel: 'Home',
                tabBarStyle: { display: 'none' },
            });
        } else {
            navigation.setOptions({
                tabBarLabel: 'Home',
                tabBarStyle: { display: 'flex', position: 'absolute', bottom: 15, left: 20, right: 20, elevation: 1, backgroundColor: 'transparent', borderRadius: 10, height: 70, paddingBottom: 10, paddingTop: 5, gap: 0 },
            });
        }
    }, [isToggleNav]);

    return (
        <View style={styles.container}>
            <SearchBar setToggleNav={setToggleNav} setValue={setSearchEvent} value={searchEvent} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
});
