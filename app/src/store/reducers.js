import { combineReducers } from 'redux';
import FeaturesReducer from './reducers/features';

const reducers = combineReducers({
  features: FeaturesReducer,
});

export default reducers;
