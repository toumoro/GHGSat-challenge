import { ADD_TO_CART, REMOVE_FROM_CART } from '../types';

const initialState = {
  features: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const features = [...state.features, payload];
      return { ...state, features };
    case REMOVE_FROM_CART:
      return state;
    default:
      return state;
  }
};

export default reducer;
