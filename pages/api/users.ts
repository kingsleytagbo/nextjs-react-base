// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  username: string,
  password: string
};

const data: Array<User> = [{ username: 'John Doe', password: 'john.doe@email.com' }];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;
  if (req.method === 'POST') {
    console.log({post: body});
    if(body.username && body.password){
      const item: User = {username: body.username, password: body.password};
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
