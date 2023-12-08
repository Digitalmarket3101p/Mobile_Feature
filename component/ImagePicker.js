import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
const ImgPicker = (props) => {
  const takeImageHandler = () => {
    ImagePicker.launchCameraAsync();
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked</Text>
        <Image style={styles.image} />
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
