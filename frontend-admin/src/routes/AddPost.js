import React from 'react';
import Dashboard from '../components/Dashboard';
import SportsUpdateForm from '../components/SportsUpdateForm';

const AddPost = () => {

  return (
    <Dashboard 
      route="addPost" 
      title="Add Post"
    >
      <SportsUpdateForm />
    </Dashboard>
  )
}

export default AddPost;
