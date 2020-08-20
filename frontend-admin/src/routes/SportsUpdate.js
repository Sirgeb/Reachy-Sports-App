import React from 'react';
import Dashboard from '../components/Dashboard';
import DataTable from '../components/SportsUpdateDataTable';

const SportsUpdate = () => {
  return (
    <Dashboard 
      route="sportsUpdate"
      title="Sports Update"
    >
      <DataTable />
    </Dashboard>
  )
}

export default SportsUpdate;
