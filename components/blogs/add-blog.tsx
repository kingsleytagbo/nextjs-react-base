// CreateBlog Component for adding new users

// Import Modules
import React, { useState } from 'react';
import BlogForm from './blog-form';
import { EmptyBlog } from '../../models/blog';
import { BaseUrlTypes, utils } from '../../services/utility';
import { AUTH_KEY } from '../../services/constants';

// CreateBlog Component
const AddBlog = (props: any) => {
  const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Blog);
  const [editItem, setEditItem] = useState({ ...EmptyBlog });

  const onChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    const formState = { ...editItem, [key]: value };

    setEditItem(formState);
  };

  const onSave = () => {
    postFormRequest(editItem);
    props.onSaveAddBlog();
  };

  const onCancel = () => {
    setEditItem({ ...EmptyBlog });
    props.onCancelAddBlog();
  };


  const postFormRequest = (formData: any) => {
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    return fetch(API_FORM_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: headers,
    }).then((response) => response.json());
  };

  // Return Blog form
  return (
    <section>
      <BlogForm
        {...editItem}
        title="Create A New Blog"
        onClick={onSave}
        onChange={onChange}
        onCancel={onCancel}
      >
        <i className="bi bi-sticky"></i>&nbsp;Save
      </BlogForm>
    </section>
  );
};

export default AddBlog;
