// ListGallerys Component for fetching & listing all items

// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { AUTH_KEY } from '../../services/constants';
import { BaseUrlTypes, HttpRequestTypes, utils } from '../../services/utility';
import GalleryForm from './gallery-form';
import AddGallery from './add-gallery';
import GalleryDetail from './gallery-detail';
import { EmptyGallery } from '../../models/gallery';
import Pager from '../pager';

const editmodes = { add: false, edit: false, detail: false, delete: false };

// List Gallerys Component
const ListGallerys = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({ ...editmodes });
  const [itemDetail, setItemDetail] = useState({ ...EmptyGallery });
  //const [displayAddForm, setAddForm] = useState(false);
  const [userAuth, setUserAuth] = useState({ IsAdmin: false });
  const [pageNumber, setPageNumber] = useState(1);

  const nextPage = (event: any) => {
    event.preventDefault();
    if (items && items.length > 0) {
      const page = pageNumber + 1;
      setPageNumber(page);
      fetchGallerys(page);
    }
  };

  const prevPage = (event: any) => {
    event.preventDefault();
    if (pageNumber > 1) {
      const page = pageNumber - 1;
      setPageNumber(page);
      fetchGallerys(page);
    }
  };

  const getUserAuth = () => {
    const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
    setUserAuth({ ...userAuthResult });
    return userAuthResult;
  };

  const getGalleryDetail = (item: any) => {
    const result = fetchGallery(item.ITCC_ImageID, HttpRequestTypes.GET);
    result
      .then((response) => {
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
      .catch();
  };

  const handleAddGalleryClick = () => {
    setEditItem({ ...editmodes, add: true });
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
    result.then(() => {
      //const result = response.json();
      fetchGallerys().then();
      //return result;
    });
  };

  const onSaveAddGallery = () => {
    fetchGallerys().then();
    setEditItem({ ...editmodes, add: false });
  };

  const onCancelAddGallery = () => {
    setEditItem({ ...editmodes, add: false });
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
    try {
      const save = async function () {
        await postFormRequest();
        await fetchGallerys();
      };
      save()
        .then(() => {
          setItemDetail({ ...EmptyGallery });
          setEditItem({ ...editmodes, add: false });
        })
        .catch();
    } catch { }
  };

  const onChangeImageHandle = (event: any) => {
    const file = event.target.files[0];
    const fileSize = file.size / 1024;

    if (fileSize * 1024 > 100000) {
      return;
    }
    itemDetail.File = file;

    setItemDetail(itemDetail);
  };

  const postFormRequest = () => {
    const headers = {
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    const formData = new FormData();
    const file = itemDetail.File;
    const fileName = itemDetail.File?.name || 'image.png';

    if (file) {
      formData.append('file', file, fileName);
    }

    Object.entries(itemDetail).forEach(([key, value]) => {
      if (key !== 'File') {
        const item: any = value || '';
        formData.append(key, item);
      }
    });

    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Gallery);
    const url = API_FORM_URL + '/' + itemDetail.ITCC_ImageID;
    return fetch(url, {
      method: 'PUT',
      body: formData,
      headers: headers,
    })
      .then()
      .catch();
  };

  const fetchGallerys = useCallback(async (page = 1) => {
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Gallery, page, 1);

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
      .catch();
  }, []);

  const fetchGallery = (id: number, method: HttpRequestTypes) => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Gallery);
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
      fetchGallerys();
    }
  }, [fetchGallerys]);

  return (
    <div className="align-items-center justify-content-center mt-5 mb-5 clearfix">

      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {/* <!-- BEGIN - ADD USER BUTTON  --> */}

          {!editItem.add && itemDetail.ITCC_ImageID === 0 && (
            <div className="d-grid mt-1">
              <button
                onClick={() => handleAddGalleryClick()}
                className="btn btn-info"
                type="button"
                value="Edit"
              >
                <span className="text-dark fs-4"><i className="bi bi-camera"></i> &nbsp;Add Gallery</span>
              </button>
            </div>
          )}

          {/* <!-- END - ADD USER BUTTON  --> */}

          {/* <!-- BEGIN ADD USER  --> */}
          {editItem.add && (
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

          {!editItem.add && itemDetail.ITCC_ImageID === 0 && (
            <section className="card py-1 mt-2">

              <h3 className="card-title text-center text-dark mt-3">
                <span className="text-primary"><i className="bi bi-camera-reels"></i></span> Gallerys
              </h3>

              <div className="row">
                <div className="col-md-12">
                  <Pager
                    pageNumber={pageNumber}
                    items={items}
                    nextPage={nextPage}
                    prevPage={prevPage}
                  ></Pager>
                </div></div>

              <div className="card-body">
                {items.map((item: any, index: number) => {
                  return (
                    <section key={index}>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="text-dark">{item.Name}</div>
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

                      <div className="row">
                        <div className="col-md-12">
                          <a
                            href={item.FilePath}
                            className="text-primary"
                            rel="noreferrer"
                            target="_blank"
                          >
                            {item.FilePath}
                          </a>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          {item.PublishUrl && (
                            <div className="mx-auto">
                              <img
                                alt={item.Name}
                                className="img-fluid rounded mx-auto d-block"
                                src={
                                  utils.getBaseApi(BaseUrlTypes.Image) +
                                  item.PublishUrl
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>


                      <div className="row">

                        <div className="col-4">
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
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="d-grid mt-3">
                            <button
                              onClick={() => handleEditGallery(item)}
                              disabled={!userAuth.IsAdmin}
                              className="btn btn-outline-warning btn-sm"
                              type="button"
                              value="Edit"
                            >
                              <i className="bi bi-pencil-square"></i> &nbsp;
                            </button>
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="d-grid mt-3">
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

                      </div>

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

export default ListGallerys;
