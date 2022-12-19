// CreateComment Component for adding new users

// Import Modules
import React, { useState } from 'react';
import CommentForm from './comment-form';
import { EmptyComment } from '../../models/comment';
import { BaseUrlTypes, utils } from '../../services/utility';
import { AUTH_KEY } from '../../services/constants';

// CreateComment Component
const AddComment = (props: any) => {
  const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Comment);
  const postID  = props.postSlug;
  
  const [editItem, setEditItem] = useState({ ...EmptyComment, ITCC_PostID: postID, ReplyPostID
: postID  });

  const onChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    const formState = { ...editItem, [key]: value };
    setEditItem(formState);
  };

  const onSave = () => {
    postFormRequest(editItem)
      .then(() => {
        props.onSaveAddComment();
      })
      .catch();
  };

  const onCancel = () => {
    setEditItem({ ...EmptyComment });
    props.onCancelAddComment();
  };

  const postFormRequest = (formData: any) => {
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    return fetch(API_FORM_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: headers,
    })
      .then()
      .catch();
  };

  // Return Comment form
  return (
    <section>
      <CommentForm
        {...editItem}
        title="Create A New Comment"
        onClick={onSave}
        onChange={onChange}
        onCancel={onCancel}
      >
        <i className="bi bi-sticky"></i>&nbsp;Save
      </CommentForm>
    </section>
  );
};

export default AddComment;
