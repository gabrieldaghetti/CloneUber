import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Platform } from "react-native";

// import { Container } from './styles';

function Search() {
  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      placeholderTextColor="#333"
      onPress={() => {}}
      query={{
        key: "AIzaSyBgzca1msPvKdahMpf43PdTv4J_Xn8d728",
        language: "pt-BR",
      }}
      textInputProps={{ autoCapitalize: "none", autoCorrect: false }}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: "absolute",
          top: Platform.select({ ios: 60, android: 40 }),
          width: "100%",
        },
        textInput: {},
        textInputContainer: {},
        listView: {},
        description: {},
        row: {},
      }}
    />
  );
}

export default Search;
