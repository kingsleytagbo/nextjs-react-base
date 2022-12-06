import React from 'react';

const GalleryForm = (props: any) => {
  return (
    <>
      <section className="py-1 mt-1" key="user-form">
        {/* <!-- BEGIN FORM  -->} */}

        <section className="card">
          <h3 className="card-title text-center text-dark mt-3">
            <i className="bi bi-person"></i> {props.title}
          </h3>

          <form className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="username">UserName</label>
                <input
                  value={props.UserName}
                  onChange={props.onChange}
                  className="form-control"
                  id="UserName"
                  name="UserName"
                  placeholder="Your username ..."
                  type="text"
                  autoComplete="false"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="password"> Password</label>
                <input
                  value={props.Password}
                  onChange={props.onChange}
                  className="form-control"
                  id="Password"
                  name="Password"
                  placeholder="Your password ..."
                  type="password"
                  autoComplete="false"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="password"> Email</label>
                <input
                  value={props.EmailAddress}
                  onChange={props.onChange}
                  className="form-control"
                  id="EmailAddress"
                  name="EmailAddress"
                  placeholder="Your email address ..."
                  type="text"
                  autoComplete="false"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="username">FirstName</label>
                <input
                  value={props.FirstName}
                  onChange={props.onChange}
                  className="form-control"
                  id="FirstName"
                  name="FirstName"
                  placeholder="Your firstname ..."
                  type="text"
                  autoComplete="false"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="password"> LastName</label>
                <input
                  value={props.LastName}
                  onChange={props.onChange}
                  className="form-control"
                  id="LastName"
                  name="LastName"
                  placeholder="Your last name ..."
                  type="text"
                  autoComplete="false"
                />
              </div>
            </div>

            
            <div className="row">
              <div className="form-group col-12">
                <label>Choose an Image:</label>
                <input onChange={props.onChangeImageHandle} type="file" className="form-control input-md" id="ImageUpload" name="ImageUpload" />
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
                    <i className="bi bi-user"></i> &nbsp;{props.children}
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

export default GalleryForm;
