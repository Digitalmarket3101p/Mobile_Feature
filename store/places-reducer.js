import Place from "../models/place";
import { ADD_PLACE } from "./places-action";

const initialStae = {
  places: [],
};
export default (state = initialStae, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
  return state;
};
