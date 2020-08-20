import React from 'react'
import Dashboard from '../components/Dashboard';
import SportsUpdateForm from '../components/SportsUpdateForm';

const UpdatePost = () => {
  return (
    <Dashboard
      route="updatePost"
      title="Update Post"
    >
      <SportsUpdateForm />
    </Dashboard>
  )
}

export default UpdatePost;
