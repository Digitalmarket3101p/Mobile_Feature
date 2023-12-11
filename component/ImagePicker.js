import React, { useState, useEffect } from "react";
import { View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Text from "./Text";
import Button from "./Button";
import styles from "../styles";
import Colors from "../constants/Colors";

const ImagePickerComponent = ({ onImageTake }) => {
  const [image, setImage] = useState("");

  const getCameraPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  };

  const takeImageHandler = async () => {
    const hasCameraPermission = await getCameraPermission();
    if (!hasCameraPermission) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay!" }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        onImageTake(result.uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  return (
    <View style={styles.picker}>
      <View style={styles.preview}>
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={styles.takenImage}
          />
        ) : (
          <Text>You haven't taken any image yet.</Text>
        )}
      </View>
      <Button
        title={`Take${image ? " Another" : ""} Image`}
        color={1}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImagePickerComponent;
