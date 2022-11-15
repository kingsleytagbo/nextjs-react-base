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

    const onClick = () => {
        const result = postFormRequest(edituser);
        props.handleUserAdded();
        //console.log({onClick: edituser, result: result});
    }

    const onCancel = () => {
        setEditUser({ITCC_UserID: 0, Username: '', Password: ''});
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
            onClick={onClick}
            onChange={onChange}
            onCancel={onCancel}
        >
            Save
        </UserForm>
        </section>
    )
}

export default AddUser
