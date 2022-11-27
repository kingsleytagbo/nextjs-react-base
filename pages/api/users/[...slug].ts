// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { EmptyUser, User } from '../../../models/user';
import { mockServer } from '../../../services/mockData';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const body = req.body;
  const { slug } = req.query;
  const params = slug ? Array.from(slug) : [];

  if (req.method === 'PUT') {
    if (body.UserName && body.Password) {

      const item: User = {
        ...EmptyUser, ITCC_UserID: body.ITCC_UserID, UserID: body.UserID,
        UserName: body.UserName, Password: body.Password, RoleNames: body.RoleNames,
        EmailAddress: body.EmailAddress, FirstName: body.FirstName, LastName: body.LastName
      };

      mockServer.updateUser(item);

      res.status(200).json(item);
    }
    else {
      return res.status(400).json({ errors: 'username or password not found' })
    }

  }
  else if (req.method === 'DELETE') {
    res.status(200).json(slug);
  }
  else if (req.method === 'GET') {
    // get one user by id
    if (params && params.length === 1) {
      const items = mockServer.getUsers();
      const item = items.find(u => u.ITCC_UserID === Number(params[0]));
      res.status(200).json(item);
    }
    else {
      res.status(404).json({ errors: 'user not found' })
    }
  }
  else {
    res.status(404).json({ error: 'an error has occured' });
  }
}
