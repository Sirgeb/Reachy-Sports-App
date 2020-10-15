import React from 'react';
import { useMutation, gql } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import Dashboard from '../components/Dashboard';
import SuperstarsForm from '../components/SuperstarsForm';

const CREATE_SUPERSTAR = gql`
  mutation CREATE_SUPERSTAR(
    $fullname: String!
    $image: String!
    $category: Category!
    $dateOfBirth: String!
    $country: String!
    $bio: String!
  ) {
    createSuperStar(
      fullname: $fullname
      image: $image
      category: $category
      dateOfBirth: $dateOfBirth
      country: $country
      bio: $bio
    ) {
      id
    }
  }
`;


const AddSuperstar = () => {
  const [createSuperStar, { loading }] = useMutation(CREATE_SUPERSTAR, { onCompleted: () => {
    toast.success("Success!", { autoClose: 3000, className: 'toastify-success' });
  }});

  return (
    <Dashboard 
      route="addSuperstar"
      title="Add Superstar"
    >
      <SuperstarsForm createSuperStar={createSuperStar} loading={loading} />
    </Dashboard>
  )
}

export default AddSuperstar;
