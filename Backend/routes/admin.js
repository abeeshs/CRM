import { Router } from 'express';

import * as adminController from '../controller/adminController.js';
import * as taskController from '../controller/taskController.js';
import { adminProtect } from '../middleware/authMiddleware.js';
const router = Router();
//Admin signup
router.post('/signup', adminController.adminRegister);
//admin login
router.post('/', adminController.adminLogin);
//Add user
router.post('/users/add-user', adminController.createUser);
//View all task
router.get('/task',adminProtect, adminController.getAllTask);

//Create tasks
router.post('/task/add-task', adminProtect, taskController.createNewTask);

//Delete Task
router.delete('/task/delete-task/:id', adminProtect, taskController.deleteTask);
//Edit Task
router.put('/task/edit-task/:id', adminProtect, taskController.editTask);

//Get all users
router.get('/Users',adminController.getAllUser);

export default router;
