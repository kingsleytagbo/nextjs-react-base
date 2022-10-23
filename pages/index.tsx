import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LoginForm from '../components/authentication/login-form';

const Home: NextPage = () => {
  return (
    <main className="container-fluid px-3 px-lg-4">
      <Head>
        <title>{process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_NAME}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-12 col-lg-12 col-xl-10">

            <div>
              <section className="card-body">
                <LoginForm></LoginForm>
              </section>
            </div>

          </div></div>
      </section>

      <footer>
      </footer>

    </main>
  )
}

export default Home
