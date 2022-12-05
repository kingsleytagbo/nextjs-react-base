// CreateGallery Component for adding new users

// Import Modules
import React, { useState } from 'react';
import GalleryForm from './gallery-form';
import { EmptyGallery } from '../../models/gallery';
import { BaseUrlTypes, utils } from '../../services/utility';
import { AUTH_KEY } from '../../services/constants';

// CreateGallery Component
const AddGallery = (props: any) => {
  const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Gallery);
  const [edituser, setEditGallery] = useState({ ...EmptyGallery });

  const onChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    const formState = { ...edituser, [key]: value };

    setEditGallery(formState);
  };

  const onSave = () => {
    postFormRequest(edituser);
    props.onSaveAddGallery();
  };

  const onCancel = () => {
    setEditGallery({ ...EmptyGallery });
    props.onCancelAddGallery();
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

  // Return Gallery form
  return (
    <section>
      <GalleryForm
        {...edituser}
        title="Create A New Gallery"
        onClick={onSave}
        onChange={onChange}
        onCancel={onCancel}
      >
        <i className="bi bi-sticky"></i>&nbsp;Save
      </GalleryForm>
    </section>
  );
};

export default AddGallery;