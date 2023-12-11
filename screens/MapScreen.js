import React, { useState, useEffect, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";

import styles from "../styles";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../component/HeaderButton";
import Colors from "../constants/Colors";

const MapScreen = ({ route, navigation: { setOptions, navigate } }) => {
  const editable = route?.params?.editable !== false;
  const lat = route?.params?.lat || -122;
  const lon = route?.params?.lon || 38;

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: lat,
    longitude: lon,
  });

  useEffect(() => {
    if (editable)
      setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="save"
              iconName="md-save"
              color={Colors.primary}
              size={25}
              onPress={() => {
                if (selectedLocation)
                  navigate("CreatePlaceScreen", {
                    selectedLocation,
                  });
              }}
            />
          </HeaderButtons>
        ),
      });
  }, [selectedLocation]);

  const mapRegion = {
    latitude: lat,
    longitude: lon,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = ({ nativeEvent: { coordinate } }) => {
    if (editable) setSelectedLocation(coordinate);
  };

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Selected Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

export default MapScreen;
