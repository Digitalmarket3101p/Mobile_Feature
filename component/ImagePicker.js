import React, { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  useEffect(() => {
    const requestCameraPermissions = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Sorry, we need camera permissions to make this work!", [
          { text: "Okay" },
        ]);
      }
    };

    requestCameraPermissions();
  }, []);

  const takeImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("rrrr",result.uri);
      setPickedImage(result.uri);
      props.onImageTaken(result.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>No image picked</Text>
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "pink",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
