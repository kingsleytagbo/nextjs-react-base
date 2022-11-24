// ListUsers Component for add new student

// Import Modules
import React, { useState, useEffect, useCallback } from "react";
import { BaseUrlTypes, utils } from "../../services/utility";
import AddUser from "./add-user";
import UserForm from "./user-form";

const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Users);

// List Users Component
const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [edituser, setEditUser] = useState({ ITCC_UserID: 0, Username: '', Password: '' });
    const [displayAddForm, setAddForm] = useState(false);

    const handleAddUserClick = () => {
        setAddForm(true);
    };

    const handleEditUser = (item: any) => {
        setEditUser(item);
        fetchUser(item.ITCC_UserID);
    };

    const onSaveAddUser = () => {
        fetchUsers();
        setAddForm(false);
    };

    const onCancelAddUser = () => {
        setAddForm(false);
    }

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
        postFormRequest(edituser);
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

    const fetchUsers = useCallback(async () => {
        fetch(API_FORM_URL, {
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
    }, []);

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
    }, [fetchUsers]);



    return (
        <div className="container align-items-center justify-content-center mt-5 mb-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">

                    {/* <!-- BEGIN - ADD USER BUTTON  --> */}

                    {(!displayAddForm && (edituser.ITCC_UserID
                        === 0)) &&

                        <div className="d-grid mt-1">
                            <button
                                onClick={() => handleAddUserClick()}
                                className="btn btn-info" type="button" value="Edit">
                                <i className="bi bi-person-plus"></i> &nbsp;Add User
                            </button>
                        </div>

                    }

                    {/* <!-- END - ADD USER BUTTON  --> */}


                    {/* <!-- BEGIN ADD USER  --> */}
                    {displayAddForm &&
                        <AddUser
                            onSaveAddUser={onSaveAddUser}
                            onCancelAddUser={onCancelAddUser}
                        ></AddUser>
                    }
                    {/* <!-- END ADD USER  --> */}


                    {/* <!-- BEGIN EDIT USER  --> */}
                    {((edituser.ITCC_UserID && edituser.ITCC_UserID)
                        > 0) &&
                        <section className="card py-1 mt-1">
                            <UserForm {...edituser}
                                title="Edit User"
                                onChange={onChangeEditUser}
                                onCancel={onCancelEditUser}
                                onClick={onSaveEditUser}
                            >

                                <i className="bi bi-sticky"> &nbsp; </i>Save
                            </UserForm>
                        </section>
                    }
                    {/* <!-- BEGIN EDIT USER  --> */}


                    {/* <!-- BEGIN LIST USERS  --> */}

                    {(edituser.ITCC_UserID === 0) &&

                        <section className="card py-1 mt-2">

                            <h3 className='card-title text-center text-dark mt-3'><i className="bi bi-people"></i> Users</h3>

                            <div className="card-body">

                                {users.map((item: any, index: number) => {
                                    return (
                                        <section key={index}>
                                            <div className='row'>
                                                <div className="col-md-2">
                                                    <div className="d-grid mt-3">
                                                        <button
                                                            onClick={() => handleEditUser(item)}
                                                            className="btn btn-outline-info" type="button" value="Edit">
                                                            <i className="bi bi-pencil-square"></i> &nbsp;Edit
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-md-5">
                                                    <label htmlFor="username">Username</label>
                                                    <p className="text-dark">{item.Username}</p>
                                                </div>

                                                <div className="col-md-5">
                                                    <label htmlFor="password"> Password</label>
                                                    <p className="text-dark">{item.Password}</p>
                                                </div>

                                            </div>
                                            <hr className="pt-1 bg-info" /></section>
                                    );
                                })};

                            </div>

                        </section>
                    }

                    {/* <!-- END LIST USERS  --> */}


                </div>
                <div className="col-md-2"></div>
            </div>
        </div>

    )
}

export default ListUsers;
