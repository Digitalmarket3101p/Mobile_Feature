import React, { useState } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import Text from "../component/Text";
import Button from "../component/Button";
import ImagePicker from "../component/ImagePicker";
import LocationPicker from "../component/LocationPicker";
import Place from "../models/Place";
import { addPlace } from "../actions";
import styles from "../styles";
import Colors from "../constants/Colors";

const CreatePlaceScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(""); // New state for title
  const [image, setImage] = useState("");
  const [imagePickerError, setImagePickerError] = useState("");
  const [location, setLocation] = useState(null);
  const [locationPickerError, setLocationPickerError] = useState("");

  const onSubmit = () => {
    if (!image) {
      setImagePickerError("Image is required.");
      return;
    }
    console.log("location", location);
    if (!location) {
      setLocationPickerError("Location is required.");
      return;
    }

    dispatch(
      addPlace(
        new Place(
          title, // Use the title state here
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
        <View style={{ width: "70%", height: "100%" }}>
          <Text size={2}>Create New Place</Text>
          {/* Use TextInput to get title and update the state */}
          <TextInput
            style={styles.input} // You can style this TextInput as per your requirements
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
