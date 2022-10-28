import fs from 'fs'
import sharp, { Metadata } from 'sharp'
import { promisify } from 'util'

export const getImageBuffer = async (path: string): Promise<Buffer> => {
  return await promisify(fs.readFile)(path)
}

export const getImageMeta = async (imaegBuffer: Buffer): Promise<Metadata> => {
  const image = sharp(imaegBuffer)
  return await image.metadata()
}

export const resizeImage = async (
  imageBuffer: Buffer,
  width: number,
  height: number
): Promise<Buffer> => {
  return await sharp(imageBuffer)
    .rotate()
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toBuffer()
}

export const writeImage = async (
  path: string,
  resziedImageBuffer: Buffer
): Promise<void> => {
  // await fs.writeFile(path, resziedImageBuffer);
  await promisify(fs.writeFile)(path, resziedImageBuffer)
}
