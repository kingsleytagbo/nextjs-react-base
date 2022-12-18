import type { NextPage } from 'next';
import BlogSlug from '../components/blogs/blog-slug';
import Footer from '../components/footer';
import Header from '../components/header';
import Meta from '../components/metatags';
import { BaseUrlTypes, utils } from '../services/utility';

const SlugPage: NextPage = (props: any) => {
  const data = props.DATA;
  const postSlug = props.POST_SLUG;

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
              <BlogSlug postSlug={postSlug} data={data}></BlogSlug>
            </section>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </main>

  );
};

export async function getServerSideProps(context: any) {
  const slug = context.params.slug;
  const POST_SLUG = (slug && Array.isArray(slug) ? slug.join('/') : slug) || '';
  //http://localhost:3011/api/blog/1DC52158-0175-479F-8D7F-D93FC7B1CAA4/slug/please-register-for-reactjs-beginners-quick-start-quide
  const API_BLOGS_READ = utils.getBaseApi(BaseUrlTypes.Blog).concat('/slug/', POST_SLUG);
  const data = await fetch(API_BLOGS_READ);
  const result = await data.json();
  const props = {
    POST_SLUG: POST_SLUG,
    API_BLOGS_READ: API_BLOGS_READ,
    DATA: result ? result : null
  };
  return { props: props };
}

export default SlugPage;
