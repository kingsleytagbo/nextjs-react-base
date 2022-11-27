// ListUsers Component for fetching & listing all users

// Import Modules
import React, { useState, useEffect, useCallback } from "react";
import { AUTH_KEY } from "../../services/constants";
import { BaseUrlTypes, HttpRequestTypes, utils } from "../../services/utility";
import UserForm from "./user-form";
import AddUser from "./add-user";
import UserDetail from "./user-detail";
import { EmptyUser } from "../../models/user";

const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Users);
const editmodes = { edit: false, detail: false, delete:false };

// List Users Component
const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [edituser, setEditUser] = useState({ ...editmodes });
    const [userdetail, setUserDetail] = useState({ ...EmptyUser });
    const [displayAddForm, setAddForm] = useState(false);
    const [userAuth, setUserAuth] = useState({ IsAdmin: false });

    const getUserAuth = () => {
        const userAuthResult = utils.getUserAuthRoles(AUTH_KEY, 'admin');
        setUserAuth({ ...userAuthResult });
    };

    
    const getUserDetail = (item: any) => {
        const result = fetchUser(item.ITCC_UserID, HttpRequestTypes.GET);
        result.then(response => {
            const result = response.json();
            if (result) {
                result.then(
                    (result: any) => {
                        setUserDetail(result);
                    },
                    (error: any) => {
                        return error;
                    }
                )
            }
        }
        );
    };


    const handleAddUserClick = () => {
        setAddForm(true);
    };

    const handleEditUser = (item: any) => {
        setEditUser({ ...editmodes, edit: true });
        getUserDetail(item);
    };

    const handleDeleteUser = (item: any) => {
        setEditUser({ ...editmodes, delete: true });
        getUserDetail(item);
    };

    const handleUserDetail = (item: any) => {
        setEditUser({ ...editmodes, detail: true });
        getUserDetail(item);
    };

    const onCancelUserDetail = () => {
        setEditUser({ ...editmodes });
        setUserDetail({ ...EmptyUser });
    }
    const onConfirmDelete = (value:any) => {
        setEditUser({ ...editmodes });
        setUserDetail({ ...EmptyUser });
        console.log({onConfirmDelete: value});
        const result = fetchUser(value, HttpRequestTypes.DELETE);
        result.then(response => {
            const result = response.json();
            if (result) {
                result.then(
                    (result: any) => {
                    },
                    (error: any) => {
                        return error;
                    }
                )
            }
        }
        );
    }

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
        const formState: any = ({ ...userdetail, [key]: value });

        setUserDetail(formState);
    }

    const onCancelEditUser = () => {
        setEditUser({ ...editmodes });
        setUserDetail({ ...EmptyUser });
    }

    const onSaveEditUser = () => {
        postFormRequest(userdetail);
        fetchUsers();
        setUserDetail({ ...EmptyUser });
        setAddForm(false);
    }

    const postFormRequest = (formData: any) => {
        const headers = {
            'Authorization': 'Basic ' + btoa(formData.UserName + ':' + formData.Password),
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
                    },
                    (error: any) => {
                        return error;
                        //console.log(error);
                    }
                )
            }
        }
        );
    }, []);

    const fetchUser = (id: number, method:HttpRequestTypes) => {
        const url = API_FORM_URL + '/' + id;
        return fetch(url, {
            method: method
        });
    }

    useEffect(() => {
        getUserAuth();
        fetchUsers();
    }, [fetchUsers]);



    return (
        <div className="align-items-center justify-content-center mt-5 mb-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">

                    {/* <!-- BEGIN - ADD USER BUTTON  --> */}

                    {(!displayAddForm && (userdetail.ITCC_UserID
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
                    {((edituser.edit && userdetail.ITCC_UserID)
                        > 0) &&
                        <section className="card py-1 mt-1">
                            <UserForm {...userdetail}
                                title="Edit User"
                                onChange={onChangeEditUser}
                                onCancel={onCancelEditUser}
                                onClick={onSaveEditUser}
                            >

                                <i className="bi bi-sticky"> &nbsp; </i>Save
                            </UserForm>
                        </section>
                    }
                    {/* <!-- END EDIT USER  --> */}


                    {/* <!-- BEGIN USER DETAIL  --> */}
                    {((edituser.detail && userdetail.ITCC_UserID)
                        > 0) &&
                        <section className="card py-1 mt-1">
                            <UserDetail {...userdetail}
                                                            {...edituser}
                              title="User Details"
                                onCancel={onCancelUserDetail}
                            >
                            </UserDetail>
                        </section>
                    }
                    {/* <!-- END USER DETAIL --> */}

                    {/* <!-- BEGIN USER DETAIL  --> */}
                    {((edituser.delete && userdetail.ITCC_UserID)
                        > 0) &&
                        <section className="card py-1 mt-1">
                            <UserDetail 
                                {...userdetail}
                                {...edituser}
                                title="Delete User"
                                onCancel={onCancelUserDetail}
                                onConfirmDelete ={onConfirmDelete}
                            >
                            </UserDetail>
                        </section>
                    }
                    {/* <!-- END USER DETAIL --> */}


                    {/* <!-- BEGIN LIST USERS  --> */}

                    {(userdetail.ITCC_UserID === 0) &&

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
                                                            onClick={() => handleUserDetail(item)}
                                                            className="btn btn-outline-dark btn-sm" type="button" value="Detail">
                                                            <i className="bi bi bi-ticket-detailed"></i> &nbsp;
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditUser(item)}
                                                            disabled={!userAuth.IsAdmin}
                                                            className="btn btn-outline-warning btn-sm" type="button" value="Edit">
                                                            <i className="bi bi-pencil-square"></i> &nbsp;
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(item)}
                                                            disabled={!userAuth.IsAdmin}
                                                            className="btn btn-outline-danger btn-sm" type="button" value="Delete">
                                                            <i className="bi bi-trash3"></i> &nbsp;
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-md-5">
                                                    <label htmlFor="username">UserName</label>
                                                    <p className="text-dark">{item.UserName}</p>
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


