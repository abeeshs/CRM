import express from 'express';
const router = express.Router();
import *as userController from '../controller/userController.js'
import {protect} from '../middleware/authMiddleware.js'
import *as taskController from '../controller/taskController.js'

// router.get('/',userController.userLogin)
router.post('/',userController.userLogin)
router.post ('/signup',userController.userRegister)

//Create tasks
router.post('/task/add-task',taskController.createNewTask);

//Delete Task
router.delete('/task/delete-task/:id',taskController.deleteTask);
//Edit Task
router.put('/task/edit-task/:id',taskController.editTask);


export default router;