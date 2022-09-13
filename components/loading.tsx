import styles from '../styles/Home.module.css';
const Loading = (props: any) => (
    <section className={styles.main}>
        {
            (props.isLoading) &&
            <div className="row">
                <div className="col-4">
                    <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                <div className="col-4"> <span className="sr-only">Loading</span></div>
                <div className="col-4">
                    <div className="spinner-grow text-danger" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        }
    </section>

)
export default Loading;