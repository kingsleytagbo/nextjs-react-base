// ListUsers Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import UserForm from "./user-form";

// List User Component
const ListUsers = () => {
    const API_FORM_URL = '/api/users';
    const [users, setUsers] = useState([]);
    const [form, setFormValue] = useState({ username: '', password: '' });

    useEffect(() => {
        fetch(API_FORM_URL, {
            method: 'GET'
        }).then(response => {
            const result = response.json();
            if (result) {
                result.then(
                    (result: any) => {
                        setUsers(result);
                        console.log({ result: result });
                    },
                    (error: any) => {
                        console.log(error);
                    }
                )
            }
        }
        );
    }, []);

    const onChange = (e: any) => {
        const key: string = e.target.name;
        const value: string = e.target.value;

        form[key as keyof typeof form] = value;
        const formState: any = Object.assign({}, form);
        setFormValue(formState);

        //console.log({ key: key, value: value });
    };

    const onClick = () => {
        const result = postFormRequest(form);
        console.log({ onClick: form, result: result });
    };

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
        <>

            <section className="py-5 mt-5" key="user-form">


                {/* <!-- BEGIN CONTAINER  -->} */}
                <div className="container align-items-center justify-content-center">

                    {/* <!-- BEGIN FORM  -->} */}

                    <div className="row">
                        <div className="col-md-3"></div>

                        <div className="col-md-6">

                            <section className="card">

                                <h3 className='card-title text-center text-dark mt-3'>List All Users</h3>

                                <div className="card-body">

                                    {users.map((item: any, index: number) => {
                                        return (
                                            <div key={index} className=''>
                                                <div className="mt-3">
                                                    <label htmlFor="username">Username</label>
                                                    <p className="text-dark">{item.username}</p>
                                                </div>

                                                <div className="mt-3">
                                                    <label htmlFor="password"> Password</label>
                                                    <p className="text-dark">{item.password}</p>
                                                </div>
                                            </div>
                                        );
                                    })};

                                </div>

                            </section>

                        </div>

                        <div className="col-md-3"></div>
                    </div>

                    {/* <!-- END FORM  -->} */}

                </div>
                {/* <!-- END CONTAINER  -->} */}


            </section>


        </>

    )
}

export default ListUsers;
