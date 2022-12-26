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
    const item: Gallery = {
      ...EmptyGallery,
      ITCC_ImageID: body.ITCC_ImageID,
      Name: body.Name,
      Description: body.Description,
      FilePath: body.FilePath,
      FileGroup: body.FileGroup,
      File: body.File,
    };

    MockServer.GalleryData.updateGallery(item);
    res.status(200).json(item);
  } else if (req.method === 'DELETE' && hasAdminRole) {
    const deleteUserId = slug && slug.length > 0 ? Number(slug[0]) : 0;
    const deleteUser = MockServer.GalleryData.getGallery({
      ...EmptyGallery,
      ITCC_ImageID: deleteUserId,
    });

    MockServer.GalleryData.deleteGallery(deleteUser);
    res.status(200).json(deleteUserId);
  } else if (req.method === 'GET' && (hasAdminRole || hasSubscriberRole)) {

    if (params) {
      const items = MockServer.GalleryData.getGallerys();
      
      if (params.length === 1) {
        const item =
          items.find((u) => u.ITCC_ImageID === Number(params[0])) || EmptyGallery;

        res.status(200).json(item);
      }
      else if (params.indexOf('page') > -1) {

        const pageNumber = Number(params[1]) || 1;
        const pageSize = Number(params[2]) || 1;
        const startPage = (pageNumber * pageSize) - 1;
        const data = items.slice(startPage, startPage + pageSize) || [EmptyGallery];

        res.status(200).json(data);
      }
    }
    else {
      res.status(404).json({ messge: 'Gallery not found' });
    }
  }
}
