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
  const [editItem, setEditItem] = useState({ ...EmptyGallery });

  const onChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    const formState = { ...editItem, [key]: value };

    setEditItem(formState);
  };

  const onSave = () => {
    postFormRequest().then(() => {
      props.onSaveAddGallery();
    }).catch();
  };

  const onCancel = () => {
    setEditItem({ ...EmptyGallery });
    props.onCancelAddGallery();
  };

  const onChangeImageHandle = (event: any) => {
    const file = event.target.files[0];
    const fileSize = file.size / 1024;

    if (fileSize * 1024 > 100000) {
      return;
    }
    editItem.File = file;

    setEditItem(editItem);
  };

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
    })
      .then()
      .catch();
  };

  // Return Gallery form
  return (
    <section>
      <GalleryForm
        {...editItem}
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
