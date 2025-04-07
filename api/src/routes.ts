import {Router} from 'express';
import multer from 'multer';
import {uploadImage, uploadImageAlt} from "./routes/upload";
import {batchTag} from "./routes/tag";
import {getImages} from "./routes/images";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/upload', upload.single('image'), uploadImage);
router.post('/upload-alt', upload.single('image'), uploadImageAlt);
router.get('/images', getImages);
router.post('/tag', batchTag);


export default router;