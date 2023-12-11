import { SET_LOADING } from "../actions/type";

const isLoadingReducer = (state = false, action) => {
  if (action.type === SET_LOADING) return action.payload;
  return state;
};

export default isLoadingReducer;
