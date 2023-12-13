import express from 'express'
import { createTask, deleteTask, getTasks } from '../controllers/tasks.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.route('/get-tasks')
  .get(verifyToken, getTasks)
router.route('/create-task')
  .post(verifyToken, createTask)
router.route('/delete-task')
  .delete(verifyToken, deleteTask)
export default router
