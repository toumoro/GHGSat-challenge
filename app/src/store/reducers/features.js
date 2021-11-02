import {
  SET_SELECTED_FEATURE,
  INITIALIZE_DATA,
  RESET_FILTER,
  FILTER_DATA,
} from '../types';

const initialState = {
  collection: [],
  selectedFeature: null,
  filteredCollection: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE_DATA:
      return { ...state, collection: payload };
    case SET_SELECTED_FEATURE:
      return { ...state, selectedFeature: payload };
    case FILTER_DATA:
      return { ...state, filteredCollection: payload };
    case RESET_FILTER:
      return { ...state, filteredCollection: initialState.filteredCollection };
    default:
      return state;
  }
};

export default reducer;
