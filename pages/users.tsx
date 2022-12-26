import type { NextPage } from 'next';
import { useEffect } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Meta from '../components/metatags';
import ListUsers from '../components/users/list-users';
import { AuthGuard } from '../services/authGuard';

const UsersPage: NextPage = () => {
  useEffect(() => {
    AuthGuard();
  }, []);

  return (
    <main className="bg-light">
      <Meta
        description={'Manage Users Page'}
        title={'Users'}
        canonical={process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL + '/users'}
      />
      <Header></Header>

      <section className="container-fluid bg-secondary">
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

export default UsersPage;
