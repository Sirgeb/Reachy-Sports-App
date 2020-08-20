import React from 'react';
import Dashboard from '../components/Dashboard';
import SuperstarsForm from '../components/SuperstarsForm';

const UpdateSuperstar = () => {
  return (
    <Dashboard
      route="updateSuperstar"
      title="Update Superstar"
    >
      <SuperstarsForm />
    </Dashboard>
  )
}

export default UpdateSuperstar;
