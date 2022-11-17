// ListUsers Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import { BaseUrlTypes, Utility } from "../../services/utility";
import AddUser from "./add-user";
import UserForm from "./user-form";

// List User Component
const ListUsers = () => {
    const utils = new Utility();
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Users);

    const [users, setUsers] = useState([]);
    const [edituser, setEditUser] = useState({ ITCC_UserID: 0, Username: '', Password: '' });
    const [displayAddForm, setAddForm] = useState(false);

    const handleAddUserClick = () => {
        setAddForm(true);
    };

    const handleEditUser = (item: any) => {
       // console.log({handleEditUser: item})
        setEditUser(item);
        fetchUser(item.ITCC_UserID);
    };

    const handleUserAdded = () => {
        fetchUsers();
        setAddForm(false);
    };

    const onChangeEditUser = (e: any) => {
        const key: any = e.target.name;
        const value: any = e.target.value;
        const formState: any = ({ ...edituser, [key]: value });

        setEditUser(formState);
    }

    const onCancelEditUser = () => {
        setEditUser({ ITCC_UserID: 0, Username: '', Password: '' });
        setAddForm(false);
    }

    const onSaveEditUser = () => {
        const result = postFormRequest(edituser);
        fetchUsers();
        setEditUser({ ITCC_UserID: 0, Username: '', Password: '' });
        setAddForm(false);
    }

    const postFormRequest = (formData: any) => {
        const headers = {
            'Authorization': 'Basic ' + btoa(formData.Username + ':' + formData.Password),
            'Content-Type': 'application/json'
        };

        const url = API_FORM_URL + '/' + formData.ITCC_UserID;
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: headers
        }).then(response => response.json());
    }

    const fetchUsers = () => {
        const url = API_FORM_URL;
        fetch(url, {
            method: 'GET'
        }).then(response => {
            const result = response.json();
            if (result) {
                result.then(
                    (result: any) => {
                        setUsers(result);
                       // console.log({ fetchUsers: result });
                    },
                    (error: any) => {
                        //console.log(error);
                    }
                )
            }
        }
        );
    }

    const fetchUser = (id: number) => {
        const url = API_FORM_URL + '/' + id;
        //console.log({ fetchUser: id, url: url });
        fetch(url, {
            method: 'GET'
        }).then(response => {
            const result = response.json();
            if (result) {
                result.then(
                    (result: any) => {
                        //setUser(result);
                        //console.log({ fetchUser: result });
                    },
                    (error: any) => {
                        //console.log(error);
                    }
                )
            }
        }
        );
    }

    useEffect(() => {
        fetchUsers();
    }, []);



    return (
        <>

            {/* <!-- BEGIN - ADD USER BUTTON  --> */}

            {(!displayAddForm) &&
                <section className="row align-items-center justify-content-center" key="add-users-button">
                    <div className="col-md-12">
                        <div className="d-grid mt-3">
                            <button
                                onClick={() => handleAddUserClick()}
                                className="btn btn-info" type="button" value="Edit">
                                <i className="bi bi-pencil"></i> &nbsp;Add User
                            </button>
                        </div>
                    </div>
                </section>
            }

            {/* <!-- END - ADD USER BUTTON  --> */}


            {/* <!-- BEGIN ADD USER  --> */}
            {displayAddForm &&
                <AddUser handleUserAdded={handleUserAdded}></AddUser>
            }
            {/* <!-- END ADD USER  --> */}


            {/* <!-- BEGIN EDIT USER  --> */}
            {(edituser && (edituser.ITCC_UserID && edituser.ITCC_UserID)
                > 0) &&
                <section>
                    <UserForm {...edituser}
                        title="Edit User"
                        onChange={onChangeEditUser}
                        onCancel={onCancelEditUser}
                        onClick={onSaveEditUser}
                    >

                        Save
                    </UserForm>
                </section>
            }
            {/* <!-- BEGIN EDIT USER  --> */}


            {/* <!-- BEGIN LIST USERS  --> */}

            {(edituser.ITCC_UserID === 0) &&
                <section className="py-1 mt-1" key="list-users">


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
                                                <section key={index}>
                                                    <div className='row'>
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
                                                                    onClick={() => handleEditUser(item)}
                                                                    className="btn btn-info" type="button" value="Edit">
                                                                    <i className="bi bi-pencil"></i> &nbsp;Edit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className="pt-1 bg-info" /></section>
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
            }


            {/* <!-- END LIST USERS  --> */}


        </>

    )
}

export default ListUsers;
