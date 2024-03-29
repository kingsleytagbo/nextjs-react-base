import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import '../styles/custom.css';
import type { AppProps } from 'next/app';
import {AuthContext} from '../context/auth-context';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [userAuth, setUserAuth] = useState({ IsAdmin: false });
  const [userAuthContext, setUserAuthContext] = useState(false);
  
  return (
    <AuthContext.Provider value= {{  userAuth, setUserAuth, userAuthContext, setUserAuthContext }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
