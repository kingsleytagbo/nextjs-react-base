// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyUser, User } from '../../../models/user';
import { mockServer } from '../../../services/mockData';
import { utils } from '../../../services/utility';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;

  if (req.method === 'POST') {
    if (body.UserName && body.Password) {
      const data = mockServer.getUsers();

      const item: User = {
        ...EmptyUser,
        ITCC_UserID: data.length + 1,
        UserName: body.UserName,
        Password: body.Password,
        EmailAddress: body.EmailAddress,
        FirstName: body.FirstName,
        LastName: body.LastName,
      };
      const findUser = mockServer.getUser(item);

      if (!findUser) {
        item.UserID = utils.generateUUID();
        item.RoleNames = ['subscriber'];
        data.push(item);
        mockServer.saveUsers(data);
      }

      res.status(200).json(mockServer.getUsers());
    } else {
      return res.status(400).json({ errors: 'UserName or password not found' });
    }
  } else if (req.method === 'GET') {

  /*
  else if (req.method === 'PUT') {
    if (body.UserName && body.Password) {

      const item: User = { ITCC_UserID: body.ITCC_UserID, UserName: body.UserName, Password: body.Password };

      mockServer.updateUser(item);

      res.status(200).json(item);
    }

    else {
      return res.status(400).json({ errors: 'UserName or password not found' })
    }
        
  }
  */
    const data = mockServer.getUsers();
    res.status(200).json(data);
  } else {
    res.status(401).json({ error: 'an error has occured' });
  }
}
