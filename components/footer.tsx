const Footer = () => (
  <footer className="border-top text-dark text-center pb-2 pt-2 bg-light fixed-bottom">
    {
      <div className="container">
        <span className="text-muted">
          Copyright&nbsp;&copy;&nbsp;
          {process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_NAME}
        </span>
      </div>
    }
  </footer>
);
export default Footer;
