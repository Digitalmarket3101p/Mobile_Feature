import React from "react";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { insertPlace, fetchPlaces } from "../helpers/db";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

import Place from "../models/place";

export const addPlace = (title, image) => async (dispatch) => {
  const fileExt = image.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileExt;

  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: image,
    });

    const dbResult = await insertPlace(
      title,
      newPath,
      "dummy address",
      15.6,
      12.3
    );
    console.log("hello", dbResult);
    dispatch({
      type: ADD_PLACE,
      placeData: { id: dbResult.insertId, title: title, image: newPath },
    });
  } catch (err) {
    console.log("err", err);
    Alert.alert(
      "Something went wrong!",
      "When we were trying to save the image you have taken something went wrong in saving it.",
      [{ text: "Okay!" }]
    );

    return;
  }
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbresult = await fetchPlaces();
      console.log(dbresult);
      dispatch({ type: SET_PLACE, places: dbresult.rows._array });
    } catch (error) {
      console.log("err", err);
      Alert.alert(
        "Something went wrong!",
        "When we were trying to fetch the image Having Problem.",
        [{ text: "Okay!" }]
      );

      return;
    }
  };
};
export const getPlaces = () => async (dispatch) => {
  dispatch(setLoading(true));

  let places = [];

  try {
    const result = await getPlacesFromDB();

    places = result.rows._array.map(
      ({ id, title, address, image, lat, lon }) =>
        new Place(title, address, image, lat, lon, id.toString())
    );
  } catch (err) {
    Alert.alert(
      "Something went wrong!",
      "When we were trying to load places from the DB something went wrong in getting it.",
      [{ text: "Okay!" }]
    );

    dispatch(setLoading(false));

    return;
  }

  dispatch(setLoading(false));
};
