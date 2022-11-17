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
  const { slug } = req.query;

  if (req.method === 'POST') {
    res.status(200).json('login/authenticate');
  }
  else {
    res.status(401);
  }
}
