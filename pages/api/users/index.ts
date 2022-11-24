// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../models/user';
import { MockData } from '../../../services/mockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const mockServer = MockData;
  const body = req.body;

  if (req.method === 'POST') {
    if (body.Username && body.Password) {
      const data = mockServer.getUsers();

      const item: User = { ITCC_UserID: data.length + 1, Username: body.Username, Password: body.Password, UserID: '' };
      const findUser = mockServer.getUser(item);

      if (!findUser) {
        data.push(item);
        mockServer.saveUsers(data);
      }

      res.status(200).json(mockServer.getUsers());
    }
    else {
      return res.status(400).json({ errors: 'Username or password not found' })
    }
  }

  /*
  else if (req.method === 'PUT') {
    if (body.Username && body.Password) {

      const item: User = { ITCC_UserID: body.ITCC_UserID, Username: body.Username, Password: body.Password };

      mockServer.updateUser(item);

      res.status(200).json(item);
    }

    else {
      return res.status(400).json({ errors: 'Username or password not found' })
    }
        
  }
  */
  else if (req.method === 'GET') {
    const data = mockServer.getUsers();
    res.status(200).json(data);
  }
  else {
    res.status(401).json({error: 'an error has occured'});
  }
}
