// ListBlogs Component for fetching & listing all items

// Import Modules
import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import { AUTH_KEY } from '../../services/constants';
import { BaseUrlTypes, utils } from '../../services/utility';
import Pager from '../pager';

// Blogs Home Component
const BlogsHome = (props: any) => {
  const [items, setItems] = useState(props.data);
  const [pageNumber, setPageNumber] = useState(1);

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

  const fetchBlogs = useCallback(async (page: number) => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Home, page, 1);
    const headers = {
      'Content-Type': 'application/json',
      ...utils.getUserAuthHeader(AUTH_KEY),
    };

    try {
      return fetch(API_FORM_URL, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          const result = response.json();
          if (result) {
            result.then((result: any) => {
              setItems(result && result.length > 0 ? result : []);
            });
          }
        })
        .catch();
    } catch { }
  }, []);

  return (
    <div className="align-items-center justify-content-center mt-3 mb-3 clearfix">
      <Pager
        pageNumber={pageNumber}
        items={items}
        nextPage={nextPage}
        prevPage={prevPage}
      ></Pager>
      <div className="row mt-2">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {/* <!-- BEGIN LIST USERS  --> */}
          <section className="card py-1 mt-2">
            <h1 className="card-title text-center text-dark mt-3">
              <i className="bi bi-house"></i> {props.title}
            </h1>

            <div className="card-body">
              {(items && items.length > 0) && items.map((item: any, index: number) => {
                return (
                  <section key={index}>

                    <div className="row">
                      <div className="col-md-12">
                        <Link href={'/' + item.Slug}>
                          <h2 className="text-center">{item.Name}</h2>
                        </Link>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.Description,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="d-flex justify-content-start mt-4 mb-3"><span className="badge rounded bg-secondary text-lowercase">{item.Category}</span></div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-end mt-3 mb-3"><span className="badge rounded bg-secondary text-lowercase">{item.BlogType}</span></div>
                      </div>
                    </div>

                    <div className="row"><div className="col-md-12"><hr className="pt-1 bg-info" />
                    </div>
                    </div>

                  </section>
                );
              })}
            </div>

          </section>

          {/* <!-- END LIST USERS  --> */}
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="container mt-3">
        <Pager
          pageNumber={pageNumber}
          items={items}
          nextPage={nextPage}
          prevPage={prevPage}
        ></Pager>
      </div>
    </div>
  );
};

export default BlogsHome;
