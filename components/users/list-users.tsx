// ListUsers Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import UserForm from "./user-form";

// List User Component
const ListUsers = (props: any) => {
    const API_FORM_URL = '/api/users';
    const [users, setUsers] = useState([]);
    const [edituser, setEditUser] = useState(0);

    const handleEditUser = (id: number) => {
        setEditUser(id);
        console.log({handleEditUser: id});
    };

    const fetchData = () => {
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
    }

    useEffect(() => {
        fetchData();
    }, [props.fetchData]);




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
                                            <div key={index} className='row'>
                                                <div className="col-md-4">
                                                    <label htmlFor="username">Username</label>
                                                    <p className="text-dark">{item.Username}</p>
                                                </div>

                                                <div className="col-md-4">
                                                    <label htmlFor="password"> Password</label>
                                                    <p className="text-dark">{item.Password}</p>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="d-grid mt-3">
                                                        <button
                                                           onClick={() => handleEditUser(item.ITCC_UserID)}
                                                            className="btn btn-info" type="button" value="Edit">
                                                            <i className="bi bi-pencil"></i> &nbsp;Edit
                                                        </button>
                                                    </div>
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
