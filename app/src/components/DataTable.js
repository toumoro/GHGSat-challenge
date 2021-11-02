import './DataTable.css';

import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function DataTable({ featureCollection }) {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'description', headerName: 'Description', minWidth: 200 },
    { field: 'observed_on', headerName: 'Observed on', minWidth: 130 },
    { field: 'sensor', headerName: 'Sensor', minWidth: 130 },
  ];
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    if (rows.length || featureCollection.length < 1) return;
    setRows(featureCollection.map((feature) => feature.properties));
  }, [rows, featureCollection]);

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[30]}
        onSelectionModelChange={(newSelectionModel) => {
          console.log(`[table] click on ${newSelectionModel}`);
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}

const selector = ({ allFeatures }) => ({ featureCollection: allFeatures });
export default connect(selector)(DataTable);
