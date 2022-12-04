// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyUser, User } from '../../../models/user';
import { MockServer } from '../../../services/mockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const query = req.query;
  const { slug, privateKey } = query;
  const params = slug ? Array.from(slug) : [];

  if (req.method === 'POST' && params.indexOf('authenticate') > -1) {
    const base64AuthenticationHeader =
      (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(
      base64AuthenticationHeader,
      'base64'
    )
      .toString()
      .split(':');

    const item: User = { ...EmptyUser, UserName: username, Password: password };
    const findUser = MockServer.UserData.getUser(item);

    if (findUser) {
      const result = {
        AuthID: findUser.UserID,
        RoleNames: findUser.RoleNames,
        Key: privateKey,
        FirstName: findUser.FirstName,
        LastName: findUser.LastName,
        EmailAddress: findUser.EmailAddress,
      };
      res.status(200).json(result);
    } else {
      setUnauthorizedHttpResponse(res);
    }
  } else {
    setUnauthorizedHttpResponse(res);
  }
}

const setUnauthorizedHttpResponse = (res: NextApiResponse<any>) => {
  res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
  res.status(403).json({ error: 'unauthorized' });
};
