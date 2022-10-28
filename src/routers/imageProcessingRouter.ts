import express from 'express'
import resize from '../controllers/imageProcessingController'
import { verfiyQueryString, isCached } from '../validtors/generalValidtor'

const router = express.Router()

// before resizing => validate parameters (w , h and fileName )
// then check if already there
router.get('/resize', verfiyQueryString, isCached, resize)

export default router
