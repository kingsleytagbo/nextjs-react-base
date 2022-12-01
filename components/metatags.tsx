import Head from 'next/head';
import Script from 'next/script';

const Meta = (props: any) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    {props.keywords && props.keywords.length > 0 && (
      <meta name="keywords" content={`${props.keywords}`} />
    )}
    {props.canonical && <link rel="canonical" href={`${props.canonical}`} />}

    {/*<!-- Google / Search Engine Tags -->*/}
    <meta itemProp="name" content={props.title} />
    <meta itemProp="description" content={props.description} />
    {props.image && <meta itemProp="image" content={props.image} />}
    {/*<!-- Facebook Meta Tags -->*/}
    {process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION && (
      <meta
        name="facebook-domain-verification"
        content={`${process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION}`}
      />
    )}
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={props.title} />
    <meta
      name="og:description"
      property="og:description"
      content={props.description}
    />
    <meta
      property="og:site_name"
      content={process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_NAME}
    />
    {props.canonical && (
      <meta property="og:url" content={`${props.canonical}`} />
    )}

    {props.robots && props.robots === 'nofollow' && (
      <meta name="robots" content="noindex,nofollow" />
    )}
    {props.image && (
      <meta
        property="og:image"
        content={`${
          props.image ||
          process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL_IMAGE_BACKGROUND
        }`}
      />
    )}

    {/*<!-- Twitter Meta Tags -->*/}
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.description} />
    <meta name="twitter:card" content="summary_large_image" />

    {props.twitter_site && (
      <meta name="twitter:site" content={`${props.twitter_site}`} />
    )}
    {props.twitter_creator && (
      <meta name="twitter:site" content={`${props.twitter_creator}`} />
    )}

    {props.image && (
      <meta
        name="twitter:image"
        content={`${
          props.image ||
          process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_URL_IMAGE_BACKGROUND
        }`}
      />
    )}

    {/*<!--Styles, Fonts & Icons -->*/}
    {props.css && <link rel="stylesheet" href={`${props.css}`} />}
    <link rel="icon" type="image/png" href={'/favicon.ico'} />

    {props.js && props.js.length > 0 && <Script src={`${props.js}`}></Script>}
  </Head>
);
export default Meta;
