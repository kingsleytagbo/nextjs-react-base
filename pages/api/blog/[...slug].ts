// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyBlog, Blog } from '../../../models/blog';
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
    const item: Blog = {
      ...EmptyBlog,
      ITCC_BlogID: body.ITCC_BlogID,
      Name: body.Name,
      Description: body.Description,
      FilePath: body.FilePath,
      FileGroup: body.FileGroup,
      File: body.File
    };

    MockServer.BlogData.updateBlog(item);
    res.status(200).json(item);
  } else if (req.method === 'DELETE' && hasAdminRole) {
    const deleteUserId = slug && slug.length > 0 ? Number(slug[0]) : 0;
    const deleteUser = MockServer.BlogData.getBlog({
      ...EmptyBlog,
      ITCC_BlogID: deleteUserId,
    });

    MockServer.BlogData.deleteBlog(deleteUser);
    res.status(200).json(deleteUserId);
  } else if (req.method === 'GET' && (hasAdminRole || hasSubscriberRole)) {
    // get one user by id
    if (params && params.length === 1) {
      const items = MockServer.BlogData.getBlogs();

      const item =
        items.find((u) => u.ITCC_BlogID === Number(params[0])) || EmptyBlog;

      res.status(200).json(item);
    } else {
      res.status(404).json({ messge: 'Blog not found' });
    }
  }
}
