import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PlacesNavigation from "./navigation/PlacesNavigation";
import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import placesReducer from "./store/places-reducer";
import { Provider } from "react-redux";
import { init } from "./helpers/db";
init()
  .then(() => {
    console.log("initttt");
  })
  .catch((err) => {
    console.log(err);
  });
const composedEnhancer = applyMiddleware(thunkMiddleware);
const rootReducer = combineReducers({
  places: placesReducer,
});
const store = configureStore({
  reducer: rootReducer,
  composedEnhancer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const App = () => {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
