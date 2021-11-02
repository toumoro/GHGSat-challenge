import { SET_SELECTED_FEATURE, INITIALIZE_DATA } from '../types';

const initialState = {
  collection: [],
  selectedFeature: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE_DATA:
      return { ...state, collection: payload };
    case SET_SELECTED_FEATURE:
      return { ...state, selectedFeature: payload };
    default:
      return state;
  }
};

export default reducer;
