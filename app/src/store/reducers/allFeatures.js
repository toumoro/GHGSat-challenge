import { INITIALIZE_DATA } from '../types';

const initialState = [];

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE_DATA:
      return payload;
    default:
      return state;
  }
};

export default reducer;
