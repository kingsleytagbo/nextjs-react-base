import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LoginForm from '../components/authentication/login-form';

const Home: NextPage = () => {
  return (
    <main className="container-fluid mt-0 clearfix">
      <Head>
        <title>{process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_NAME}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <div className="row">
          <div className="col-md-12">

              <section>
                <LoginForm></LoginForm>
              </section>

          </div></div>
      </section>

      <footer>
      </footer>

    </main>
  )
}

export default Home