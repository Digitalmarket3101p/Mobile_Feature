import {
  ADD_PLACE_ACTION_TYPE,
  GET_PLACES,
} from "../actions/type";

const placesReducer = (state = [], action) => {
  if (action.type === ADD_PLACE_ACTION_TYPE) return [...state, action.payload];
  if (action.type === GET_PLACES) return action.payload;
  return state;
};

export default placesReducer;
