import './Map.css';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { SET_SELECTED_FEATURE } from '../store/types';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map({
  featureCollection,
  selectedFeature,
  filteredFeatureCollection,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-71.2);
  const [lat] = useState(46.81);
  const [zoom] = useState(5);
  const dispatch = useDispatch();

  const setCoordinates = (feature) => {
    const coordinates = feature.geometry.coordinates[0];
    const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);

    for (const coord of coordinates) {
      bounds.extend(coord);
    }

    map.current.fitBounds(bounds, {
      padding: 20,
    });
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current || featureCollection.length < 1) return; // wait for map to initialize and collection to be available
    map.current.on('load', () => {
      map.current.addSource('observations', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: featureCollection,
        },
      });
      map.current.addLayer({
        id: 'observations',
        type: 'fill',
        source: 'observations', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5,
        },
      });
      // Add a black outline around the polygon.
      map.current.addLayer({
        id: 'outline',
        type: 'line',
        source: 'observations',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });
    });
  });

  useEffect(() => {
    if (!map.current.getSource('observations')) return;
    let newCollection = featureCollection;
    if (filteredFeatureCollection.length) {
      newCollection = filteredFeatureCollection;
    }
    map.current
      .getSource('observations')
      .setData({ type: 'FeatureCollection', features: newCollection });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('click', 'observations', (e) => {
      console.log(`[map] click on ${e.features[0].properties.id}`);

      setCoordinates(e.features[0]);
      dispatch({
        type: SET_SELECTED_FEATURE,
        payload: e.features[0],
      }); // send selected feature to the store
    });
  }, [dispatch]);

  useEffect(() => {
    if (selectedFeature == null) return;
    setCoordinates(selectedFeature);
  }, [selectedFeature]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('mouseenter', 'observations', () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    // Change it back to a pointer when it leaves.
    map.current.on('mouseleave', 'observations', () => {
      map.current.getCanvas().style.cursor = '';
    });
  });
  return (
    <div>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
}

const selector = ({ features }) => ({
  featureCollection: features.collection,
  selectedFeature: features.selectedFeature,
  filteredFeatureCollection: features.filteredCollection,
});
export default connect(selector)(Map); // connect the component to the store
