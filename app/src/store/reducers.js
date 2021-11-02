import { combineReducers } from 'redux';
import FeaturesReducer from './reducers/features';
import NavigationReducer from './reducers/navigation';
import CartReducer from './reducers/cart';

const reducers = combineReducers({
  features: FeaturesReducer,
  navigation: NavigationReducer,
  cart: CartReducer,
});

export default reducers;
