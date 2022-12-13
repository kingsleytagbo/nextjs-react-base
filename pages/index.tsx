import type { NextPage } from 'next';
import { APP_CLIENT_INTERNALS } from 'next/dist/shared/lib/constants';
import BlogsHome from '../components/blogs/blogs-home';
import Footer from '../components/footer';
import Header from '../components/header';
import Meta from '../components/metatags';
import { BaseUrlTypes, utils } from '../services/utility';

const Home: NextPage = (props:any) => {
  const data = props.DATA;
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
              <BlogsHome data={data} title="Home"></BlogsHome>
            </section>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </main>
  );
};

export async function getServerSideProps(context: any) {
  const API_FORM_URL = utils.getBaseApi(BaseUrlTypes.Blog, 1, 1);
  const data = await fetch(API_FORM_URL);
  const result = await data.json();

  const props = {
    API_FORM_URL: API_FORM_URL,
    DATA: result ? result : []
  };
  return { props: props };
}

export default Home;
