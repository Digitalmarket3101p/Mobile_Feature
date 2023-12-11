import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, FlatList } from "react-native";

import PlaceCard from "../component/PlaceCard";
import { getPlaces } from "../actions";
import styles from "../styles";

const PlacesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
  }, []);

  const places = useSelector(({ places }) => places);

  return (
    <View style={styles.screen}>
      <FlatList
        data={places}
        keyExtractor={({ id }) => id}
        renderItem={(props) => <PlaceCard navigation={navigation} {...props} />}
      />
    </View>
  );
};

export default PlacesScreen;
