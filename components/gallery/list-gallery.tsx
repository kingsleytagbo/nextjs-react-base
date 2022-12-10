// ListGallerys Component for fetching & listing all items

// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { AUTH_KEY } from '../../services/constants';
import { BaseUrlTypes, HttpRequestTypes, utils } from '../../services/utility';
import GalleryForm from './gallery-form';
import AddGallery from './add-gallery';
import GalleryDetail from './gallery-detail';
import { EmptyGallery } from '../../models/gallery';

const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Gallery, 1);
const editmodes = { edit: false, detail: false, delete: false };

// List Gallerys Component
const ListGallerys = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({ ...editmodes });
  const [itemDetail, setItemDetail] = useState({ ...EmptyGallery });
  const [displayAddForm, setAddForm] = useState(false);
  const [userAuth, setUserAuth] = useState({ IsAdmin: false });

  const getUserAuth = () => {
    const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
    setUserAuth({ ...userAuthResult });
    return userAuthResult;
  };

  const getGalleryDetail = (item: any) => {
    const result = fetchGallery(item.ITCC_ImageID, HttpRequestTypes.GET);
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
    })
    .catch(error => {
      console.log({catch: error});
    });
  };

  const handleAddGalleryClick = () => {
    setAddForm(true);
  };

  const handleEditGallery = (item: any) => {
    setEditItem({ ...editmodes, edit: true });
    getGalleryDetail(item);
  };

  const handleDeleteGallery = (item: any) => {
    setEditItem({ ...editmodes, delete: true });
    getGalleryDetail(item);
  };

  const handleGalleryDetail = (item: any) => {
    setEditItem({ ...editmodes, detail: true });
    getGalleryDetail(item);
  };

  const onCancelGalleryDetail = () => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyGallery });
  };
  const onConfirmDelete = (value: any) => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyGallery });
    const result = fetchGallery(value, HttpRequestTypes.DELETE);
    result.then((response) => {
      const result = response.json();
      fetchGallerys().then();
      return result;
    });
  };

  const onSaveAddGallery = () => {
    fetchGallerys().then();
    setAddForm(false);
  };

  const onCancelAddGallery = () => {
    setAddForm(false);
  };

  const onChangeEditGallery = (e: any) => {
    const key: any = e.target.name;
    const value: any = e.target.value;
    const formState: any = { ...itemDetail, [key]: value };

    setItemDetail(formState);
  };

  const onCancelEditGallery = () => {
    setEditItem({ ...editmodes });
    setItemDetail({ ...EmptyGallery });
  };

  const onSaveEditGallery = () => {
    postFormRequest(itemDetail);
    fetchGallerys().then();
    setItemDetail({ ...EmptyGallery });
    setAddForm(false);
  };

  const onChangeImageHandle = (event: any) => {
    const file = event.target.files[0];
    const fileName = file.name || 'image.png';
    const fileSize = file.size / 1024;

    if ((fileSize * 1024) > 100000) {
      return;
    }
    const formData = new FormData();

    formData.append('file', file, fileName);
    Object.entries(itemDetail).forEach(([key, value]) => {
      const item: any = value || '';
      formData.append(key, item);
    });

    //console.log({formData: Array.from(formData.entries()), file: file, filename: fileName, fileSize: fileSize})
  }

  const postFormRequest = (formData: any) => {
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    const url = API_FORM_URL + '/' + formData.ITCC_ImageID;
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: headers,
    }).then((response) => response.json());
  };

  const fetchGallerys = useCallback(async () => {
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    fetch(API_FORM_URL, {
      method: 'GET',
      headers: headers
    }).then((response) => {
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
    .catch(error => {
      console.log({catch: error});
    });
  }, []);

  const fetchGallery = (id: number, method: HttpRequestTypes) => {
    const url = API_FORM_URL + '/' + id;
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    return fetch(url, {
      method: method,
      headers: headers
    });
  };

  useEffect(() => {
    const result = getUserAuth();
    if (result.IsAdmin) { fetchGallerys(); }
  }, [fetchGallerys]);

  return (
    <div className="align-items-center justify-content-center mt-5 mb-5 clearfix">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {/* <!-- BEGIN - ADD USER BUTTON  --> */}

          {!displayAddForm && itemDetail.ITCC_ImageID === 0 && (
            <div className="d-grid mt-1">
              <button
                onClick={() => handleAddGalleryClick()}
                className="btn btn-info"
                type="button"
                value="Edit"
              >
                <i className="bi bi-person-plus"></i> &nbsp;Add Gallery
              </button>
            </div>
          )}

          {/* <!-- END - ADD USER BUTTON  --> */}

          {/* <!-- BEGIN ADD USER  --> */}
          {displayAddForm && (
            <AddGallery
              onSaveAddGallery={onSaveAddGallery}
              onCancelAddGallery={onCancelAddGallery}
            ></AddGallery>
          )}
          {/* <!-- END ADD USER  --> */}

          {/* <!-- BEGIN EDIT USER  --> */}
          {(editItem.edit && itemDetail.ITCC_ImageID) > 0 && (
            <section className="card py-1 mt-1">
              <GalleryForm
                {...itemDetail}
                title="Edit Gallery"
                onChange={onChangeEditGallery}
                onCancel={onCancelEditGallery}
                onClick={onSaveEditGallery}
                onChangeImageHandle={onChangeImageHandle}
              >
                <i className="bi bi-sticky"> &nbsp; </i>Save
              </GalleryForm>
            </section>
          )}
          {/* <!-- END EDIT USER  --> */}

          {/* <!-- BEGIN USER DETAIL  --> */}
          {(editItem.detail && itemDetail.ITCC_ImageID) > 0 && (
            <section className="card py-1 mt-1">
              <GalleryDetail
                {...itemDetail}
                {...editItem}
                title="Gallery Details"
                onCancel={onCancelGalleryDetail}
              ></GalleryDetail>
            </section>
          )}
          {/* <!-- END USER DETAIL --> */}

          {/* <!-- BEGIN USER DETAIL  --> */}
          {(editItem.delete && itemDetail.ITCC_ImageID) > 0 && (
            <section className="card py-1 mt-1">
              <GalleryDetail
                {...itemDetail}
                {...editItem}
                title="Delete Gallery"
                onCancel={onCancelGalleryDetail}
                onConfirmDelete={onConfirmDelete}
              ></GalleryDetail>
            </section>
          )}
          {/* <!-- END USER DETAIL --> */}

          {/* <!-- BEGIN LIST USERS  --> */}

          {itemDetail.ITCC_ImageID === 0 && (
            <section className="card py-1 mt-2">
              <h3 className="card-title text-center text-dark mt-3">
                <i className="bi bi-people"></i> Gallerys
              </h3>

              <div className="card-body">
                {items.map((item: any, index: number) => {
                  return (
                    <section key={index}>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="d-grid mt-3">
                            <button
                              onClick={() => handleGalleryDetail(item)}
                              className="btn btn-outline-dark btn-sm"
                              type="button"
                              value="Detail"
                            >
                              <i className="bi bi bi-ticket-detailed"></i>{' '}
                              &nbsp;
                            </button>
                            <button
                              onClick={() => handleEditGallery(item)}
                              disabled={!userAuth.IsAdmin}
                              className="btn btn-outline-warning btn-sm"
                              type="button"
                              value="Edit"
                            >
                              <i className="bi bi-pencil-square"></i> &nbsp;
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(item)}
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
                          {item.FilePath && <div>
                            <img alt="image" className="img-fluid" src={item.FilePath} />
                          </div>
                          }
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <a
                            href={item.PublishUrl}
                            className="text-primary"
                            rel="noreferrer"
                            target="_blank"
                          >
                            {item.PublishUrl}
                          </a>
                          <p className="text-dark">{item.Description}</p>
                        </div>
                      </div>
                      <hr className="pt-1 bg-info" />
                    </section>
                  )
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

export default ListGallerys;
