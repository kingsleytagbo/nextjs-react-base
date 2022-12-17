// ListComments Component for fetching & listing all items

// Import Modules
import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import { AUTH_KEY } from '../../services/constants';
import { BaseUrlTypes, utils } from '../../services/utility';
import Pager from '../pager';

// Comments Home Component
const CommentsHome = (props: any) => {
  const [items, setItems] = useState(props.data);
  const [pageNumber, setPageNumber] = useState(1);

  const nextPage = (event: any) => {
    event.preventDefault();
    if (items && items.length > 0) {
      const page = pageNumber + 1;
      setPageNumber(page);
      fetchComments(page);
    }
  };

  const prevPage = (event: any) => {
    event.preventDefault();
    if (pageNumber > 1) {
      const page = pageNumber - 1;
      setPageNumber(page);
      fetchComments(page);
    }
  };

  const fetchComments = useCallback(async (page: number) => {
    const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Comment, page, 1);
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


  useEffect(() => {
    console.log({comments: items})
  }, [items]);
  

  return (
    <div className="align-items-center justify-content-center mt-0 mb-5 clearfix">
        
      <div className="row">
        <div className="col-md-1"></div>

        <div className="col-md-9">
          {/* <!-- BEGIN LIST COMMENTS  --> */}
          <section className="comment py-1 mt-0">
            <h3 className="comment-title text-center text-dark mt-0">
              <i className="bi bi-people"></i> {props.title}
            </h3>

            <div className="comemnt-body">
              {items && items.length > 0 && items.map((item: any, index: number) => {
                return (
                  <section key={index}>

                    <div className="row">
                      <div className="col-md-12">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.CommentDetail,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="row"><div className="col-md-12"><hr className="bg-secondary" />
                    </div>

                    </div>

                  </section>
                );
              })}
            </div>

          </section>

          {/* <!-- END LIST USERS  --> */}
        </div>

        <div className="col-md-1"></div>
      </div>
   
    </div>
  );
};

export default CommentsHome;
