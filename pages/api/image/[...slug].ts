// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { FileCache } from '../../../services/fileCache';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { slug } = req.query;
  const params = slug ? Array.from(slug) : [];

  // get one image by id
  if (params && params.length === 1) {
    /*
    const uploadDir = path.join(
      process.env.NEXT_PUBLIC_FILE_UPLOAD_DIRECTORY || '',
      process.env.NEXT_PUBLIC_REACT_APP_WEBSITE_KEY_PRIVATE || ''
    );
    */
    const uploadDir =  FileCache.Instance.getFileUploadDirectory();
    const filePath = uploadDir + '\\' + params[0];
    const blankImagePath = 'img\\blank_image.png';

    fs.exists(filePath, function (exists) {
      if (!exists) {
        res.writeHead(200, {
          'Content-Type': 'image/jpg',
        });

        fs.readFile(blankImagePath, function (err, content) {
          res.end(content);
        });
      } else {
        const fileExtension = path.extname(filePath);
        let contentType = 'image/png';
        if (fileExtension === '.png') {
          contentType = 'image/png';
        } else if (fileExtension === '.jpg') {
          contentType = 'image/jpeg';
        } else if (fileExtension === '.jpeg') {
          contentType = 'image/jpeg';
        }

        // Setting the headers
        res.writeHead(200, {
          'Content-Type': contentType,
        });
        // Reading the file
        fs.readFile(filePath, function (err, content) {
          // Serving the image
          res.end(content);
        });
      }
    });

    res.status(200);
  }
}
