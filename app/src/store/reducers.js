import { combineReducers } from 'redux';
import allFeaturesReducer from './reducers/allFeatures';
import selectedFeaturesRed from './reducers/selectedFeatures';

const reducers = combineReducers({
  allFeatures: allFeaturesReducer,
  selectedFeatures: selectedFeaturesRed,
});

export default reducers;
