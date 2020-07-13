import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { View, Image } from "react-native";
import Search from "../Search";
import Directions from "../Directions";
import { getPixelSize } from "../utils";
import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";
import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
} from "./styles";
import Geocoder from "react-native-geocoding";
import Details from "../Details";

Geocoder.init("AIzaSyBgzca1msPvKdahMpf43PdTv4J_Xn8d728");

function Map() {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);
  const mapViewRef = useRef();

  useEffect(() => {
    async function getLocation() {
      Geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const response = await Geocoder.from({ latitude, longitude });
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(","));
          setLocation(location);
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
  }, []);

  function handleLocationSelected(data, { geometry }) {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;
    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  }

  function handleBack() {
    setDestination(null);
  }
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        showsUserLocation
        loadingEnabled
        ref={mapViewRef}
      >
        {destination && (
          <React.Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady={(result) => {
                setDuration(Math.floor(result.duration));
                if (mapViewRef) {
                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      top: getPixelSize(50),
                      bottom: getPixelSize(350),
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                    },
                  });
                }
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={markerImage}
            >
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>

            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>

                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </React.Fragment>
        )}
      </MapView>

      {destination ? (
        <React.Fragment>
          <Back onPress={handleBack}>
            <Image source={backImage} />
          </Back>
          <Details />
        </React.Fragment>
      ) : (
        <Search onLocationSelected={handleLocationSelected} />
      )}
    </View>
  );
}

export default Map;
