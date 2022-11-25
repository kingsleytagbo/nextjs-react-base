import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import '../styles/custom.css';

import Head from "next/head";
import type { AppProps } from 'next/app'
import Footer from '../components/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="container-fluid bg-secondary vh-100">
        <Component {...pageProps} />
        <Footer></Footer>
      </section>
    </>
  );
}


export default MyApp
