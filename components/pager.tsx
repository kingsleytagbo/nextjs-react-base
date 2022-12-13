export default function Pager(props: any) {
  return (
    <section className="clearfix">
      {
        <div className="row">
          <div className="col-6">
            <div
              onClick={props.nextPage}
              className="d-flex justify-content-center mr-2 mb-4"
            >
              <a
                href="#!"
                className={
                  props.items && props.items.length > 0
                    ? 'btn btn-primary text-uppercase'
                    : 'btn btn-outline-primary text-uppercase'
                }
              >
                {props.pageNumber && <span>Newer Posts → </span>}
              </a>
            </div>
          </div>
          <div className="col-6">
            <div
              onClick={props.prevPage}
              className="d-flex justify-content-center mr-2 mb-4"
            >
              <a
                href="#!"
                className={
                  props.pageNumber > 1
                    ? 'btn btn-info text-uppercase'
                    : 'btn btn-outline-info text-uppercase'
                }
              >
                {props.pageNumber && <span>← Older Posts</span>}{' '}
              </a>
            </div>
          </div>
        </div>
      }
    </section>
  );
}
