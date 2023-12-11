import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Text from "./Text";
import Button from "./Button";
import styles from "../styles";
import Colors from "../constants/Colors";

const ImagePicker = ({ onImageTake }) => {
  const [image, setImage] = useState("");

  const grantPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay!" }]
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const isPermissionsGranted = await grantPermission();
    if (!isPermissionsGranted) return;

    const { canceled, uri } = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!canceled) {
      setImage(uri);
      onImageTake(uri);
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

export default ImagePicker;
