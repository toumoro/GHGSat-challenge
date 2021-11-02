import { FILTER_DATA, RESET_FILTER } from '../types';

const initialState = [];

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_DATA:
      return payload;
    case RESET_FILTER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
