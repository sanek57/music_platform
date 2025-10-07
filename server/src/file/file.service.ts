import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import path from 'path'
import fs from 'fs'
import { v4 } from 'uuid'

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  // file - multer
  async createFile(type: FileType, file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop() // получили расширение файла
      const fileName = v4() + '.' + fileExtension
      const filePath = path.resolve(__dirname, '..', 'static', type)

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

      return type + '/' + fileName
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeFile(filename: string) {}
}
