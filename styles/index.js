import { StyleSheet, Dimensions } from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    height: Dimensions.get("window").height,
  },
  text: {
    color: Colors.foreground,
    fontFamily: "source-sans-pro",
  },
  text1: {
    fontSize: 20,
  },
  text2: {
    fontSize: 18,
  },
  text3: {
    fontSize: 16,
  },
  text4: {
    fontSize: 14,
  },
  text5: {
    fontSize: 12,
  },
  text6: {
    fontSize: 10,
  },
  button: {
    borderRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderWidth: 1,
    backgroundColor: Colors.background,
  },
  primary: {
    borderColor: Colors.primary,
  },
  secondary: {
    borderColor: Colors.secondary,
  },
  danger: {
    borderColor: Colors.danger,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    color: Colors.foreground,
    fontFamily: "source-sans-pro",
    fontSize: 14,
    marginTop: -5,
  },
  inputContainer: {
    marginVertical: 15,
  },
  card: {
    flexDirection: "row",
    borderColor: Colors.secondary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    backgroundColor: Colors.secondary,
  },
  content: {
    padding: 10,
  },
  picker: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  preview: {
    margin: 10,
    width: 200,
    height: 150,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  takenImage: {
    width: 200,
    height: 150,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  map: {
    flex: 1,
  },
  fullImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.75,
  },
});

export default styles;
