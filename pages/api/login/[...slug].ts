// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../models/user';
import { MockData } from '../../../services/mockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const mockServer = MockData;
  const query = req.query;
  const { slug, privateKey } = query;
  const params = slug ? Array.from(slug) : [];

  if (req.method === 'POST' && params.indexOf('authenticate') > -1) {
    const base64AuthenticationHeader = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(base64AuthenticationHeader, 'base64').toString().split(':');

    const item: User = { ITCC_UserID: 0, Username: username, Password: password };
    const findUser = mockServer.getUser(item);
    const result = { AuthID: findUser?.ITCC_UserID, RoleNames: ['admin'] };

    console.log({
      result: result, slug: req.query, params: params,
      username: username, password: password, item: item, findUser: findUser
    });

    res.status(200).json(result);
  }
  else {
      res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.status(401);
  }
}
