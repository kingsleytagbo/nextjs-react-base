// ListUsers Component for fetching & listing all users

// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { AUTH_KEY } from '../../services/constants';
import { BaseUrlTypes, HttpRequestTypes, utils } from '../../services/utility';
import UserForm from './user-form';
import AddUser from './add-user';
import UserDetail from './user-detail';
import { EmptyUser } from '../../models/user';

const editmodes = { add: false, edit: false, detail: false, delete: false };
// List Users Component
const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [editItem, setEditItem] = useState({ ...editmodes });
  const [userdetail, setUserDetail] = useState({ ...EmptyUser });
  //const [editItem.add, setAddForm] = useState(false);
  const [userAuth, setUserAuth] = useState({ IsAdmin: false });

  const getUserAuth = () => {
    const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
    setUserAuth({ ...userAuthResult });
    return userAuthResult;
  };

  const getUserDetail = (item: any) => {
    const result = fetchUser(item.ITCC_UserID, HttpRequestTypes.GET);
    result.then((response) => {
      const result = response.json();
      if (result) {
        result.then(
          (result: any) => {
            setUserDetail(result);
          },
          (error: any) => {
            return error;
          }
        );
      }
    });
  };

  const handleAddUserClick = () => {
    setUserDetail({ ...EmptyUser });
    setEditItem({ ...editmodes, add: true });
  };

  const handleEditUser = (item: any) => {
    setEditItem({ ...editmodes, edit: true });
    getUserDetail(item);
  };

  const handleDeleteUser = (item: any) => {
    setEditItem({ ...editmodes, delete: true });
    getUserDetail(item);
  };

  const handleUserDetail = (item: any) => {
    setEditItem({ ...editmodes, detail: true });
    getUserDetail(item);
  };

  const onCancelUserDetail = () => {
    setEditItem({ ...editmodes });
    setUserDetail({ ...EmptyUser });
  };
  const onConfirmDelete = (value: any) => {
    setEditItem({ ...editmodes });
    setUserDetail({ ...EmptyUser });
    const result = fetchUser(value, HttpRequestTypes.DELETE);
    result.then(() => {
      //const result = response.json();
      fetchUsers();
      //return result;
    });
  };

  const onSaveAddUser = () => {
    fetchUsers();
    setEditItem({ ...editmodes, add: false });
  };

  const onCancelAddUser = () => {
    setEditItem({ ...editmodes, add: false });
  };

  const onChangeEditUser = (e: any) => {
    const key: any = e.target.name;
    const value: any = e.target.value;
    const formState: any = { ...userdetail, [key]: value };

    setUserDetail(formState);
  };

  const onCancelEditUser = () => {
    setEditItem({ ...editmodes });
    setUserDetail({ ...EmptyUser });
  };

  const onSaveEditUser = () => {
    postFormRequest(userdetail);
    fetchUsers();
    setUserDetail({ ...EmptyUser });
    setEditItem({ ...editmodes, add: false });
  };

  const postFormRequest = (formData: any) => {
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Users);
    const url = API_FORM_URL + '/' + formData.ITCC_UserID;
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: headers,
    })
      .then()
      .catch();
  };

  const fetchUsers = useCallback(async () => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Users, 1);

    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    fetch(API_FORM_URL, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        const result = response.json();
        if (result) {
          result.then(
            (result: any) => {
              setUsers(result && result.length > 0 ? result : []);
            },
            (error: any) => {
              return error;
              //console.log(error);
            }
          );
        }
      })
      .catch();
  }, []);

  const fetchUser = (id: number, method: HttpRequestTypes) => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Users);
    const url = API_FORM_URL + '/' + id;
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    return fetch(url, {
      method: method,
      headers: headers,
    });
  };

  useEffect(() => {
    const result = getUserAuth();
    if (result.IsAdmin) {
      fetchUsers();
    }
  }, [fetchUsers]);

  return (
    <div className="align-items-center justify-content-center mt-5 mb-5">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {/* <!-- BEGIN - ADD USER BUTTON  --> */}

          {!editItem.add && userdetail.ITCC_UserID === 0 && (
            <div className="d-grid mt-1">
              <button
                onClick={() => handleAddUserClick()}
                className="btn btn-info"
                type="button"
                value="Edit"
              >
                <i className="bi bi-person-plus"></i> &nbsp;Add User
              </button>
            </div>
          )}

          {/* <!-- END - ADD USER BUTTON  --> */}

          {/* <!-- BEGIN ADD USER  --> */}
          {editItem.add && (
            <AddUser
              onSaveAddUser={onSaveAddUser}
              onCancelAddUser={onCancelAddUser}
            ></AddUser>
          )}
          {/* <!-- END ADD USER  --> */}

          {/* <!-- BEGIN EDIT USER  --> */}
          {(editItem.edit && userdetail.ITCC_UserID) > 0 && (
            <section className="card py-1 mt-1">
              <UserForm
                {...userdetail}
                title="Edit User"
                onChange={onChangeEditUser}
                onCancel={onCancelEditUser}
                onClick={onSaveEditUser}
              >
                <i className="bi bi-sticky"> &nbsp; </i>Save
              </UserForm>
            </section>
          )}
          {/* <!-- END EDIT USER  --> */}

          {/* <!-- BEGIN USER DETAIL  --> */}
          {(editItem.detail && userdetail.ITCC_UserID) > 0 && (
            <section className="card py-1 mt-1">
              <UserDetail
                {...userdetail}
                {...editItem}
                title="User Details"
                onCancel={onCancelUserDetail}
              ></UserDetail>
            </section>
          )}
          {/* <!-- END USER DETAIL --> */}

          {/* <!-- BEGIN USER DETAIL  --> */}
          {(editItem.delete && userdetail.ITCC_UserID) > 0 && (
            <section className="card py-1 mt-1">
              <UserDetail
                {...userdetail}
                {...editItem}
                title="Delete User"
                onCancel={onCancelUserDetail}
                onConfirmDelete={onConfirmDelete}
              ></UserDetail>
            </section>
          )}
          {/* <!-- END USER DETAIL --> */}

          {/* <!-- BEGIN LIST USERS  --> */}

          {!editItem.add && userdetail.ITCC_UserID === 0 && (
            <section className="card py-1 mt-2">
              <h3 className="card-title text-center text-dark mt-3">
                <i className="bi bi-people"></i> Users
              </h3>

              <div className="card-body">
                {users.map((item: any, index: number) => {
                  return (
                    <section key={index}>

                      <div className="row">

                        <div className="col-md-6">
                          <label htmlFor="username">UserName</label>
                          <p className="text-dark">{item.UserName}</p>
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="password"> Password</label>
                          <p className="text-dark">{item.Password}</p>
                        </div>
                      </div>

                      <div className="row">

                        <div className="col-md-4">
                          <div className="d-grid mt-3">
                            <button
                              onClick={() => handleUserDetail(item)}
                              className="btn btn-outline-dark btn-sm"
                              type="button"
                              value="Detail"
                            >
                              <i className="bi bi bi-ticket-detailed"></i>{' '}
                              &nbsp;
                            </button>

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="d-grid mt-3">
                            <button
                              onClick={() => handleEditUser(item)}
                              disabled={!userAuth.IsAdmin}
                              className="btn btn-outline-warning btn-sm"
                              type="button"
                              value="Edit"
                            >
                              <i className="bi bi-pencil-square"></i> &nbsp;
                            </button>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="d-grid mt-3">
                            <button
                              onClick={() => handleDeleteUser(item)}
                              disabled={!userAuth.IsAdmin}
                              className="btn btn-outline-danger btn-sm"
                              type="button"
                              value="Delete"
                            >
                              <i className="bi bi-trash3"></i> &nbsp;
                            </button>
                          </div>
                        </div>

                      </div>

                      <hr className="pt-1 bg-info" />
                    </section>
                  );
                })}
                ;
              </div>
            </section>
          )}

          {/* <!-- END LIST USERS  --> */}
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default ListUsers;
