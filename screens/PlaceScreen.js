import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import Text from "../component/Text";
import styles from "../styles";

const PlaceScreen = ({
  route: {
    params: { id },
  },
  navigation: { navigate },
}) => {
  const { title, address, image, lat, lon } = useSelector(
    ({ places }) => places
  ).find((v) => v.id === id);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image
          style={styles.fullImage}
          source={{
            uri: image,
          }}
        />
        <View style={styles.content}>
          <Text size={1}>{title}</Text>
          <Text>{address}</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() =>
              navigate("MapScreen", {
                editable: false,
                lat,
                lon,
              })
            }
          >
            <Image
              source={{
                uri: `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-o+f00(${lon},${lat})/${lon},${lat},15,0,60/200x150?access_token=pk.eyJ1IjoiYXJpYW1hbiIsImEiOiJja2VpczA2dHYwbmYzMnpvNnFldng1a20zIn0.MthUVi2rI2gQpVKvKW3fSA`,
              }}
              style={{ ...styles.takenImage, marginTop: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceScreen;
