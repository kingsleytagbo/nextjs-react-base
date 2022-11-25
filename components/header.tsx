import { useCallback, useEffect, useState } from "react";
import { utils } from "../services/utility";
const AUTH_KEY =  '/login/authenticate/';

function Header() {
    const [userLoginStatus, setLoginStatus] = useState(false);

    const getUserLoggedInStatus = useCallback(async () => {
        const loggedIn = utils.getUserLoginStatus(AUTH_KEY);
        setLoginStatus(loggedIn);
    }, []);


    useEffect(() => {
        getUserLoggedInStatus();
    }, [getUserLoggedInStatus]);

    return (
        <header className="container-fluid">
            {
                <section className="d-flex justify-content-center py-1 bg-light">
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="/" className="nav-link active" aria-current="page">Home</a></li>
                        {(userLoginStatus === true) && <li className="nav-item"><a href="/users" className="nav-link">Users</a></li>}
                    </ul>
                </section>
            }
        </header>
    );

}
export default Header;