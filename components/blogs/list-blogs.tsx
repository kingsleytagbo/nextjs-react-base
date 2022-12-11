// ListBlogs Component for fetching & listing all items

// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { BaseUrlTypes, HttpRequestTypes, utils } from '../../services/utility';
import BlogForm from './blog-form';
import AddBlog from './add-blog';
import BlogDetail from './blog-detail';
import { EmptyBlog } from '../../models/blog';
import { AUTH_KEY } from '../../services/constants';

const editmodes = { edit: false, detail: false, delete: false };
// List Blogs Component
const ListBlogs = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({ ...editmodes });
  const [itemDetail, setItemDetail] = useState({ ...EmptyBlog });
  const [displayAddForm, setAddForm] = useState(false);
  const [userAuth, setUserAuth] = useState({ IsAdmin: false });

  const getUserAuth = useCallback(async () => {
    const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
    setUserAuth({ ...userAuthResult });
    return userAuthResult;
  }, []);

  const getBlogDetail = (item: any) => {
    const result = fetchBlog(item.ITCC_BlogID, HttpRequestTypes.GET);
    result.then((response) => {
      const result = response.json();
      if (result) {
        result.then(
          (result: any) => {
            setItemDetail(result);
          },
          (error: any) => {
            return error;
          }
        );
      }
    });
  };

  const handleAddBlogClick = () => {
    setAddForm(true);
  };

  const handleEditBlog = (item: any) => {
    setEditItem({ ...editmodes, edit: true });
    getBlogDetail(item);
  };

  const handleDeleteBlog = (item: any) => {
    setEditItem({ ...editmodes, delete: true });
    getBlogDetail(item);
  };

  const handleBlogDetail = (item: any) => {
    setEditItem({ ...editmodes, detail: true });
    getBlogDetail(item);
  };

  const onCancelBlogDetail = () => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyBlog });
  };
  const onConfirmDelete = (value: any) => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyBlog });
    const result = fetchBlog(value, HttpRequestTypes.DELETE);
    result.then(() => {
      //const result = response.json();
      fetchBlogs().then();
    });
  };

  const onSaveAddBlog = () => {
    fetchBlogs().then();
    setAddForm(false);
  };

  const onCancelAddBlog = () => {
    setAddForm(false);
  };

  const onChangeEditBlog = (e: any) => {
    const key: any = e.target.name;
    const value: any = e.target.value;
    const formState: any = { ...itemDetail, [key]: value };

    setItemDetail(formState);
  };

  const onCancelEditBlog = () => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyBlog });
  };

  const onSaveEditBlog = () => {
    postFormRequest(itemDetail);
    fetchBlogs().then();
    setItemDetail({ ...EmptyBlog });
    setAddForm(false);
  };

  const onChangeBlogHandle = (event: any) => {
    const file = event.target.files[0];
    const fileName = file.name || 'image.png';
    const fileSize = file.size / 1024;

    if (fileSize * 1024 > 100000) {
      return;
    }
    const formData = new FormData();

    formData.append('file', file, fileName);
    Object.entries(itemDetail).forEach(([key, value]) => {
      const item: any = value || '';
      formData.append(key, item);
    });

    //console.log({formData: Array.from(formData.entries()), file: file, filename: fileName, fileSize: fileSize})
  };

  const postFormRequest = (formData: any) => {
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Blog);
    const url = API_FORM_URL + '/' + formData.ITCC_BlogID;
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: headers,
    })
    .then()
    .catch();
  };

  const fetchBlogs = useCallback(async () => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Blog, 1);
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    try {
      fetch(API_FORM_URL, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          const result = response.json();
          if (result) {
            result.then(
              (result: any) => {
                setItems(result);
              },
              (error: any) => {
                return error;
                //console.log(error);
              }
            );
          }
        })
        .catch((error) => {
          console.log({ catch: error });
        });
    } catch (error) {
      console.log(error);
      //setItems
    }
  }, []);

  const fetchBlog = (id: number, method: HttpRequestTypes) => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Blog);
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
    getUserAuth().then(() => {
      fetchBlogs();
    });
  }, [fetchBlogs, getUserAuth]);

  return (
    <div className="align-items-center justify-content-center mt-5 mb-5 clearfix">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {/* <!-- BEGIN - ADD USER BUTTON  --> */}

          {!displayAddForm &&
            itemDetail.ITCC_BlogID === 0 &&
            userAuth.IsAdmin === true && (
              <div className="d-grid mt-1">
                <button
                  onClick={() => handleAddBlogClick()}
                  className="btn btn-info"
                  type="button"
                  value="Edit"
                >
                  <i className="bi bi-person-plus"></i> &nbsp;Add Blog
                </button>
              </div>
            )}

          {/* <!-- END - ADD USER BUTTON  --> */}

          {/* <!-- BEGIN ADD USER  --> */}
          {displayAddForm && (
            <AddBlog
              onSaveAddBlog={onSaveAddBlog}
              onCancelAddBlog={onCancelAddBlog}
            ></AddBlog>
          )}
          {/* <!-- END ADD USER  --> */}

          {/* <!-- BEGIN EDIT USER  --> */}
          {(editItem.edit && itemDetail.ITCC_BlogID) > 0 && (
            <section className="card py-1 mt-1">
              <BlogForm
                {...itemDetail}
                title="Edit Blog"
                onChange={onChangeEditBlog}
                onCancel={onCancelEditBlog}
                onClick={onSaveEditBlog}
                onChangeBlogHandle={onChangeBlogHandle}
              >
                <i className="bi bi-sticky"> &nbsp; </i>Save
              </BlogForm>
            </section>
          )}
          {/* <!-- END EDIT USER  --> */}

          {/* <!-- BEGIN USER DETAIL  --> */}
          {(editItem.detail && itemDetail.ITCC_BlogID) > 0 && (
            <section className="card py-1 mt-1">
              <BlogDetail
                {...itemDetail}
                {...editItem}
                title="Blog Details"
                onCancel={onCancelBlogDetail}
              ></BlogDetail>
            </section>
          )}
          {/* <!-- END USER DETAIL --> */}

          {/* <!-- BEGIN USER DETAIL  --> */}
          {(editItem.delete && itemDetail.ITCC_BlogID) > 0 && (
            <section className="card py-1 mt-1">
              <BlogDetail
                {...itemDetail}
                {...editItem}
                title="Delete Blog"
                onCancel={onCancelBlogDetail}
                onConfirmDelete={onConfirmDelete}
              ></BlogDetail>
            </section>
          )}
          {/* <!-- END USER DETAIL --> */}

          {/* <!-- BEGIN LIST USERS  --> */}

          {itemDetail.ITCC_BlogID === 0 && (
            <section className="card py-1 mt-2">
              <h3 className="card-title text-center text-dark mt-3">
                <i className="bi bi-people"></i> Blogs
              </h3>

              <div className="card-body">
                {items.map((item: any, index: number) => {
                  return (
                    <section key={index}>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="d-grid mt-3">
                            <button
                              onClick={() => handleBlogDetail(item)}
                              className="btn btn-outline-dark btn-sm"
                              type="button"
                              value="Detail"
                            >
                              <i className="bi bi bi-ticket-detailed"></i>{' '}
                              &nbsp;
                            </button>
                            <button
                              onClick={() => handleEditBlog(item)}
                              disabled={!userAuth.IsAdmin}
                              className="btn btn-outline-warning btn-sm"
                              type="button"
                              value="Edit"
                            >
                              <i className="bi bi-pencil-square"></i> &nbsp;
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(item)}
                              disabled={!userAuth.IsAdmin}
                              className="btn btn-outline-danger btn-sm"
                              type="button"
                              value="Delete"
                            >
                              <i className="bi bi-trash3"></i> &nbsp;
                            </button>
                          </div>
                        </div>

                        <div className="col-md-5">
                          <p className="text-dark">{item.Name}</p>
                        </div>

                        <div className="col-md-5">
                          <p className="text-dark">{item.Category}</p>
                        </div>
                      </div>

                      {item.ImageUrl && (
                        <div className="row">
                          <div className="col-md-12">
                            <a
                              href={item.ImageUrl}
                              className="text-primary"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <img
                                alt="Image"
                                src={item.ImageUrl}
                                className="img-fluid"
                              />
                            </a>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Description,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <hr className="pt-1 bg-info" />
                    </section>
                  );
                })}
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

export default ListBlogs;
