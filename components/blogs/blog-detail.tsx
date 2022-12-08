// BlogDetail Component for changing a user's details

// Import Modules
import React, { useState } from 'react';

// BlogDetail Component
const BlogDetail = (props: any) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    props.onConfirmDelete(props.ITCC_UserID);
  };
  // Return Blog form
  return (
    <>
      <section className="card py-2 mt-2 p-2">
        <h3 className="card-title text-center text-dark mt-3">
          <i className="bi bi-person"></i> {props.title}
        </h3>
        <div className="row">
          <div className="col-md-6">
            <label>Name</label>
            <p className="text-dark">{props.Name}</p>
          </div>

          <div className="col-md-6">
            <label>Description</label>
            <p className="text-dark">{props.Description}</p>
          </div>
        </div>

        <div className="row">
        <div className="col-md-6">
            <label>FileGroup</label>
            <p className="text-dark">{props.FileGroup}</p>
          </div>
          <div className="col-md-4">
            <label htmlFor="username">FilePath</label>
            <p className="text-dark">{props.FilePath}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
          <label>Image</label>
            <img 
            alt="Image" src={props.Password} className="img-fluid" />
          </div>
        </div>

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

export default BlogDetail;
