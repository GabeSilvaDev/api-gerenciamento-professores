/* import { diskStorage } from "multer"; */
import * as multerS3 from 'multer-s3';
import { S3Client } from "@aws-sdk/client-s3";
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const s3Config = new S3Client({
    region: 'sa-east-1',
    credentials: {
        accessKeyId: 'AKIA3FLDZDMWMPYD4AET',
        secretAccessKey: '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',
    },
});

const multerConfig = {
    storage: multerS3({
        s3: s3Config,
        bucket: 'tw-api-03',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const fileName =
                path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

            const extension = path.parse(file.originalname).ext;
            cb(null, `${fileName}${extension}`);
        },
    }),
};

export default multerConfig;