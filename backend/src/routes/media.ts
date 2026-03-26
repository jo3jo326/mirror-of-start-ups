import express from 'express';
import multer from 'multer';
import cloudinary from '../cloudinary';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max for images
  // Accept any image type (let Cloudinary handle validation)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Invalid file type: ' + file.mimetype));
  },
});

// Only handle image uploads now
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('[UPLOAD] /api/media/upload called');
    if (!req.file) {
      console.log('[UPLOAD] No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('[UPLOAD] File received:', req.file.originalname, req.file.mimetype, req.file.size);
    // Only allow images
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'startups/images',
      },
      (error, result) => {
        if (error || !result) {
          console.log('[UPLOAD] Cloudinary error:', error?.message, error);
          return res.status(500).json({ error: error?.message || 'Upload failed' });
        }
        console.log('[UPLOAD] Cloudinary upload success:', result.secure_url);
        res.json({ url: result.secure_url, public_id: result.public_id });
      }
    );
    uploadStream.end(req.file.buffer);
    console.log('[UPLOAD] File buffer sent to Cloudinary');
  } catch (err: any) {
    console.log('[UPLOAD] Exception thrown:', err.message, err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
