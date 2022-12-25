// ListBlogs Component for fetching & listing all items

// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { BaseUrlTypes, HttpRequestTypes, utils } from '../../services/utility';
import { useAuthContext } from '../../context/auth-context';
import BlogForm from './blog-form';
import AddBlog from './add-blog';
import BlogDetail from './blog-detail';
import { EmptyBlog } from '../../models/blog';
import { AUTH_KEY } from '../../services/constants';
import Pager from '../pager';


const editmodes = { add:false, edit: false, detail: false, delete: false };
// List Blogs Component
const ListBlogs = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({ ...editmodes });
  const [itemDetail, setItemDetail] = useState({ ...EmptyBlog });
  const [pageNumber, setPageNumber] = useState(1);

  const [userAuth, setUserAuth] = useState({ IsAdmin: false });
  const { userAuthContext } = useAuthContext();

  const getUserAuth = useCallback(async () => {
    const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
    setUserAuth({ ...userAuthResult });
    return userAuthResult;
  }, []);

  const nextPage = (event: any) => {
    event.preventDefault();
    if (items && items.length > 0) {
      const page = pageNumber + 1;
      setPageNumber(page);
      fetchBlogs(page);
    }
  };

  const prevPage = (event: any) => {
    event.preventDefault();
    if (pageNumber > 1) {
      const page = pageNumber - 1;
      setPageNumber(page);
      fetchBlogs(page);
    }
  };

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
    setEditItem({ ...editmodes, add: true });
    //setAddForm(true);
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
    setEditItem({ ...editmodes, add: false });
    //setAddForm(false);
  };

  const onCancelAddBlog = () => {
    setEditItem({ ...editmodes, add: false });
   // setAddForm(false);
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
    //setAddForm(false);
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

  const fetchBlogs = useCallback(async (page: number = 1) => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Blog, page, 3);
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
                setItems(result && result.length > 0 ? result : []);
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
  }, [fetchBlogs, getUserAuth, userAuthContext]);

  return (
    <div className="align-items-center justify-content-center mt-5 mb-5 clearfix">
            <Pager
        pageNumber={pageNumber}
        items={items}
        nextPage={nextPage}
        prevPage={prevPage}
      ></Pager>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {/* <!-- BEGIN - ADD ITEM BUTTON  --> */}

          {!editItem.add && userAuthContext &&
            itemDetail.ITCC_BlogID === 0 &&
            userAuth.IsAdmin === true && (
              <div className="d-grid mt-1">
                <button
                  onClick={() => handleAddBlogClick()}
                  className="btn btn-info"
                  type="button"
                  value="Edit"
                >
                  <i className="bi bi-envelope-plus"></i> &nbsp;Add Blog
                </button>
              </div>
            )}

          {/* <!-- END - ADD ITEM BUTTON  --> */}

          {/* <!-- BEGIN ADD ITEM  --> */}
          {editItem.add && userAuthContext && (
            <AddBlog
              onSaveAddBlog={onSaveAddBlog}
              onCancelAddBlog={onCancelAddBlog}
            ></AddBlog>
          )}
          {/* <!-- END ADD ITEM  --> */}

          {/* <!-- BEGIN EDIT ITEM  --> */}
          {(editItem.edit && itemDetail.ITCC_BlogID) > 0 && userAuthContext && (
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
          {/* <!-- END EDIT ITEM  --> */}

          {/* <!-- BEGIN ITEM DETAIL  --> */}
          {(editItem.detail && itemDetail.ITCC_BlogID) > 0 && userAuthContext && (
            <section className="card py-1 mt-1">
              <BlogDetail
                {...itemDetail}
                {...editItem}
                title="Blog Details"
                onCancel={onCancelBlogDetail}
              ></BlogDetail>
            </section>
          )}
          {/* <!-- END ITEM DETAIL --> */}

          {/* <!-- BEGIN ITEM DELETE  --> */}
          {(editItem.delete && itemDetail.ITCC_BlogID) > 0 && userAuthContext && (
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
          {/* <!-- END ITEM DELETE --> */}

          {/* <!-- BEGIN LIST ITEMS  --> */}

          {!editItem.add && itemDetail.ITCC_BlogID === 0 && (
            <section className="card py-1 mt-2">
              <h3 className="card-title text-center text-dark mt-3">
              <i className="bi bi-envelope-check"></i> Blogs
              </h3>

              <div className="card-body">
                {items.map((item: any, index: number) => {
                  return (
                    <section key={index}>

                      <div className="row">
                        <div className="col-md-12">
                          <p className="text-dark">{item.Name}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                        <p className="text-dark">{item.BlogType}</p>
                        </div>

                        <div className="col-md-6">
                          <p className="text-dark">{item.Category}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                        <div
                            dangerouslySetInnerHTML={{
                              __html: utils.getPostIext(item.Description, 150),
                            }}
                          ></div>
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
                          </div>
                        </div>
                      )}

                      <div className="row">
                        <div className="col-md-4">
                          <div className="d-grid mt-2 mb-2">
                            <button
                              onClick={() => handleBlogDetail(item)}
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
                          <div className="d-grid mt-2 mb-2">
                            <button
                              onClick={() => handleEditBlog(item)}
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
                          <div className="d-grid mt-2 mb-2">
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
                      </div>

                      <hr className="pt-1 bg-info" />
                    </section>
                  );
                })}
              </div>
            </section>
          )}

          {/* <!-- END LIST ITEMS  --> */}
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default ListBlogs;
