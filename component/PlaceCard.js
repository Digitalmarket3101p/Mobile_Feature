import React from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";

import Text from "./Text";
import styles from "../styles";

const PlaceCard = ({
  item: { id, title, address, image },
  navigation: { navigate },
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigate("PlaceScreen", { id })}>
      <View style={styles.card}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.cardImage}
        />
        <View style={styles.content}>
          <Text size={3} numberOfLines={1}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ marginTop: 10 }}>
            {address}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlaceCard;
