// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyGallery, Gallery } from '../../../models/gallery';
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
  const hasSubscriberRole = MockAuthenticator.Instance.hasSubscriberRole(authUser);

  switch (req.method) {
    case 'GET':
      if (!hasSubscriberRole && !hasAdminRole) {
        res.status(403).json({ message: 'you do not have permission to access this' });
      }
      break;
    case 'PUT':
      if (!hasAdminRole) {
        res.status(403).json({ message: 'you do not have permission to access this' });
      }
      break;
    case 'DELETE':
      if (!hasAdminRole) {
        res.status(403).json({ message: 'you do not have permission to access this' });
      }
      break;
    default:
      res.status(403).json({ message: 'you do not have permission to access this' });
      break;
  }


  if ((req.method === 'PUT') && hasAdminRole) {
    const item: Gallery = {
      ...EmptyGallery,
      ITCC_UserID: body.ITCC_UserID,
      UserID: body.UserID,
      UserName: body.UserName,
      Password: body.Password,
      RoleNames: body.RoleNames,
      EmailAddress: body.EmailAddress,
      FirstName: body.FirstName,
      LastName: body.LastName,
    };

    MockServer.GalleryData.updateGallery(item);
    res.status(200).json(item);
  }
  else if ((req.method === 'DELETE') && hasAdminRole) {
    const base64AuthenticationHeader =
      (req.headers.authorization || '').split(' ')[1] || '';
    const [authToken] = Buffer.from(base64AuthenticationHeader, 'base64')
      .toString()
      .split(':');
    const authUser = MockServer.GalleryData.getGallery({ ...EmptyGallery, UserID: authToken });

    const deleteUserId = slug && slug.length > 0 ? Number(slug[0]) : 0;
    const deleteUser = MockServer.GalleryData.getGallery({
      ...EmptyGallery,
      ITCC_UserID: deleteUserId,
    });


    MockServer.GalleryData.deleteGallery(deleteUser);
    res.status(200).json(authToken);

  }
  else if ((req.method === 'GET') && (hasAdminRole || hasSubscriberRole)) {
    // get one user by id
    if (params && params.length === 1) {
      const items = MockServer.GalleryData.getGallerys();
      const item = items.find((u) => u.ITCC_UserID === Number(params[0])) || {};

      res.status(200).json(item);
      
    } else {
      res.status(404).json({ messge: 'Gallery not found' });
    }
  }

}
