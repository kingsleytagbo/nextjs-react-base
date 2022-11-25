import Link from "next/link";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from "react";
import { utils } from "../services/utility";
const AUTH_KEY = '/login/authenticate/';

function Header() {
    const router = useRouter();
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
                        <li className="nav-item">
                            <Link legacyBehavior href='/'>
                                <a href="/"
                                    className={`nav-link ${router.asPath === '/' ? 'active' : ''}`}
                                    aria-current="page">Home</a>
                            </Link>
                        </li>
                        {(userLoginStatus === true) &&
                            <li className="nav-item">
                                <Link legacyBehavior href='/users'>
                                    <a href="/"
                                        className={`nav-link ${router.asPath === '/users' ? 'active' : ''}`}
                                        aria-current="page">Users</a>
                                </Link>
                            </li>
                        }
                    </ul>
                </section>
            }
        </header>
    );

}
export default Header;