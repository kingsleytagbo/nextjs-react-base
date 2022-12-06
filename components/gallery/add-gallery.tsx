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
  const [editgallery, setEditGallery] = useState({ ...EmptyGallery });

  const onChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    const formState = { ...editgallery, [key]: value };

    setEditGallery(formState);
  };

  const onSave = () => {
    postFormRequest();
    props.onSaveAddGallery();
  };

  const onCancel = () => {
    setEditGallery({ ...EmptyGallery });
    props.onCancelAddGallery();
  };

  const onChangeImageHandle = (event: any) => {
    const file = event.target.files[0];
    const fileSize = file.size / 1024;

    if ((fileSize * 1024) > 100000) {
      return;
    }
    editgallery.File = file;

    setEditGallery(editgallery);


  }

  const postFormRequest = () => {

    const headers = {
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    const formData = new FormData();
    const file = editgallery.File;
    const fileName = editgallery.File?.name || 'image.png';
    
    if (file) {
      formData.append('file', file, fileName);
    }
    Object.entries(editgallery).forEach(([key, value]) => {
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

  // Return Gallery form
  return (
    <section>
      <GalleryForm
        {...editgallery}
        title="Create A New Gallery"
        onClick={onSave}
        onChange={onChange}
        onCancel={onCancel}
        onChangeImageHandle={onChangeImageHandle}
      >
        <i className="bi bi-sticky"></i>&nbsp;Save
      </GalleryForm>
    </section>
  );
};

export default AddGallery;
