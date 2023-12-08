import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";
import { insertPlace } from "../helpers/db";

export const addPlace = (title, image) => {
  console.log(image);
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    console.log("image", image);
    console.log("newPath", newPath);

    try {
      const moveResult = await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      console.log("move", moveResult);

      // Check if the move was successful before proceeding
      if (moveResult?.canceled === false) {
        const dbResult = await insertPlace(
          title,
          newPath,
          "dummy address",
          15.6,
          12.3
        );
        console.log("hello", dbResult);
      } else {
        console.log("Image move canceled or failed");
      }
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: ADD_PLACE,
      placeData: { title: title, image: newPath },
    });
  };
};
