import React from 'react';
import { useQuery, gql } from '@apollo/react-hooks';
import Dashboard from '../components/Dashboard';
import DataTable from '../components/SportsUpdateDataTable';

const GET_POSTS = gql`
  query GET_POSTS {
    getPosts {
      id
      caption
      isFeatured
      category
    }
  }
`;

const SportsUpdate = () => {
  const { data, loading } = useQuery(GET_POSTS, { fetchPolicy: "cache-and-network" });

  return (
    <Dashboard 
      route="sportsUpdate"
      title="Sports Update"
    >
      <DataTable 
        posts={loading ? [] : data.getPosts} 
        loading={loading} 
      />
    </Dashboard>
  )
}

export default SportsUpdate;
