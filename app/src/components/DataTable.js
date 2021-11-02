import './DataTable.css';

import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { SET_SELECTED_FEATURE } from '../store/types';

function DataTable({ featureCollection, selectedFeature }) {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'description', headerName: 'Description', minWidth: 200 },
    { field: 'observed_on', headerName: 'Observed on', minWidth: 130 },
    { field: 'sensor', headerName: 'Sensor', minWidth: 130 },
  ];
  const [selectionModel, setSelectionModel] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rows.length || featureCollection.length < 1) return;
    setRows(featureCollection.map((feature) => feature.properties));
  }, [rows, featureCollection]);

  useEffect(() => {
    if (selectedFeature == null) return;
    setSelectionModel(selectedFeature.properties.id);
  }, [selectedFeature]);

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
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
        selectionModel={selectionModel}
      />
    </div>
  );
}

const selector = ({ features }) => ({
  featureCollection: features.collection,
  selectedFeature: features.selectedFeature,
});
export default connect(selector)(DataTable);
