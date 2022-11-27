import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import ListUsers from '../components/users/list-users';
//import { AuthGuard } from '../services/authGuard';

const Users: NextPage = () => {
  useEffect(() => {
    //AuthGuard();
  }, []);

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
            <section>
              <ListUsers></ListUsers>
            </section>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </main>
  );
};

export default Users;
