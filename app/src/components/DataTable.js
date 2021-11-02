import './DataTable.css';

import {
  DataGridPro,
  GridToolbar,
  gridVisibleSortedRowIdsSelector,
  useGridApiRef,
} from '@mui/x-data-grid-pro';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  FILTER_DATA,
  RESET_FILTER,
  SET_SELECTED_FEATURE,
} from '../store/types';

function equalsIgnoreOrder(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const value of uniqueValues) {
    const aCount = a.filter((current) => current === value).length;
    const bCount = b.filter((current) => current === value).length;
    if (aCount !== bCount) return false;
  }
  return true;
}

function getFeaturesFromIds(featureCollection, featureIdCollection) {
  return featureCollection.filter(({ properties }) =>
    featureIdCollection.includes(properties.id)
  );
}

function moveToCoordinates(selectionModel, apiRef) {
  const rowIndex = gridVisibleSortedRowIdsSelector(
    apiRef.current.state
  ).findIndex((id) => id === selectionModel);
  if (rowIndex < 0) return;
  const coordinates = { rowIndex, colIndex: 0 };
  apiRef.current.scrollToIndexes(coordinates);
}

function DataTable({ featureCollection, selectedFeature }) {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [visibleRows, setVisibleRows] = useState();

  const apiRef = useGridApiRef();

  const columns = [
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 200,
    },
    {
      field: 'observed_on',
      headerName: 'Observed on',
      type: 'date',
      minWidth: 130,
    },
    { field: 'sensor', headerName: 'Sensor', minWidth: 130 },
  ];

  useEffect(() => {
    if (rows.length || featureCollection.length < 1) return;
    setRows(featureCollection.map((feature) => feature.properties));
  }, [rows, featureCollection]);

  useEffect(() => {
    if (selectedFeature == null) return;
    setSelectionModel(selectedFeature.properties.id);
    moveToCoordinates(selectedFeature.properties.id, apiRef);
  }, [selectedFeature, apiRef]);

  useEffect(() => {
    if (visibleRows) {
      const filteredFeatureCollection = getFeaturesFromIds(
        featureCollection,
        visibleRows
      );
      dispatch({ type: FILTER_DATA, payload: filteredFeatureCollection }); // send an array of feature ids
    } else {
      dispatch({ type: RESET_FILTER }); // reset the store to an empty array
    }
  }, [featureCollection, visibleRows, dispatch]);

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGridPro
        apiRef={apiRef}
        rows={rows}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[30]}
        onSelectionModelChange={(newSelectionModel, details) => {
          console.log(`[table] click on ${newSelectionModel}`);

          var selectionObject = Object.values(featureCollection).filter(
            (feature) => feature.properties.id === newSelectionModel[0]
          )[0];

          setSelectionModel(newSelectionModel);
          dispatch({
            type: SET_SELECTED_FEATURE,
            payload: selectionObject,
          }); // send selected feature to the store
        }}
        onStateChange={({ filter }) => {
          if (!equalsIgnoreOrder(filter.visibleRows, visibleRows)) {
            const newRows = filter.visibleRows;
            setVisibleRows(newRows);
          }
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}

const selector = ({ features }) => ({
  featureCollection: features.collection,
  selectedFeature: features.selectedFeature,
  filteredFeatureCollection: features.filteredCollection,
});
export default connect(selector)(DataTable);
