import { combineReducers } from 'redux';
import allFeaturesReducer from './reducers/allFeatures';
import selectedFeaturesReducer from './reducers/selectedFeatures';
import filteredFeaturesReducer from './reducers/filteredFeatures';

const reducers = combineReducers({
  allFeatures: allFeaturesReducer,
  selectedFeatures: selectedFeaturesReducer,
  filteredFeatures: filteredFeaturesReducer,
});

export default reducers;
