import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../components/authentication/login-form';
import Footer from '../components/footer';
import Header from '../components/header';

const Home: NextPage = () => {
  return (
    <main className="bg-light">
      <Head>
        <title>{process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_NAME}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_DESCRIPTION}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>

      <section className="container-fluid bg-secondary vh-100">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center text-light mt-2">Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <section>
              <LoginForm></LoginForm>
            </section>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </main>
  );
};

export default Home;
