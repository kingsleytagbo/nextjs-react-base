import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '../loading';

export default function LoginForm(props: any) {
  const router = useRouter();
  const [data, setItems] = useState(props);

  const [form, setFormValue] = useState({ name: '', password: '' });
  const [isValid, setValidation] = useState(false);
  const [showForm, displayForm] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const Post: any = {};

  const formState: any = Object.assign({}, form);
  const API_FORM_URL = process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL_API + '/login/authenticate/' + process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE;

  const validate = () => {
    let valid = true;
    const values = Object.keys(formState).map(function (item, i) {
      return item;
    });

    if (values && values.length > 0) {
      for (let i = 0; i < values.length; i++) {
        const key: any = values[i];
        const value = formState[key];
        if ((key === 'name' && value.length < 3) || (key === 'password' && value.length < 5)) {
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

    formState[key] = value;
    setFormValue(formState);
    validate();
  }

  const click = (event: any) => {
    setLoading(true);
    const result = postFormJsonData(formState);
    processApiData(result);
    setLoading(false);
  }

  const postFormJsonData = (data: any) => {
    const header = {
      'Authorization': 'Basic ' + btoa(data.name + ':' + data.password),
      'Content-Type': 'application/json'
    };

    return fetch(API_FORM_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: header
    }).then(response => response.json());
  }

  const processApiData = (result: (Promise<any> | undefined)) => {
    if (result) {
      result.then(
        (result: any) => {
          const authId = result.AuthID;
          const roleNames = result.RoleNames;
          if (authId && roleNames) {
            displayForm(false);
          }
          else {
            displayForm(true);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: any) => {
          console.log(error)
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
                    <h3 className='card-title text-center text-success mt-3'>You are logged-in ...</h3>
                    <div className="d-flex justify-content-center" >
                      <section id="loading">
                        <Loading isLoading={isLoading} />
                      </section>
                    </div>
                  </>
                }
 
              <form className="card-body" method="post" style={{ display: showForm ? 'block' : 'none' }}>
                <div className="mt-3">
                  <input
                    value={form.name}
                    onChange={onChange}
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your username ..."
                    type="text"
                    autoComplete="false"
                  />
                </div>
                <div className="mt-3">
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
                    onClick={click}
                    className="btn btn-primary btn-lg" type="button" value="Send Now">
                    LOG-IN
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

