import React from 'react';
import { useQuery, gql } from '@apollo/react-hooks';
import Dashboard from '../components/Dashboard';
import DataTable from '../components/SuperstarsDataTable';

const GET_SUPERSTARS = gql`
  query GET_SUPERSTARS {
    getSuperstars {
      id 
      fullname 
      country 
      category 
    }
  }
`;

const Superstars = () => {
  const { data, loading } = useQuery(GET_SUPERSTARS, { fetchPolicy: "cache-and-network" });

  return (
    <Dashboard 
      route="superstars"
      title="Superstars Profile"
    >
      <DataTable 
        superstars={loading ? [] : data.getSuperstars} 
        loading={loading} 
      />
    </Dashboard>
  )
}

export default Superstars;
