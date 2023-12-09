import Place from "../models/place";
import { ADD_PLACE, SET_PLACE } from "./places-action";

const initialStae = {
  places: [],
};
export default (state = initialStae, action) => {
  switch (action.type) {
    case SET_PLACE :
      return {
        places: action.places.map(pl=> new Place(pl.id.toString(),pl.title,pl.imageUri))
      }
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
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
