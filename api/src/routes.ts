import {Router} from 'express';
import multer from 'multer';
import {uploadImage} from "./routes/upload";
import {batchTag} from "./routes/tag";
import {getImages} from "./routes/get-images";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/upload', upload.single('image'), uploadImage);
router.get('/images', getImages);
router.post('/tag', batchTag);


export default router;