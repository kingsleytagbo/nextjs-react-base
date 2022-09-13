import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from './loading';

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
        //console.log({key: key, value: value});
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
    //console.log({ e: e, form: form, copy: formState, isvalid: isValid });
  }

  const click = (event: any) => {
    //setLoading(true);
    displayForm(false);
    const result = postFormJsonData(formState);
    processApiData(result);
    //console.log(formState);
  }

  const postFormJsonData = (data: any) => {
    const header =  {'Authorization': 'Basic ' + btoa(data.name + ':' + data.password),
    'Content-Type': 'application/json'};
    // console.log({header: header, data: data});
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
          //const store: CacheStore = { key: String(process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE), authentication: result };
          //CacheSave(store);
          const authId = result.AuthID;
          const roleNames = result.RoleNames;
          console.log({result: result, authId: authId, roleNames: roleNames});
          if (authId && roleNames) {
            displayForm(false);
            setLoading(false);
            // router.replace("/");
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


      <section className="" key="login">


        {/* <!-- BEGIN CONTAINER  -->} */}
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">

              {/* <!-- BEGIN FORM  -->} */}
              <div className="fill-form form-box">
                <div className="row g-0">
                  <div className="col-12">
                  </div>
                  <div className="col-12 form-box__content">
                    <div id="box-title">
                      {(showForm === true) &&
                        <h3 className="main-form-text">Login to your account ...</h3>
                      }
                      {(showForm === false) &&
                        <section>
                          <section>
                            <h3 className="main-form-text">Wait, You are being Logged into to your Account ...</h3>
                            <div className="d-flex justify-content-center" >
                              <div style={{ width: '3rem', height: '3rem' }} className="spinner-border text-primary" role="status">
                                <span className="sr-only">One moment ...</span>
                              </div>
                            </div>
                          </section>
                        </section>
                      }
                    </div>
                    <form method="post" style={{ display: showForm ? 'block' : 'none' }}>
                      <div className="mt-3">
                        <input
                          value={form.name}
                          onChange={onChange}
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Your account ..."
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
                      <div className="d-grid mt-4">
                        <button
                          disabled={!isValid}
                          onClick={click}
                          className="btn btn-primary btn-lg" type="button" value="Send Now">
                          LOG-IN
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- END FORM  -->} */}


            </div>
          </div>
        </div>
        {/* <!-- END CONTAINER  -->} */}

        {/* <!-- End Main Content--> */}
      </section>

    </>
  )
}

//export default LoginForm;

