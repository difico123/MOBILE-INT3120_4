import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import CustomButton from "../../components/ButtonComponent/CustomButton";
import CustomSearchBar from "../../components/InputComponent/CustomSearchBar";
import { color, background } from "../../theme";
import { searchLocation, geoToName } from "../../service/map";
import FadeModal from "../../components/modal/FadeModal";
import { SearchLocationName } from "./components";

export default function MapScreen({ route, navigation }) {
  const [location, setLocation] = useState({
    latitude: 21.0333,
    longitude: 105.8,
    latitudeDelta: 0.002,
    longitudeDelta: 0.0021,
    name: "Quận Cầu Giấy",
  });

  const [search, setSearch] = useState("");
  const [visibleModalSearch, setVisibleModalSearch] = useState(false);
  const [locationNameList, setLocationNameList] = useState([]);
  const eventId = route.params?.eventId;
  const local = route.params.location;
  useEffect(() => {
    if (local) {
      setLocation({
        ...location,
        latitude: local?.lat,
        longitude: local.long,
        name: local.name,
      });
    }
  }, [local]);
  const handlePressSearch = async () => {
    if (search) {
      setVisibleModalSearch(true);
      await searchLocation(search).then((results) => {
        setLocationNameList(results.data.features);
      });
    }
  };

  const handleSearchLocation = (geometry, name) => {
    if (geometry) {
      setLocation({
        ...location,
        latitude: geometry?.coordinates[1],
        longitude: geometry?.coordinates[0],
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
    if (eventId) {
      navigation.navigate("EventCreate", {
        eventId,
        location: locationParams,
      });
    } else {
      navigation.navigate("EventCreate", { location: locationParams });
    }
  };

  const onRegionChange = () => {};
  const onClickMap = async (e) => {
    const { latitude, longitude } = e?.nativeEvent?.coordinate;
    const res = await geoToName({ latitude, longitude });
    let name = res.features[0].place_name;
    setLocation({
      ...location,
      latitude,
      longitude,
      name,
    });
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MapView
          style={styles.map}
          onRegionChangeComplete={onRegionChange}
          region={location}
          enabled={false}
          onPress={onClickMap}
        >
          <Marker
            coordinate={location}
            pinColor={"red"}
            title={"click map to select location"}
          ></Marker>
        </MapView>
      </KeyboardAvoidingView>
      <View style={{ position: "absolute", top: 20 }}>
        <CustomSearchBar
          value={search}
          setValue={setSearch}
          onPress={handlePressSearch}
          placeholder={"Tìm kiếm"}
        />
      </View>
      <View style={styles.padding}>
        <View style={styles.nameWrap}>
          <Text style={styles.title}>{location.name}</Text>
        </View>
        <CustomButton
          text="Chọn địa điểm"
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
                  description={item?.place_name}
                  onPress={() =>
                    handleSearchLocation(item?.geometry, item?.text)
                  }
                />
              )}
            />
          </View>
        </View>
      </FadeModal>
    </View>
  );
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
  btnSearch: {},
  modalContainer: {
    minWidth: Dimensions.get("window").width * 0.9,
    minHeight: Dimensions.get("window").height * 0.9,
  },
  contentSearch: {},
  titleSearch: {
    position: "absolute",
    top: -24,
    fontWeight: "bold",
  },
  flatSearch: {
    paddingBottom: 20,
  },
  nameWrap: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
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
    position: "absolute",
    bottom: 30,
  },
  paddingVer: {
    paddingVertical: 8,
  },
});
