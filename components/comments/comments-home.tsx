// ListComments Component for fetching & listing all items

// Import Modules
import React from 'react';

// Comments Home Component
const CommentsHome = (props: any) => {
  const items = props.data;

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
