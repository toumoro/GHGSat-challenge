import { SET_PAGE } from '../types';

const initialState = {
  currentPage: 'main',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PAGE:
      return { ...state, currentPage: payload };
    default:
      return state;
  }
};

export default reducer;
