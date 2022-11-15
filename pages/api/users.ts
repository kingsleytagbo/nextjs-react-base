// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  ITCC_UserID: number,
  Username: string,
  Password: string
};

const data: Array<User> = [{ ITCC_UserID:1, Username: 'admin', Password: 'password' }];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;
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
    res.status(200).json(data);
   }
    else res.status(401);
}
