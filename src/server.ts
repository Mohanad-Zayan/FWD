import express from 'express'
import router from './routers/imageProcessingRouter'

const app = express()

// caching functionalty

app.use('/api', router)

app.use(express.static('public'))

const port = process.env.PORT ?? 3000
const server = app.listen(port, () => {
  console.log(`server is up and runing on port ${port}`)
})

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

export default app
