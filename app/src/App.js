import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import Map from './components/Map';
import observationsList from './components/observations.json';
import { INITIALIZE_DATA } from './store/types';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const featureCollection = observationsList.features.map(
      (feature, index) => {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            id: `ghg-obs-${index}`,
          },
        };
      }
    );

    dispatch({ type: INITIALIZE_DATA, payload: featureCollection }); // send collection to the store
  }, [dispatch]);

  return (
    <div>
      <Map />
    </div>
  );
}

export default App;
