import React from "react";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

import { insertPlace, getPlaces as getPlacesFromDB } from "../helpers/db";
import { ADD_PLACE_ACTION_TYPE, GET_PLACES, SET_LOADING } from "./type";
import Place from "../models/Place";

export const addPlace = (place) => async (dispatch) => {
  dispatch(setLoading(true));

  const fileExt = place.image.split("/").pop();
  const path = FileSystem.documentDirectory + fileExt;

  try {
    await FileSystem.moveAsync({ from: place.image, to: path });
    place.image = path;
  } catch (err) {
    dispatch(setLoading(false));
    return Alert.alert(
      "Image Save Error",
      "Something went wrong while saving the image.",
      [{ text: "Okay" }]
    );
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${place.lon},${place.lat}.json?access_token=pk.eyJ1IjoiYXJpYW1hbiIsImEiOiJja2VpczA2dHYwbmYzMnpvNnFldng1a20zIn0.MthUVi2rI2gQpVKvKW3fSA`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }

    const resData = await response.json();
    if (resData.features && resData.features.length > 0) {
      place.address = resData.features[0].place_name;
    } else {
      throw new Error("Address not found");
    }
  } catch (err) {
    dispatch(setLoading(false));
    return Alert.alert(
      "Address Fetch Error",
      "Something went wrong while fetching the place address.",
      [{ text: "Okay" }]
    );
  }

  try {
    const result = await insertPlace(place);
    place.id = result.insertId.toString();
  } catch (err) {
    dispatch(setLoading(false));
    return Alert.alert(
      "Database Save Error",
      "Something went wrong while saving the place to the database.",
      [{ text: "Okay" }]
    );
  }

  dispatch(setLoading(false));

  dispatch({
    type: ADD_PLACE_ACTION_TYPE,
    payload: place,
  });
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
    dispatch(setLoading(false));
    return Alert.alert(
      "Database Load Error",
      "Something went wrong while loading places from the database.",
      [{ text: "Okay" }]
    );
  }

  dispatch(setLoading(false));

  dispatch({
    type: GET_PLACES,
    payload: places,
  });
};

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});
