// CreateUser Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import UserForm from "./user-form";

// CreateUser Component
const AddUser = (props:any) => {
    const API_FORM_URL = '/api/users';
    const [edituser, setEditUser] = useState({ ITCC_UserID: 0, Username: '', Password: '' });

    const onChange = (e: any) => {
        const key: any = e.target.name;
        const value: any = e.target.value;
        const formState: any = ({ ...edituser, [key]: value });
        
        setEditUser(formState);
    }

    const onSave = () => {
        const result = postFormRequest(edituser);
        props.onSaveAddUser();
    }

    const onCancel = () => {
        setEditUser({ITCC_UserID: 0, Username: '', Password: ''});
        props.onCancelAddUser();
    }


    const postFormRequest = (formData: any) => {
        const headers = {
          'Authorization': 'Basic ' + btoa(formData.Username + ':' + formData.Password),
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
