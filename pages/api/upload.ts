import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err || !files.file) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    const fileName = path.basename(uploadedFile.filepath);
    const fileUrl = `/uploads/${fileName}`;

    return res.status(200).json({ url: fileUrl });
  });
}
