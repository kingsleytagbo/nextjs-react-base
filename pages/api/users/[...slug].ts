// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyUser, User } from '../../../models/user';
import { MockAuthenticator, MockServer } from '../../../services/mockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;
  const { slug } = req.query;
  const params = slug ? Array.from(slug) : [];

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

  if (req.method === 'PUT' && hasAdminRole) {
    const item: User = {
      ...EmptyUser,
      ITCC_UserID: body.ITCC_UserID,
      UserID: body.UserID,
      UserName: body.UserName,
      Password: body.Password,
      RoleNames: body.RoleNames,
      EmailAddress: body.EmailAddress,
      FirstName: body.FirstName,
      LastName: body.LastName,
    };

    MockServer.UserData.updateUser(item);

    res.status(200).json(item);
  } else if (req.method === 'DELETE' && hasAdminRole) {
    const deleteUserId = slug && slug.length > 0 ? Number(slug[0]) : 0;
    const deleteUser = MockServer.UserData.getUser({
      ...EmptyUser,
      ITCC_UserID: deleteUserId,
    });

    MockServer.UserData.deleteUser(deleteUser);
    res.status(200).json(deleteUserId);
  } else if (req.method === 'GET' && (hasAdminRole || hasSubscriberRole)) {
    // get one user by id
    if (params && params.length === 1) {
      const items = MockServer.UserData.getUsers();
      const item =
        items.find((u) => u.ITCC_UserID === Number(params[0])) || EmptyUser;
      res.status(200).json(item);
    } else {
      res.status(404).json({ errors: 'User not found' });
    }
  }
}
