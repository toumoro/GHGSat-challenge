import './App.css';

import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import DataTable from './components/DataTable';
import Map from './components/Map';
import observationsList from './components/observations.json';
import { INITIALIZE_DATA, SET_PAGE } from './store/types';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCart, Map as MapIcon } from '@mui/icons-material';
import Cart from './components/Cart';

function getFormattedDate(timestamp) {
  const date = new Date(timestamp);
  return date;
}

function App({ navigation: { currentPage } }) {
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

  const changePage = (page) => {
    dispatch({
      type: SET_PAGE,
      payload: page,
    });
  };

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
        <h1 style={{ marginLeft: 20 }}>GHG Challenge</h1>
        <IconButton
          size='large'
          aria-label='show 4 new mails'
          color='inherit'
          style={{ right: 20, top: 20, position: 'absolute' }}
          onClick={() => changePage('cart')}
        >
          <Badge badgeContent={4} color='error'>
            <ShoppingCart />
          </Badge>
        </IconButton>
        <IconButton
          size='large'
          aria-label='show 4 new mails'
          color='inherit'
          style={{ right: 60, top: 20, position: 'absolute' }}
          onClick={() => changePage('main')}
        >
          <MapIcon />
        </IconButton>
      </Box>
      {currentPage === 'main' && (
        <Box sx={{ gridArea: 'sidebar' }}>
          <DataTable />
        </Box>
      )}
      {currentPage === 'main' && (
        <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main' }}>
          <Map />
        </Box>
      )}
      {currentPage === 'cart' && (
        <Box sx={{}}>
          <Cart />
        </Box>
      )}
      {/* <Box sx={{ gridArea: 'footer', bgcolor: 'warning.main' }}>Footer</Box> */}
    </Box>
  );
}

const selector = ({ navigation }) => ({ navigation });
export default connect(selector)(App); // connect the component to the store
