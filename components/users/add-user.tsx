// CreateUser Component for adding new users

// Import Modules
import React, { useState } from "react";
import UserForm from "./user-form";
import { EmptyUser } from "../../models/user";
// CreateUser Component
const AddUser = (props:any) => {
    const API_FORM_URL = '/api/users';
    const [edituser, setEditUser] = useState({ ...EmptyUser });

    const onChange = (e: any) => {
        const key = e.target.name;
        const value = e.target.value;
        const formState = ({ ...edituser, [key]: value });
        
        setEditUser(formState);
    }

    const onSave = () => {
        postFormRequest(edituser);
        props.onSaveAddUser();
    }

    const onCancel = () => {
        setEditUser({...EmptyUser});
        props.onCancelAddUser();
    }


    const postFormRequest = (formData: any) => {
        const headers = {
          'Authorization': 'Basic ' + btoa(formData.UserName + ':' + formData.Password),
          'Content-Type': 'application/json'
        };
    
        return fetch(API_FORM_URL, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: headers
        }).then(response => response.json());
      }

    // Return User form
    return (
        <section>
        <UserForm {...edituser}
            title="Create A New User"
            onClick={onSave}
            onChange={onChange}
            onCancel={onCancel}
        >
            <i className="bi bi-sticky"></i>&nbsp;Save
        </UserForm>
        </section>
    )
}

export default AddUser
