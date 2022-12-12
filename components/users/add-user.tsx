// CreateUser Component for adding new users

// Import Modules
import React, { useState } from 'react';
import UserForm from './user-form';
import { EmptyUser } from '../../models/user';
import { AUTH_KEY } from '../../services/constants';
import { BaseUrlTypes, utils } from '../../services/utility';

// CreateUser Component
const AddUser = (props: any) => {
  const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Users);
  const [edituser, setEditUser] = useState({ ...EmptyUser });

  const onChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    const formState = { ...edituser, [key]: value };

    setEditUser(formState);
  };

  const onSave = () => {
    postFormRequest(edituser).then(() => {
      props.onSaveAddUser();
    })
      .catch();
  };

  const onCancel = () => {
    setEditUser({ ...EmptyUser });
    props.onCancelAddUser();
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
    })
      .then()
      .catch();
  };

  // Return User form
  return (
    <section>
      <UserForm
        {...edituser}
        title="Create A New User"
        onClick={onSave}
        onChange={onChange}
        onCancel={onCancel}
      >
        <i className="bi bi-sticky"></i>&nbsp;Save
      </UserForm>
    </section>
  );
};

export default AddUser;
