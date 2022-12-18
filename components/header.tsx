import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import {useAuthContext} from '../context/auth-context';
import { utils } from '../services/utility';
//import { publish, subscribe, unsubscribe } from '../services/event';
import { AUTH_KEY } from '../services/constants';

/*
const getUserAuth = useCallback(async () => {
  const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
  setUserAuth({ ...userAuthResult });
  return userAuthResult;
}, []);
*/

function Header() {
  const router = useRouter();
  //const [userAuthContext, setUserAuthContext] = useState(false);
  const {userAuthContext, setUserAuthContext, setUserAuth} = useAuthContext();

  const getUserLoggedInStatus = useCallback(async () => {
    const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
    const loggedIn = utils.getUserAuthStatus(null, userAuthResult);

    setUserAuth(userAuthResult);
    setUserAuthContext(loggedIn);
  }, [setUserAuthContext, setUserAuth]);

  const onLogout = () => {
    utils.saveData(null, AUTH_KEY);
    //publish(AUTH_KEY, { detail: '' });
    getUserLoggedInStatus();
    router.push({ pathname: '/' });
  };

  useEffect(() => {
   //subscribe(AUTH_KEY, () => getUserLoggedInStatus());
    getUserLoggedInStatus();
/*
    return () => {
      unsubscribe(AUTH_KEY, () => getUserLoggedInStatus());
    };
    */
  }, [getUserLoggedInStatus]);

  return (
    <header className="container-fluid">
      {
        <section className="d-flex justify-content-center py-1 bg-light">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link legacyBehavior href="/">
                <a
                  href="/"
                  className={`nav-link ${
                    router.asPath === '/' ? 'active' : ''
                  }`}
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>

            {userAuthContext === true && (
              <>
                <li className="nav-item">
                  <Link legacyBehavior href="/blogs">
                    <a
                      href="/blogs"
                      className={`nav-link ${
                        router.asPath === '/blogs' ? 'active' : ''
                      }`}
                      aria-current="page"
                    >
                      Blogs
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link legacyBehavior href="/gallery">
                    <a
                      href="/gallery"
                      className={`nav-link ${
                        router.asPath === '/gallery' ? 'active' : ''
                      }`}
                      aria-current="page"
                    >
                      Gallery
                    </a>
                  </Link>
                </li>
              </>
            )}

            {userAuthContext === true && (
              <li className="nav-item">
                <Link legacyBehavior href="/users">
                  <a
                    href="/"
                    className={`nav-link ${
                      router.asPath === '/users' ? 'active' : ''
                    }`}
                    aria-current="page"
                  >
                    Users
                  </a>
                </Link>
              </li>
            )}

            <li className="nav-item">
              {userAuthContext === true ? (
                <button
                  onClick={onLogout}
                  className="btn btn-secondary"
                  type="button"
                  value="Logout"
                >
                  <i className="bi bi-unlock"></i>&nbsp;Logout
                </button>
              ) : (
                <Link legacyBehavior href="/login">
                  <a
                    href="/"
                    className={`nav-link ${
                      router.asPath === '/login' ? 'active' : ''
                    }`}
                    aria-current="page"
                  >
                    Login
                  </a>
                </Link>
              )}
            </li>
          </ul>
        </section>
      }
    </header>
  );
}
export default Header;
