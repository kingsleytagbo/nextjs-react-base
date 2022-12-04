// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EmptyGallery, Gallery } from '../../../models/gallery';
import { MockServer } from '../../../services/mockData';
import { utils } from '../../../services/utility';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;

  if (req.method === 'POST') {
    if (body.GalleryName && body.Password) {
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
      const findUser = MockServer.GalleryData.getGallery(item);

      if (!findUser) {
        item.UserID = utils.generateUUID();
        item.RoleNames = ['subscriber'];
        data.push(item);
        MockServer.GalleryData.saveGallerys(data);
      }

      res.status(200).json(MockServer.GalleryData.getGallerys());
    } else {
      return res.status(400).json({ errors: 'UserName or password not found' });
    }
  } else if (req.method === 'GET') {
    const data = MockServer.GalleryData.getGallerys();
    res.status(200).json(data);
  } else {
    res.status(401).json({ error: 'an error has occured' });
  }
}
