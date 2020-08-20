import React from 'react';
import Dashboard from '../components/Dashboard';
import SuperstarsForm from '../components/SuperstarsForm';

const AddSuperstar = () => {
  return (
    <Dashboard 
      route="addSuperstar"
      title="Add Superstar"
    >
      <SuperstarsForm />
    </Dashboard>
  )
}

export default AddSuperstar;
