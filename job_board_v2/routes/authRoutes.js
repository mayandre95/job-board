import express from 'express'
const router = express.Router()

import { register, login, updateUser, getAllDataUser, getAllCandidate, getAllCompanies} from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/getAllDataUser').get(getAllDataUser)
router.route('/getAllCompanies').get(getAllCompanies)
router.route('/getAllCandidate').get(getAllCandidate)
router.route('/login').post(login)
router.route('/updateUser').get(authenticateUser,getAllDataUser)
router.route('/updateUser').patch(authenticateUser,updateUser)


export default router
