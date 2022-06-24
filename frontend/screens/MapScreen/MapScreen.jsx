import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomSearchBar from "../../components/InputComponent/CustomSearchBar";
import { color, background } from "../../theme";
import * as Location from "expo-location";
import { searchLocation } from "../../service/map";
import FadeModal from "../../components/modal/FadeModal";
import { SearchLocationName } from "./components";

const data = [
  {
    latitude: -125,
    longitude: 30,
    latitudeDelta: 0.25,
    longitudeDelta: 0.25,
    name: "quan",
    description: "abc",
  },
  {
    latitude: -126,
    longitude: 31,
    latitudeDelta: 0.25,
    longitudeDelta: 0.25,
    name: "adsf",
    description: "azcv",
  },
  {
    latitude: -128,
    longitude: 38,
    latitudeDelta: 0.25,
    longitudeDelta: 0.25,
    name: "ac",
    description: "adf",
  },
  {
    latitude: -130,
    longitude: 36,
    latitudeDelta: 0.25,
    longitudeDelta: 0.25,
    name: "aaa",
    description: "bbb",
  },
];

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState({
    latitude: 105.63334,
    longitude: 19.15,
    latitudeDelta: 0.25,
    longitudeDelta: 0.25,
    name: "Đống Đa",
  });
  const [search, setSearch] = useState("");
  const [visibleModalSearch, setVisibleModalSearch] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      } else {
        console.log("not granted");
      }
      let location = await Location.getCurrentPositionAsync({});
    })();
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [locationNameList, setLocationNameList] = useState([]);

  const onRegionChange = (region) => {
    // console.log(region);
  };

  const handlePressSearch = async () => {
    if (search) {
      setVisibleModalSearch(true);
      await searchLocation(search).then((results) => {
        setLocationNameList(results.data.features);
      });
    }
  };

  const handleSearchLocation = (geometry, name) => {
    console.log(geometry, name);
    if (geometry) {
      setLocation({
        ...location,
        latitude: geometry.coordinates[0],
        longitude: geometry.coordinates[1],
        name,
      });
      setVisibleModalSearch(false);
    }
  };

  const handlePressSelect = () => {
    let locationParams = {
      lat: location.latitude,
      long: location.longitude,
      name: location.name,
    };
    navigation.navigate("EventCreate", { location: locationParams });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <CustomSearchBar
            value={search}
            setValue={setSearch}
            onPress={handlePressSearch}
          />
          <View style={styles.paddingVer}></View>
          <View style={styles.mapWrap}>
            <MapView
              style={styles.map}
              onRegionChangeComplete={onRegionChange}
              region={location}
              enabled={false}
            ></MapView>
          </View>
          <View style={styles.nameWrap}>
            <Text style={styles.title}>{location.name}</Text>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.padding}>
          <CustomButton
            text="chọn địa điểm"
            bgColor={background.random}
            onPress={handlePressSelect}
          />
        </View>

        <FadeModal
          modalVisible={visibleModalSearch}
          setModalVisible={setVisibleModalSearch}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.titleSearch}>
              {search}: Có {locationNameList.length} tìm kiếm
            </Text>
            <View style={styles.contentSearch}>
              <FlatList
                data={locationNameList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatSearch}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                  <SearchLocationName
                    name={item.text}
                    description={item.place_name}
                    onPress={() =>
                      handleSearchLocation(item.geometry, item.text)
                    }
                  />
                )}
              />
            </View>
          </View>
        </FadeModal>
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
  btnSearch: {},
  modalContainer: {},
  contentSearch: {},
  titleSearch: {
    position: "absolute",
    top: -24,
    fontWeight: "bold",
  },
  flatSearch: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  map: {
    height: Dimensions.get("window").height * 0.57,
  },
  nameWrap: {
    alignItems: "center",
    paddingVertical: 15,
  },
  mapWrap: {
    borderColor: background.gray,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.blackText,
  },
  search: {
    top: 0,
    width: "100%",
    height: 100,
    borderWidth: 10,
    margin: 2,
  },
  padding: {
    paddingHorizontal: 10,
  },
  paddingVer: {
    paddingVertical: 10,
  },
});
