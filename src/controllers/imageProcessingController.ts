import express from 'express'
import path from 'path'
import * as imageUtil from '../util/ImageProcessing'

const resize = (async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const filename = req.query.filename as string ?? ''

    const width: number = parseInt(req.query.width as string)
    const height: number = parseInt(req.query.height as string)

    if (!req.isCached) {
      // 1) read FIle :
      const imgPath = path.join(`./data/images/${filename}.jpg`)
      const imageBuffer = await imageUtil.getImageBuffer(imgPath)

      // 2) Gettingimage Metdata (to get deafult width and height in case the query doesn't specfiy it )
      // const imageMeta = await imageUtil.getImageMeta(imageBuffer);
      // const { width: defaultWidth, height: defaultHeight } = imageMeta;

      const resziedImageBuffer = await imageUtil.resizeImage(
        imageBuffer,
        width,
        height
      )

      await imageUtil.writeImage(
        `./public/thumbnails/${filename}${width}x${height}.jpeg`,
        resziedImageBuffer
      )

      res.status(200).end(resziedImageBuffer)
    } else {
      const imgPath = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'thumbnails',
        `${filename} ${width}x${height}.jpeg`
      )
      const cachedImageBuffer = await imageUtil.getImageBuffer(imgPath)
      res.status(200).end(cachedImageBuffer)
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error
    })
  }
}) as express.RequestHandler

export default resize
