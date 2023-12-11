import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

import Text from "../component/Text";
import Button from "../component/Button";
import Input from "../component/Input";
import ImagePicker from "../component/ImagePicker";
import LocationPicker from "../component/LocationPicker";
import Place from "../models/Place";
import { addPlace } from "../actions";
import styles from "../styles";
import Colors from "../constants/Colors";

const CreatePlaceScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [imagePickerError, setImagePickerError] = useState("");
  const [location, setLocation] = useState(null);
  const [locationPickerError, setLocationPickerError] = useState("");

  const onSubmit = () => {
    if (!image) {
      setImagePickerError("Image is required.");
      return;
    }

    if (!location) {
      setLocationPickerError("Location is required.");
      return;
    }

    dispatch(
      addPlace(
        new Place(
          "Title",
          "eeewe",
          image,
          location.coords.latitude,
          location.coords.longitude
        )
      )
    );

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
        <View style={{ width: "70%", marginBottom: 70 }}>
          <Text size={2}>Create New Place</Text>
          <Input name="title" label="Title" />
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
