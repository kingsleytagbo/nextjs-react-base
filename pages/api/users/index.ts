// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyUser, User } from '../../../models/user';
import { MockAuthenticator, MockServer } from '../../../services/mockData';
import { utils } from '../../../services/utility';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;

  const authUser = MockAuthenticator.Instance.getAuthUser(req);
  const hasAdminRole = MockAuthenticator.Instance.hasAdminRole(authUser);
  const hasSubscriberRole =
    MockAuthenticator.Instance.hasSubscriberRole(authUser);

  switch (req.method) {
    case 'GET':
      if (!hasSubscriberRole && !hasAdminRole) {
        res
          .status(403)
          .json({ message: 'you do not have permission to access this' });
      }
      break;
    case 'PUT':
      if (!hasAdminRole) {
        res
          .status(403)
          .json({ message: 'you do not have permission to access this' });
      }
      break;
    case 'DELETE':
      if (!hasAdminRole) {
        res
          .status(403)
          .json({ message: 'you do not have permission to access this' });
      }
      break;
    default:
      res
        .status(403)
        .json({ message: 'you do not have permission to access this' });
      break;
  }

  if (req.method === 'POST' && hasAdminRole) {
    const data = MockServer.UserData.getUsers();
    const item: User = {
      ...EmptyUser,
      ITCC_UserID: data.length + 1,
      UserName: body.UserName,
      Password: body.Password,
      EmailAddress: body.EmailAddress,
      FirstName: body.FirstName,
      LastName: body.LastName,
    };
    const findItem = MockServer.UserData.getUser(item);

    if (!findItem) {
      item.UserID = utils.generateUUID();
      item.RoleNames = ['subscriber'];
      data.push(item);
      MockServer.UserData.saveUsers(data);
    }

    res.status(200).json(MockServer.UserData.getUsers());
  } else if (req.method === 'GET' && (hasAdminRole || hasSubscriberRole)) {
    const data = MockServer.UserData.getUsers();
    res.status(200).json(data);
  }
}
