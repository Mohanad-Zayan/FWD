import { Request, Response, NextFunction } from 'express'

import fs from 'fs'
import path from 'path'

export const verfiyQueryString = (
  req: Request,
  res: Response,
  next: NextFunction
): undefined | Response => {
  const width = isNaN(parseInt(req.query.width as string)) ? 0 : parseInt(req.query.width as string)
  const height = isNaN(parseInt(req.query.height as string)) ? 0 : parseInt(req.query.height as string)

  const filename = req.query.filename as string ?? ''

  if (
    !fs.existsSync(
      path.join(__dirname, '..', '..', 'data', 'images', `${filename}.jpg`)
    )
  ) {
    return res.status(400).send('<p>Please provide A valid fileName</p>')
  }

  if (width === 0 || height === 0) { return res.status(400).send('<p>Please provide both widht and height</p>') }

  if (width < 0 && height < 0) { return res.status(400).send('<p>Please provide a postive value</p>') }

  if (typeof width !== 'number' && typeof height !== 'number') {
    return res
      .status(400)
      .send('<p>Please provide a valid Height and width</p>')
  }

  next()
}
// thumbnail{imgname widhtxhight}
export const isCached = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const filename = req.query.filename as string ?? ''
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)

  const imageName = `${filename}${width}x${height}.jpeg`
  const imagePath = path.join(__dirname, '..', '..', 'public', 'thumbnails', imageName)

  if (fs.existsSync(imagePath)) {
    // isCached is declared explicitly  src/@types/custom.d.ts
    console.log('Returned from the cached storage')
    req.isCached = true
  }
  req.isCached = false
  next()
}
