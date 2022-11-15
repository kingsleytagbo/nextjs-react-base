import type { NextPage } from 'next';
import Head from 'next/head';
import AddUser from '../components/users/add-user';
import ListUsers from '../components/users/list-users';

const Users: NextPage = () => {
  
  const handleUserAdded = () => {
    console.log("new User Added");
};
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
                <AddUser handleUserAdded={handleUserAdded}></AddUser>
                <ListUsers></ListUsers>
              </section>

          </div></div>
      </section>

      <footer>
      </footer>

    </main>
  )
}

export default Users;
