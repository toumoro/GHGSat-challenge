import './DataTable.css';

import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function equalsIgnoreOrder(a, b) {
  if (!a || !b || (a.length !== b.length)) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter(e => e === v).length;
    const bCount = b.filter(e => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
}

function DataTable({ featureCollection }) {
  const [rows, setRows] = useState([]);
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
  const [selectionModel, setSelectionModel] = useState([]);
  const [visibleRows, setVisibleRows] = useState();
  
  useEffect(() => {
    if (rows.length || featureCollection.length < 1) return;
    setRows(featureCollection.map((feature) => feature.properties));
  }, [rows, featureCollection]);

  console.log("visibleRows", visibleRows); // Only render when the visible columns changes.

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGridPro
        rows={rows}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[30]}
        onSelectionModelChange={(newSelectionModel) => {
          console.log(`[table] click on ${newSelectionModel}`);
          setSelectionModel(newSelectionModel);
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

const selector = ({ allFeatures }) => ({ featureCollection: allFeatures });
export default connect(selector)(DataTable);
