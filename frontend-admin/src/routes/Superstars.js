import React from 'react'
import Dashboard from '../components/Dashboard';
import DataTable from '../components/SuperstarsDataTable';

const Superstars = () => {
  return (
    <Dashboard 
      route="superstars"
      title="Superstars Profile"
    >
      <DataTable />
    </Dashboard>
  )
}

export default Superstars;
