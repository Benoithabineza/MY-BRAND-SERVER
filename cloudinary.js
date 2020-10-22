import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config(

  process.env.CLOUDINARY_URL
);
export default cloudinary.v2.uploader;