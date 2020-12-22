import React from 'react';
import { useMutation, gql } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import Dashboard from '../components/Dashboard';
import SportsUpdateForm from '../components/SportsUpdateForm';

const CREATE_POST = gql`
  mutation CREATE_POST(
    $image: String! 
    $caption: String!
    $description: String!
    $category: Category!
    $isFeatured: Boolean
  ) {
    createPost(
      image: $image 
      caption: $caption
      description: $description 
      category: $category 
      isFeatured: $isFeatured
    )
  }
`;

const AddPost = () => {
  const [createPost, { loading }] = useMutation(CREATE_POST, { onCompleted: () => {
    toast.success("Published Successfully", { autoClose: 3000, className: 'toastify-success' });
  }});

  if (loading) {
    toast.info("Publishing Post", { autoClose: 3000 });
  }

  return (
    <Dashboard 
      route="addPost" 
      title="Add Post"
    >
      <SportsUpdateForm createPost={createPost} loading={loading} />
    </Dashboard>
  )
}

export default AddPost;
