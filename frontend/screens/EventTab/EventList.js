import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";

const API_KEY_GOOGLE = "4201738803816157";
export default function EventList() {
    const [location, setLocation] = React.useState({
        latitude: -122,
        longitude: 37,
        latitudeDelta: 0.04,
        longitudeDelta: 0.09,
    });

    const [isLoading, setLoading] = React.useState(false);
    const onRegionChange = (region) => {
        setLocation({ ...region });
        console.log(region);
    };

    React.useEffect(() => {
        setLoading(true);
        console.log("o");
    }, []);

    console.log("ok");
    if (isLoading) {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} onRegionChangeComplete={onRegionChange} region={location} />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
