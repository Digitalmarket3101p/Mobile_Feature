import React, { useState } from "react";
import { View, ScrollView, TextInput, Alert } from "react-native";
import { useDispatch } from "react-redux";

import Text from "../component/Text";
import Button from "../component/Button";
import ImagePicker from "../component/ImagePicker";
import LocationPicker from "../component/LocationPicker";
import Place from "../models/Place";
import { addPlace, setLoading } from "../actions"; // Import setLoading action
import styles from "../styles";
import Colors from "../constants/Colors";

const CreatePlaceScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imagePickerError, setImagePickerError] = useState("");
  const [location, setLocation] = useState(null);
  const [locationPickerError, setLocationPickerError] = useState("");
  const [address, setAddress] = useState("");

  const onSubmit = async () => {
    if (!image) {
      setImagePickerError("Image is required.");
      return;
    }

    if (!location) {
      setLocationPickerError("Location is required.");
      return;
    }

    // Fetch address using the provided function
    try {
      dispatch(setLoading(true)); // Set loading state to true while fetching address

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.coords.longitude},${location.coords.latitude}.json?access_token=pk.eyJ1IjoiYXJpYW1hbiIsImEiOiJja2VpczA2dHYwbmYzMnpvNnFldng1a20zIn0.MthUVi2rI2gQpVKvKW3fSA`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const resData = await response.json();
      if (resData.features && resData.features.length > 0) {
        setAddress(resData.features[0].place_name);
      } else {
        throw new Error("Address not found");
      }
    } catch (err) {
      dispatch(setLoading(false));
      Alert.alert(
        "Address Fetch Error",
        "Something went wrong while fetching the place address.",
        [{ text: "Okay" }]
      );
      return;
    }

    dispatch(
      addPlace(
        new Place(
          title,
          address,
          image,
          location.coords.latitude,
          location.coords.longitude
        )
      )
    );

    dispatch(setLoading(false)); // Set loading state to false after fetching address

    navigation.navigate("PlacesScreen");
  };

  return (
    <ScrollView>
      <View
        style={{
          ...styles.screen,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "70%", height: "100%" }}>
          <Text size={2}>Create New Place</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Title"
          />
          <ImagePicker onImageTake={setImage} />
          <Text style={{ color: Colors.danger }}>{imagePickerError}</Text>
          <LocationPicker
            onLocationSelect={setLocation}
            navigate={navigation.navigate}
            route={route}
          />
          <Text style={{ color: Colors.danger }}>{locationPickerError}</Text>
          <View style={{ flexDirection: "row" }}>
            <Button title="Create" onPress={onSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreatePlaceScreen;
