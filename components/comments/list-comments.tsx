// ListComments Component for fetching & listing all items

// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { BaseUrlTypes, HttpRequestTypes, utils } from '../../services/utility';
import { useAuthContext } from '../../context/auth-context';
import CommentForm from './comment-form';
import AddComment from './add-comment';
import CommentDetail from './comment-detail';
import { EmptyComment } from '../../models/comment';
import { AUTH_KEY } from '../../services/constants';

const editmodes = { edit: false, detail: false, delete: false };
// List Comments Component
const ListComments = (props: any) => {
  const API_COMMENTS_URL = props.postSlug ? 
  utils.getBaseApi(BaseUrlTypes.Comment).concat('/slug/', props.postSlug) : 
  utils.getBaseApi(BaseUrlTypes.Comment, 1);

  const [items, setItems] = useState(props.data);
  const [editItem, setEditItem] = useState({ ...editmodes });
  const [itemDetail, setItemDetail] = useState({ ...EmptyComment });
  const [displayAddForm, setAddForm] = useState(false);
  //const [userAuth, setUserAuth] = useState({ IsAdmin: false });
  const { userAuthContext, userAuth } = useAuthContext();

  const getUserAuth = useCallback(async () => {
    const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
    //setUserAuth({ ...userAuthResult });
    return userAuthResult;
  }, []);

  const getCommentDetail = (item: any) => {
    setItemDetail(item);
  };

  const handleAddCommentClick = () => {
    setAddForm(true);
  };

  const handleEditComment = (item: any) => {
    setEditItem({ ...editmodes, edit: true });
    getCommentDetail(item);
  };

  const handleDeleteComment = (item: any) => {
    setEditItem({ ...editmodes, delete: true });
    getCommentDetail(item);
  };

  const handleCommentDetail = (item: any) => {
    setEditItem({ ...editmodes, detail: true });
    getCommentDetail(item);
  };

  const onCancelCommentDetail = () => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyComment });
  };
  const onConfirmDelete = (value: any) => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyComment });
    const result = fetchComment(value, HttpRequestTypes.DELETE);
    result.then(() => {
      //const result = response.json();
      fetchComments().then();
    });
  };

  const onSaveAddComment = () => {
    fetchComments().then();
    setAddForm(false);
  };

  const onCancelAddComment = () => {
    setAddForm(false);
  };

  const onChangeEditComment = (e: any) => {
    const key: any = e.target.name;
    const value: any = e.target.value;
    const formState: any = { ...itemDetail, [key]: value };

    setItemDetail(formState);
  };

  const onCancelEditComment = () => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyComment });
  };

  const onSaveEditComment = () => {
    postFormRequest(itemDetail);
    fetchComments().then();
    setItemDetail({ ...EmptyComment });
    setAddForm(false);
  };

  const onChangeCommentHandle = (event: any) => {
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

    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Comment);
    const url = API_FORM_URL + '/' + formData.ITCC_CommentID;

    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: headers,
    })
      .then()
      .catch();
  };

  const fetchComments = useCallback(async () => {

    //const API_FORM_URL = props.postSlug ? API_COMMENTS_URL : utils.getBaseApi(BaseUrlTypes.Comment, 1);

    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    try {
      fetch(API_COMMENTS_URL, {
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
        .catch();
    } catch {}
  }, [API_COMMENTS_URL]);

  const fetchComment = (id: number, method: HttpRequestTypes) => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Comment);
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
    if (!items || items.length === 0) {
      getUserAuth().then(() => {
        fetchComments();
      });
    }
  }, [userAuthContext, items, fetchComments, getUserAuth]);

  return (
    <div className="align-items-center justify-content-center mt-1 mb-5 clearfix">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          {/* <!-- BEGIN - ADD ITEM BUTTON  --> */}

          {!displayAddForm && userAuthContext &&
            itemDetail.ITCC_CommentID === 0 &&
            userAuth?.IsAdmin === true && (
              <div className="d-grid mt-1">
                <button
                  onClick={() => handleAddCommentClick()}
                  className="btn btn-info"
                  type="button"
                  value="Edit"
                >
                  <i className="bi bi-megaphone"></i> &nbsp;Add Comment
                </button>
              </div>
            )}

          {/* <!-- END - ADD ITEM BUTTON  --> */}

          {/* <!-- BEGIN ADD ITEM  --> */}
          {displayAddForm && userAuthContext && (
            <AddComment
              postSlug = {props.postSlug}
              onSaveAddComment={onSaveAddComment}
              onCancelAddComment={onCancelAddComment}
            ></AddComment>
          )}
          {/* <!-- END ADD ITEM  --> */}

          {/* <!-- BEGIN EDIT ITEM  --> */}
          {(editItem.edit && itemDetail.ITCC_CommentID) > 0 && userAuthContext && (
            <section className="card py-1 mt-1">
              <CommentForm
                {...itemDetail}
                title="Edit Comment"
                onChange={onChangeEditComment}
                onCancel={onCancelEditComment}
                onClick={onSaveEditComment}
                onChangeCommentHandle={onChangeCommentHandle}
              >
                <i className="bi bi-sticky"> &nbsp; </i>Save
              </CommentForm>
            </section>
          )}
          {/* <!-- END EDIT ITEM  --> */}

          {/* <!-- BEGIN ITEM DETAIL  --> */}
          {(editItem.detail && itemDetail.ITCC_CommentID) > 0 && userAuthContext && (
            <section className="card py-1 mt-1">
              <CommentDetail
                {...itemDetail}
                {...editItem}
                title="Comment Details"
                onCancel={onCancelCommentDetail}
              ></CommentDetail>
            </section>
          )}
          {/* <!-- END ITEM DETAIL --> */}

          {/* <!-- BEGIN ITEM DELETE  --> */}
          {(editItem.delete && itemDetail.ITCC_CommentID) > 0 && userAuthContext && (
            <section className="card py-1 mt-1">
              <CommentDetail
                {...itemDetail}
                {...editItem}
                title="Delete Comment"
                onCancel={onCancelCommentDetail}
                onConfirmDelete={onConfirmDelete}
              ></CommentDetail>
            </section>
          )}
          {/* <!-- END ITEM DELETE --> */}

          {/* <!-- BEGIN LIST ITEMS  --> */}

          {itemDetail.ITCC_CommentID === 0 && (
            <section className="card py-1 mt-2">
              <h3 className="card-title text-center text-dark mt-3">
                <i className="bi bi-megaphone"></i> Comments
              </h3>

              <div className="card-body">
                {items.map((item: any, index: number) => {
                  return (
                    <section key={index} className="mb-5">

                      <div className="row">

                        <div className="col-md-12">
                          <div dangerouslySetInnerHTML={{ __html: item.CommentDetail }}></div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="d-grid mt-3">
                            <button
                              onClick={() => handleCommentDetail(item)}
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
                              onClick={() => handleEditComment(item)}
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
                              onClick={() => handleDeleteComment(item)}
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
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default ListComments;
