import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react';
import { BaseUrlTypes, utils } from '../../services/utility';
import Loading from '../loading';

const AUTH_KEY =  '/login/authenticate/';
const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Authenticate) + '/' + process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE;


export default function LoginForm(props: any) {

  const [form, setFormValue] = useState({ username: '', password: '' });
  const [isValid, setValidation] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showForm, displayForm] = useState(true);

  const getUserLoggedInStatus = useCallback(async () => {
    const loggedIn = utils.isUserLoggedIn(AUTH_KEY);
    displayForm(!loggedIn);
  }, []);


  useEffect(() => {
    getUserLoggedInStatus();
  }, [getUserLoggedInStatus]);

  const validate = () => {
    let valid = true;
    const values = Object.keys(form).map(function (item, i) {
      return item;
    });

    if (values && values.length > 0) {
      for (let i = 0; i < values.length; i++) {
        const key: any = values[i];
        const value = form[key as keyof typeof form];

        if ((key === 'username' && value.length < 3) || (key === 'password' && value.length < 5)) {
          valid = false;
          break;
        }
        else if (!value || value.length === 0) {
          valid = false;
          break;
        }
      }
    }
    else {
      valid = false;
    }
    setValidation(valid);
  }

  const onChange = (e: any) => {
    const key: string = e.target.name;
    const value: string = e.target.value;

    form[key as keyof typeof form] = value;
    const formState: any = Object.assign({}, form);
    setFormValue(formState);

    validate();
  }

  const onClick = (event: any) => {
    setLoading(true);

    const result = postFormRequest(form);
    processApiResponse(result);
    setLoading(false);
  }

  const onClickLogout = (event: any) => {
    utils.saveData(null, AUTH_KEY);
    getUserLoggedInStatus();
  }

  const postFormRequest = (formData: any) => {
    const headers = {
      'Authorization': 'Basic ' + btoa(formData.username + ':' + formData.password),
      'Content-Type': 'application/json'
    };

    return fetch(API_FORM_URL, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: headers
    }).then(response => response.json());
  }

  const processApiResponse = (result: (Promise<any> | undefined)) => {
    if (result) {
      result.then(
        (result: any) => {
          const authId = result.AuthID;
          const roleNames = result.RoleNames;
          if (authId && roleNames) {
            utils.saveData(result, AUTH_KEY);
            displayForm(false);
          }
          else {
            displayForm(true);
          }
        },
        (error: any) => {
         // console.log(error)
        }
      )
    }
  }

  return (
    <>

      <section className="py-5 mt-5" key="login">


        {/* <!-- BEGIN CONTAINER  -->} */}
        <div className="container align-items-center justify-content-center">

          {/* <!-- BEGIN FORM  -->} */}

          <div className="row">
            <div className="col-md-3"></div>

            <div className="col-md-6">

              <section className="card">

                {(showForm === true) &&
                  <h3 className='card-title text-center text-dark mt-3'>Login to your account ...</h3>
                }
                {(showForm === false) &&
                  <>
                    <h3 className='card-title text-center text-success mt-5 mb-5'>You are logged-in ...</h3>

                    <div className="row"><div className="col-12">
                      <div className="d-grid mt-3 p-5">
                        <button
                          onClick={onClickLogout}
                          className="btn btn-warning btn-lg" type="button" value="Logout">
                          <i className="bi bi-unlock"></i>&nbsp;Logout
                        </button>
                      </div>
                    </div></div>

                    <div className="d-flex justify-content-center" >
                      <section id="loading">
                        <Loading isLoading={isLoading} />
                      </section>
                    </div>
                  </>
                }

                <form className="card-body" method="post" style={{ display: showForm ? 'block' : 'none' }}>
                  <div className="mt-3">
                    <label htmlFor="username">Username</label>
                    <input
                      value={form.username}
                      onChange={onChange}
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
                      value={form.password}
                      onChange={onChange}
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
                      disabled={!isValid}
                      onClick={onClick}
                      className="btn btn-primary btn-lg" type="button" value="Send Now">
                      <i className="bi bi-lock"></i> &nbsp; Login
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
  )
}

