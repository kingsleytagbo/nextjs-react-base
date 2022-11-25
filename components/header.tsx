const Header = () => (
    <section>
        {
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item"><a href="/" className="nav-link active" aria-current="page">Home</a></li>
                    <li className="nav-item"><a href="/users" className="nav-link">Users</a></li>
                </ul>
            </header>
        }
    </section>

)
export default Header;