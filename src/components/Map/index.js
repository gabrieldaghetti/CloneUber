import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { View } from "react-native";
import Search from "../Search";

function Map() {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    async function getLocation() {
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
        },
        () => {},
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        }
      );
    }
    getLocation();
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        showsUserLocation
        loadingEnabled
      >
        {/* <Marker coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }} /> */}
      </MapView>
      <Search />
    </View>
  );
}

export default Map;
