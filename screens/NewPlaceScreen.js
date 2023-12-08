import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesaction from "../store/places-action";
import ImgPicker from "../component/ImagePicker";

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectImage] = useState();
  const titleChangeHandler = (text) => {
    //add validation
    setTitleValue(text);
  };
  const imageTakenHandler = (imagePath) => {
    setSelectImage(imagePath);
  };
  const savePlaceHandler = () => {
    dispatch(placesaction.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
