import Head from "next/head";
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
// customize global css file (from nextjs) here
import '../styles/globals.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}


export default MyApp
