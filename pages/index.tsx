import type { NextPage } from 'next';
import BlogsHome from '../components/blogs/blogs-home';
import Footer from '../components/footer';
import Header from '../components/header';
import Meta from '../components/metatags';

const Home: NextPage = () => {
  return (
    <main className="container-fluid bg-light">
      <Meta
        description={'Home'}
        title={'Home'}
        canonical={process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL + '/'}
      />
      <Header></Header>

      <section className="bg-secondary mb-5">
        <div className="row">
          <div className="col-md-12">
            <section>
              <BlogsHome title="Home"></BlogsHome>
            </section>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </main>
  );
};

export default Home;
