// GalleryDetail Component for changing a user's details

// Import Modules
import React, { useState } from 'react';
import { BaseUrlTypes, utils } from '../../services/utility';

// GalleryDetail Component
const GalleryDetail = (props: any) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    props.onConfirmDelete(props.ITCC_ImageID);
  };

  // Return Gallery form
  return (
    <>
      <section className="card py-2 mt-2 p-2">
        <h3 className="card-title text-center text-dark mt-3">
        <span className="text-dark"><i className="bi bi-camera"></i></span> {props.title}
        </h3>

        <div className="row">
          <div className="col-md-12">
            <label>Name</label>
            <p className="text-dark">{props.Name}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label>Description</label>
            <div className="mb-2" dangerouslySetInnerHTML={{ __html: props.Description }}></div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>FilePath</label>
            <p className="text-dark">{props.FilePath}</p>
          </div>
          <div className="col-md-6">
            <label>FileGroup</label>
            <p className="text-dark">{props.FileGroup}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label>PublishUrl</label>
            <p className="text-dark">{props.PublishUrl}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label>Image</label>
            <div>                          {props.PublishUrl && (
              <div className="mx-auto">
                <img
                  alt={props.Name}
                  className="img-fluid rounded mx-auto d-block"
                  src={
                    utils.getBaseApi(BaseUrlTypes.Image) +
                    props.PublishUrl
                  }
                />
              </div>
            )}</div>
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

export default GalleryDetail;
