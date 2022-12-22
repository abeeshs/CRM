import { Router } from 'express';

import * as adminController from '../controller/adminController.js';
import * as taskController from '../controller/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
//Admin signup
router.post('/signup', adminController.adminRegister);
//admin login
router.post('/', adminController.adminLogin);
//Add user
router.post('/users/add-user', adminController.createUser);

//Create tasks
router.post('/task/add-task',protect,taskController.createNewTask);

//Delete Task
router.delete('/task/delete-task/:id',protect,taskController.deleteTask);
//Edit Task
router.put('/task/edit-task/:id',protect,taskController.editTask);


export default router;
