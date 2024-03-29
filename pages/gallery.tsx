import type { NextPage } from 'next';
import { useEffect } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Meta from '../components/metatags';
import ListGallerys from '../components/gallery/list-gallery';
import { AuthGuard } from '../services/authGuard';

const GalleryPage: NextPage = () => {
  useEffect(() => {
    AuthGuard();
  }, []);

  return (
    <main className="container-fluid bg-light">
      <Meta
        description={'Manage Gallerys Page'}
        title={'Gallerys'}
        canonical={process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL + '/gallery'}
      />
      <Header></Header>

      <section className="bg-secondary mb-5">
        <div className="row">
          <div className="col-md-12">
            <section>
              <ListGallerys></ListGallerys>
            </section>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </main>
  );
};

export default GalleryPage;
