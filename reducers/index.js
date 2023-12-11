import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";

import placesReducer from "./placesReducer";
import isLoadingReducer from "./isLoadingReducer";

export default combineReducers({
  // form: formReducer,
  places: placesReducer,
  isLoading: isLoadingReducer,
});
