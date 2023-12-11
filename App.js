import React from "react";
import {
  configureStore,
  getDefaultMiddleware,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { View } from "react-native";
import { useFonts } from "expo-font";
import thunk from "redux-thunk";

import Navigator from "./navigation/PlacesNavigation";
import Loading from "./component/Loading";
import reducers from "./reducers";
import { init as initialDB } from "./helpers/db";
import styles from "./styles";

initialDB()
  .then(() => {
    console.log("DB initialized.");
  })
  .catch((err) => {
    console.log("Failed initializing DB.");
  });

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const App = () => {
  let [isFontLoaded] = useFonts({
    "source-sans-pro-italic": require("./assets/fonts/SourceSansPro-Italic.ttf"),
    "source-sans-pro": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "source-sans-pro-semi-bold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
    "source-sans-pro-semi-bold-italic": require("./assets/fonts/SourceSansPro-SemiBoldItalic.ttf"),
  });

  if (!isFontLoaded) return <Loading />;

  return (
    <Provider store={store}>
      <View style={styles.screen}>
        <Navigator />
      </View>
    </Provider>
  );
};

export default App;
