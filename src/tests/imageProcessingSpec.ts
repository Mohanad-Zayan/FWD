import path from 'path'
import fs from 'fs'
import * as imageUtil from '../util/ImageProcessing'

describe('Test imageUtil', () => {
  it('testing resizing functionality', async () => {
    // const response = await request
    // .get('/api/resize?filename=fjord&width=200&height=200')
    const imageBuffer = await imageUtil.getImageBuffer(path.join(__dirname, '..', '..', 'data', 'images', 'encenadaport.jpg'))
    const resizedImageBuffer = await imageUtil.resizeImage(imageBuffer, 200, 200)
    const resizedImagePath = path.join(__dirname, '..', '..', 'public', 'thumbnails', 'encenadaport200x200.jpeg')
    await imageUtil.writeImage(resizedImagePath, resizedImageBuffer)

    console.log(resizedImagePath)

    expect(fs.existsSync(resizedImagePath)).toEqual(true)
  })
})
