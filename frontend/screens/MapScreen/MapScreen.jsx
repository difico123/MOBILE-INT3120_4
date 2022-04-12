import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const API_KEY_GOOGLE = "4201738803816157";
export default function MapScreen() {
    const [location, setLocation] = React.useState({
        latitude: -122,
        longitude: 37,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
    });

    const [mark, setMark] = React.useState({
        latitude: 0,
        longitude: 0,
    });

    const [isLoading, setLoading] = React.useState(false);

    const onRegionChange = (region) => {
        console.log(region);
    };

    const handlePress = () => {
        setLocation({ ...location, latitude: 20.8, longitude: 105.3 });
    };

    React.useEffect(() => {
        setLoading(true);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                    <View>
                        <GooglePlacesAutocomplete
                            placeholder="Search"
                            styles={{
                                container: {
                                    flex: 0,
                                },
                                textInput: {
                                    fontSize: 10,
                                    color: "black",
                                    borderWidth: 1,
                                    margin: 0,
                                },
                            }}
                            enablePoweredByContainer={false}
                            minLength={2}
                            fetchDetails={true}
                            returnKeyType={"search"}
                            onPress={(data, details = null) => {
                                let { lat, lng } = details.geometry.location;
                                setLocation({
                                    ...location,
                                    latitude: lat,
                                    longitude: lng,
                                });
                            }}
                            nearbyPlacesAPI="GooglePlacesSearch"
                            debounce={400}
                            query={{
                                key: "AIzaSyC_8ZzcEbucSlkDlE7GTiLHNhFvfGHDMlQ",
                                language: "en",
                            }}
                        />
                    </View>

                    <MapView style={styles.map} onRegionChangeComplete={onRegionChange} region={location} enabled={false}>
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title={"marker.title"}
                            description={"marker.description"}
                        />
                    </MapView>
                </KeyboardAvoidingView>

                <TouchableOpacity onPress={handlePress}>
                    <Text>click</Text>
                </TouchableOpacity>
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
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.6,
    },
    search: {
        top: 0,
        width: "100%",
        height: 100,
        borderWidth: 10,
        margin: 2,
    },
});
