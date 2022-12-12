// ListBlogs Component for fetching & listing all items

// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { AUTH_KEY } from '../../services/constants';
import { BaseUrlTypes, utils } from '../../services/utility';

// Blogs Home Component
const BlogsHome = (props: any) => {
  const [items, setItems] = useState([]);

  const fetchBlogs = useCallback(async () => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Blog, 1,1);
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
            result.then((result: any) => {
              setItems(result && result.length > 0 ? result : []);
            });
          }
        })
        .catch();
    } catch { }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="align-items-center justify-content-center mt-5 mb-5 clearfix">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          {/* <!-- BEGIN LIST USERS  --> */}
          <section className="card py-1 mt-2">
            <h3 className="card-title text-center text-dark mt-3">
              <i className="bi bi-people"></i> {props.title}
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
                        <p className="text-dark">{item.Category}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="text-dark">{item.BlogType}</p>
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
                    <hr className="pt-1 bg-info" />
                  </section>
                );
              })}
            </div>
          </section>

          {/* <!-- END LIST USERS  --> */}
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default BlogsHome;
