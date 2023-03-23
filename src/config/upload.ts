import multer from "multer";
import { resolve } from "path";

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(),
            }),
        };
    },
};
