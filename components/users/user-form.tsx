import React from "react";

const UserForm = (props: any) => {


  return (

    <>

      <section className="py-5 mt-5" key="user-form">


        {/* <!-- BEGIN CONTAINER  -->} */}
        <div className="container align-items-center justify-content-center">

          {/* <!-- BEGIN FORM  -->} */}

          <div className="row">
            <div className="col-md-3"></div>

            <div className="col-md-6">

              <section className="card">

              <h3 className='card-title text-center text-dark mt-3'>{props.title}</h3>

                <form className="card-body">
                  <div className="mt-3">
                    <label htmlFor="username">Username</label>
                    <input
                      value={props.username}
                      onChange={props.onChange}
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Your username ..."
                      type="text"
                      autoComplete="false"
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="password"> Password</label>
                    <input
                      value={props.password}
                      onChange={props.onChange}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Your password ..."
                      type="password"
                      autoComplete="false"
                    />
                  </div>

                  <div className="d-grid mt-3">
                    <button
                     onClick={props.onClick}
                      className="btn btn-primary btn-lg" type="button" value="Create">
                      <i className="bi bi-user"></i> &nbsp;{props.children}
                    </button>
                  </div>
                </form>
              </section>

            </div>

            <div className="col-md-3"></div>
          </div>

          {/* <!-- END FORM  -->} */}

        </div>
        {/* <!-- END CONTAINER  -->} */}


      </section>

    </>

  );
};

export default UserForm;