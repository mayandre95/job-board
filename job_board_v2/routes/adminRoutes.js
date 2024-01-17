import express from 'express'
const router = express.Router()

import {searchAdmin} from "../controllers/adminController.js";
import authenticateUser from '../middleware/auth.js'

router.route('/search').get(searchAdmin)
// router.route('/search').get(statAdmin)


export default router
