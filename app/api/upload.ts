import multer from "multer";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

export default async function handler(req: Request, res: Response) {
  // Upload the file
  await upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Get the uploaded file URL
    const fileUrl = req.file?.filename;

    // Return the file URL
    res.status(200).json({ fileUrl });
  });
}