import express from 'express'
const router = express.Router()

import { createJob, deleteJob, getAllJobs, updateJob, applyJob  } from "../controllers/jobsController.js"; 

router.route('/createJob').put(createJob)
router.route('/deleteJob').delete(deleteJob)
router.route('/getAllJobs').get(getAllJobs)
router.route('/updateJob').patch(updateJob)
router.route('/applyJob').put(applyJob)





export default router