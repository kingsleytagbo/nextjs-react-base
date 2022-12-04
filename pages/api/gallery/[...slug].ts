// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyGallery, Gallery } from '../../../models/gallery';
import { MockServer } from '../../../services/mockData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;
  const { slug } = req.query;
  const params = slug ? Array.from(slug) : [];

  if (req.method === 'PUT') {
    if (body.GalleryName && body.Password) {
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
    } else {
      return res.status(400).json({ errors: 'username or password not found' });
    }
  } else if (req.method === 'DELETE') {
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

    if (authUser) {
      MockServer.GalleryData.deleteGallery(deleteUser);
      res.status(200).json(authToken);
    } else {
      res.status(404).json({ error: 'an error has occured' });
    }
  } else if (req.method === 'GET') {
    // get one user by id
    if (params && params.length === 1) {
      const items = MockServer.GalleryData.getGallerys();
      const item = items.find((u) => u.ITCC_UserID === Number(params[0]));
      res.status(200).json(item);
    } else {
      res.status(404).json({ errors: 'user not found' });
    }
  } else {
    res.status(404).json({ error: 'an error has occured' });
  }
}
