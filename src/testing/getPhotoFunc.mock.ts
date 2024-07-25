import { join } from "path"
import { fileToBuffer } from "./fileToBuffer"

export const getPhotoFunc = async () => {

    const {buffer, stream} = await fileToBuffer(join(__dirname, 'photo.png'))

    const photo: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'photo.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: 1024 * 50,
        stream,
        destination: '',
        filename: 'file-name',
        path: 'file-path',
        buffer,
    }

    return photo
}