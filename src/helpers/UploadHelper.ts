import multer from 'multer'
import path from 'path'
import * as crypto from 'crypto'
import sharp from 'sharp'
import * as fs from 'fs'
import { ErrorHandler } from './ErrorHandler'
require('dotenv/config')

export interface File {
  /** Name of the form field associated with this file. */
  fieldname: string;
  /** Name of the file on the uploader's computer. */
  originalname: string;
  mimetype: string;
  /** Size of the file in bytes. */
  size: number;

  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  destination: string;
  /** `DiskStorage` only: Name of this file within `destination`. */
  filename: string;
  /** `DiskStorage` only: Full path to the uploaded file. */
  path: string;
  /** `MemoryStorage` only: A Buffer containing the entire file. */
  buffer: Buffer;
}
export interface CompanyFiles {
  banner: string;
  thumbnail: string;
}
export interface Files{
  [key: string]: File[];
}

class UploadHelper {
    public app_host = String(process.env.APP_HOST)
    public publicFolder = path.resolve(__dirname, '..', 'public')
    public tmpFolder = path.resolve(this.publicFolder, 'tmp')

    public companiesPublicFolder: string
    public companiesBannersPublicFolder: string
    public companiesThumbnailsPublicFolder: string

    public companiesUpload = multer()
    public companiesStorage: multer.StorageEngine

    constructor () {
      this.createPublicFolders()
      this.createStorages()
      this.createMulters()
    }

    createPublicFolders (): void {
      this.companiesPublicFolder = path.resolve(this.publicFolder, 'companies')
      this.companiesBannersPublicFolder = path.resolve(this.publicFolder, 'companies', 'banners')
      this.companiesThumbnailsPublicFolder = path.resolve(this.publicFolder, 'companies', 'thumbnails')
    }

    createStorages (): void {
      this.companiesStorage = multer.diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname === 'banner' || file.fieldname === 'thumbnail') {
            cb(null, this.tmpFolder)
          } else {
            cb(new ErrorHandler(404, `Fieldname ${file.fieldname} não aceito. Fieldnames possívels : ['banner', 'thumbnail']`), this.tmpFolder)
          }
        },
        filename: function (req, file, cb) {
          crypto.randomBytes(16, (err, hash) => {
            if (err) {
              cb(new ErrorHandler(404, `Erro ao criar nome para o arquivo ${file.filename}`), '')
            } else {
              const fileName = `${file.fieldname}_${hash.toString('hex')}.png`
              cb(null, fileName)
            }
          })
        }
      })
    }

    createMulters (): void {
      this.companiesUpload = multer({
        dest: this.companiesPublicFolder,
        storage: this.companiesStorage,
        limits: {
          files: 2
        },
        fileFilter: this.filterImages
      })
    }

    filterImages (req: any, file: Express.Multer.File, cb: any): void {
      const allowedMimes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif'
      ]

      if (allowedMimes.includes(file.mimetype.toString())) {
        cb(null, true)
      } else {
        cb(new Error('Image uploaded is not of type jpg/jpeg, png or gif'), false)
      }
    }

    parsePathToUnix (path): string {
      return path.replace(/\\/g, '/')
    }

    async processImage (file: File, width: number, height: number, quality: number): Promise<string> {
      let destFolder = ''
      if (file.fieldname === 'banner') {
        destFolder = this.companiesBannersPublicFolder
      }
      if (file.fieldname === 'thumbnail') {
        destFolder = this.companiesThumbnailsPublicFolder
      }
      const destFileName = path.join(destFolder, file.filename)
      await sharp(file.path)
        .resize({
          width: width,
          height: height
        })
        .png({ quality: quality })
        .toFile(destFileName)

      fs.unlinkSync(file.path)
      return destFileName
    }

    getFileUrl (local_path) {
      let url = local_path.replace(this.publicFolder, '')
      url = this.parsePathToUnix(url)
      url = this.app_host + url
      return url
    }

    async processCompanyBanner (banner: any): Promise<string> {
      const banner_url = this.getFileUrl(await this.processImage(banner, 400, 400, 80))
      return banner_url
    }

    async processCompanyThumbnail (thumbnail: any): Promise<string> {
      const thumbnail_url = this.getFileUrl(await this.processImage(thumbnail, 100, 100, 80))
      return thumbnail_url
    }

    async processCompaniesImages (files: any): Promise<CompanyFiles> {
      const banner = files.banner[0]
      const banner_path = this.getFileUrl(await this.processImage(banner, 100, 100, 80))

      const thumbnail = files.thumbnail[0]
      const thumbnail_url = this.getFileUrl(await this.processImage(thumbnail, 100, 100, 80))

      const companyFiles = {
        banner: banner_path,
        thumbnail: thumbnail_url
      } as CompanyFiles
      return companyFiles
    }
}

export default new UploadHelper()
