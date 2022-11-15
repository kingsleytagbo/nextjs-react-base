// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../models/User';
import { MockData } from '../../services/mockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = new MockData().getUsers();
  const body = req.body;
  const slug = req.query;

  if (req.method === 'POST') {
    console.log({post: body});
    if(body.username && body.password){
      const item: User = {ITCC_UserID: data.length + 1, Username: body.username, Password: body.password};
      data.push(item);
      res.status(200).json(data);
    }
    else{
      return res.status(400).json({ errors: 'Username or password not found' })
    }

   }
   else if (req.method === 'GET'){
    console.log({ GET: body, slug: slug });
    res.status(200).json(data);
   }
    else {
      res.status(401);
    }
}
