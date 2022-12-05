// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyGallery, Gallery } from '../../../models/gallery';
import { MockAuthenticator, MockServer } from '../../../services/mockData';
import { utils } from '../../../services/utility';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;
  const authUser = MockAuthenticator.Instance.getAuthUser(req);
  const hasAdminRole = MockAuthenticator.Instance.hasAdminRole(authUser);
  const hasSubscriberRole = MockAuthenticator.Instance.hasSubscriberRole(authUser);

  switch (req.method) {
    case 'POST':
      if (!hasAdminRole) {
        res.status(403).json({ message: 'you do not have permission to access this / POST' });
      }
      break;
    case 'GET':
      if (!hasSubscriberRole && !hasAdminRole) {
        res.status(403).json({ message: 'you do not have permission to access this / GET' });
      }
      break;
    default:
      res.status(403).json({ message: 'you do not have permission to access this / ' });
      break;
  }

  if ((req.method === 'POST') && hasAdminRole) {

    const data = MockServer.GalleryData.getGallerys();

    const item: Gallery = {
      ...EmptyGallery,
      ITCC_UserID: data.length + 1,
      UserName: body.UserName,
      Password: body.Password,
      EmailAddress: body.EmailAddress,
      FirstName: body.FirstName,
      LastName: body.LastName,
    };
    const findItem = MockServer.GalleryData.getGallery(item);

    if (!findItem) {
      item.UserID = utils.generateUUID();
      item.RoleNames = ['subscriber'];
      data.push(item);
      MockServer.GalleryData.saveGallerys(data);
    }

    res.status(200).json(MockServer.GalleryData.getGallerys());

  } else if ((req.method === 'GET') && (hasAdminRole || hasSubscriberRole) ) {
    const data = MockServer.GalleryData.getGallerys();
    console.log({
      method: req.method, 
      hasAdminRole: hasAdminRole, hasSubscriberRole: hasSubscriberRole,
      data: data
    })
    res.status(200).json(data);
  }

}
