import './App.css';

import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import DataTable from './components/DataTable';
import Map from './components/Map';
import observationsList from './components/observations.json';
import { INITIALIZE_DATA } from './store/types';

function getFormattedDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('fr-CA');
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const featureCollection = observationsList.features.map(
      (feature, index) => {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            observed_on: getFormattedDate(
              observationsList.features[index].properties.observed_on
            ),
            id: `ghg-obs-${index}`,
          },
        };
      }
    );

    dispatch({ type: INITIALIZE_DATA, payload: featureCollection }); // send collection to the store
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `
          "header header header header"
          "sidebar main main main"
          "footer footer footer footer"
        `,
      }}
    >
      <Box sx={{ gridArea: 'header' }}>
        <h1>GHG Challenge</h1>
      </Box>
      <Box sx={{ gridArea: 'sidebar' }}>
        <DataTable />
      </Box>
      <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main' }}>
        <Map />
      </Box>
      {/* <Box sx={{ gridArea: 'footer', bgcolor: 'warning.main' }}>Footer</Box> */}
    </Box>
  );
}

export default App;
