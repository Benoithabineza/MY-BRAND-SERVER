import pkg from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
const {v2: cloudinary}=pkg
cloudinary.config(process.env.CLOUDINARY_URL
);
export default cloudinary.uploader;
