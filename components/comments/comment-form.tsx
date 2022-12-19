import React from 'react';

const CommentForm = (props: any) => {
  const handleTextAreaAutogrow = (e: any) => {
    // Reset field height
    e.target.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
  };

  return (
    <>
      <section className="py-1 mt-1" key="user-form">
        {/* <!-- BEGIN FORM  -->} */}

        <section className="comment-card">
          <h3 className="comment-card-title text-center text-dark mt-3">
            <i className="bi bi-megaphone"></i> {props.title}
          </h3>

          <form className="comment-card-body">

            <div className="row">
              <div className="col-md-12">
                <label htmlFor="Description"> Comment</label>
                <textarea
                  onKeyUp={handleTextAreaAutogrow}
                  rows={3}
                  value={props.CommentDetail || ''}
                  onChange={props.onChange}
                  className="form-control"
                  id="CommentDetail"
                  name="CommentDetail"
                  placeholder="Comment ..."
                  autoComplete="false"
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <label htmlFor="Name">Comment Title</label>
                <input
                  value={props.CommentTitle || ''}
                  onChange={props.onChange}
                  className="form-control"
                  id="CommentTitle"
                  name="CommentTitle"
                  placeholder="Comment Title ..."
                  type="text"
                  autoComplete="false"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <label htmlFor="Name">Full Name</label>
                <input
                  value={props.CommentFullName || ''}
                  onChange={props.onChange}
                  className="form-control"
                  id="CommentFullName"
                  name="CommentFullName"
                  placeholder="Full Name ..."
                  type="text"
                  autoComplete="false"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="d-grid mt-2">
                  <button
                    onClick={props.onClick}
                    className="btn btn-primary btn-block"
                    type="button"
                    value="Create"
                  >
                    <i className="bi bi-megaphone"></i> &nbsp;{props.children}
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="d-grid mt-2">
                  <button
                    onClick={props.onCancel}
                    className="btn btn-secondary btn-block"
                    type="button"
                    value="Cancel"
                  >
                    <i className="bi bi-x-octagon"></i> &nbsp;Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* <!-- END FORM  -->} */}
      </section>
    </>
  );
};

export default CommentForm;
