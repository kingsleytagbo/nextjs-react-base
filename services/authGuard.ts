import router from 'next/router';
import { AUTH_KEY } from './constants';
import { utils } from './utility';

export const AuthGuard = () => {
  const userAuthResult = utils.getUserAuthRoles(AUTH_KEY);
  const loggedIn = utils.getUserAuthStatus(null, userAuthResult);
  if (!loggedIn) {
    router.push({ pathname: '/' });
  }
};
