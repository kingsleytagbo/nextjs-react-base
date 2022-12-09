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
    postFormRequest();
    props.onSaveAddBlog();
  };

  const onCancel = () => {
    setEditItem({ ...EmptyBlog });
    props.onCancelAddBlog();
  };

  const onChangeImageHandle = (event: any) => {
    const file = event.target.files[0];
    const fileSize = file.size / 1024;

    if ((fileSize * 1024) > 100000) {
      return;
    }
    editItem.File = file;

    setEditItem(editItem);


  }

  const postFormRequest = () => {

    const headers = {
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    const formData = new FormData();
    const file = editItem.File;
    const fileName = editItem.File?.name || 'image.png';
    
    if (file) {
      formData.append('file', file, fileName);
    }
    Object.entries(editItem).forEach(([key, value]) => {
      if (key !== 'File') {
        const item: any = value || '';
        formData.append(key, item);
      }
    });


    return fetch(API_FORM_URL, {
      method: 'POST',
      body: formData,
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
        onChangeImageHandle={onChangeImageHandle}
      >
        <i className="bi bi-sticky"></i>&nbsp;Save
      </BlogForm>
    </section>
  );
};

export default AddBlog;
