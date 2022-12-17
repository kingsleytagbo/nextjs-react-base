// CommentDetail Component for changing a user's details

// Import Modules
import React, { useState } from 'react';

// CommentDetail Component
const CommentDetail = (props: any) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    props.onConfirmDelete(props.ITCC_CommentID);
  };
  // Return Comment form
  return (
    <>
      <section className="card py-2 mt-2 p-2">
        <h3 className="card-title text-center text-dark mt-3">
          <i className="bi bi-person"></i> {props.title}
        </h3>
        <div className="row">
          <div className="col-md-12">
            <label>Name</label>
            <p className="text-dark">{props.Name}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Category</label>
            <p className="text-dark">{props.Category}</p>
          </div>
          <div className="col-md-4">
            <label>CommentType</label>
            <p className="text-dark">{props.CommentType}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label>Description</label>
            <div dangerouslySetInnerHTML={{ __html: props.Description }}></div>
          </div>
        </div>

        {props.Tags && (
          <div className="row">
            <div className="col-md-12">
              <label>Tags</label>
              <p className="text-dark">{props.Tags}</p>
            </div>
          </div>
        )}

        {props.ImageUrl && (
          <div className="row">
            <div className="col-12">
              <img alt="Image" src={props.ImageUrl} className="img-fluid" />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <hr className="pt-1 bg-info" />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="d-grid mt-2">
              <button
                onClick={props.onCancel}
                type="button"
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="d-grid mt-2">
              {props.delete && !confirmDelete && (
                <button
                  onClick={handleDelete}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
              {confirmDelete && (
                <button
                  onClick={handleConfirmDelete}
                  type="button"
                  className="btn btn-danger"
                >
                  Confirm Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommentDetail;
