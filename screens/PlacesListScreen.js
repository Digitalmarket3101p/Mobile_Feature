import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import PlaceItem from "../component/PlaceItem";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("PlaceDetailScreen", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
