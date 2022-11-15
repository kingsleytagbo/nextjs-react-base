// CreateUser Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import UserForm from "./user-form";

// CreateUser Component
const AddUser = (props:any) => {
    const API_FORM_URL = '/api/users';
    const [form, setFormValue] = useState({ username: '', password: '' });

    const onChange = (e: any) => {
        const key: string = e.target.name;
        const value: string = e.target.value;

        form[key as keyof typeof form] = value;
        const formState: any = Object.assign({}, form);
        setFormValue(formState);

        //console.log({ key: key, value: value });
    }

    const onClick = () => {
        const result = postFormRequest(form);
        props.handleUserAdded();
        console.log({onClick: form, result: result});
    }


    const postFormRequest = (formData: any) => {
        const headers = {
          'Authorization': 'Basic ' + btoa(formData.username + ':' + formData.password),
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
        <UserForm {...form}
            title="Create A New User"
            onClick={onClick}
            onChange={onChange}
        >
            Save
        </UserForm>
        </section>
    )
}

export default AddUser
