import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer'; // multer for handling file uploads
import fs from 'fs'; // file system module
import prisma from '../../lib/prisma';

const upload = multer({ dest: '/public/uploads' }); // Upload to 'public/uploads' folder

export const config = {
  api: {
    bodyParser: false, // Disables default body parsing for multer handling
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const uploadData:any = await new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      });
      
      // Create a unique filename to avoid conflicts
      const newFilename = `${Date.now()}-${uploadData.originalname}`;

      // Move uploaded file to the destination directory
      fs.renameSync(uploadData.path, `public/uploads/${newFilename}`);

      // Create a new image record in Prisma
      const newImage = await prisma.image.create({
        data: {
          url:`/images/${newFilename}`, // Relative path to the image
          filename: uploadData.originalname,
        },
      });

      res.status(200).json({ message: 'Image uploaded successfully!', image: newImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading image' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}