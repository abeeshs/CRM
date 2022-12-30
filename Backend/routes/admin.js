import { Router } from 'express';
import *as contactController from '../controller/contactController.js'
import * as adminController from '../controller/adminController.js';
import * as taskController from '../controller/taskController.js';
import { adminProtect } from '../middleware/authMiddleware.js';
const router = Router();
//=============== LOGIN/REGISTER ===============

//Admin signup
router.post('/signup', adminController.adminRegister);
//admin login
router.post('/', adminController.adminLogin);
//Add user
router.post('/users/add-user', adminController.createUser);

//==================== TASK =======================
//View all task
router.get('/task',adminProtect, adminController.getAllTask);

//Create tasks
router.post('/task/add-task', adminProtect, taskController.createNewTask);

//Delete Task
router.delete('/task/delete-task/:id', adminProtect, taskController.deleteTask);
//Edit Task
router.put('/task/edit-task/:id', adminProtect, taskController.editTask);

//====================== USERS ========================
//Get all users
router.get('/Users',adminController.getAllUser);
//delete user
router.delete('/Users/delete-user/:id',adminController.deleteUser);


//================== CONTACTS ====================

//view -Contacts
router.get('/contacts',adminProtect,contactController.getAllContact)
//create contacts
router.post('/contacts/add-contact',adminProtect,contactController.addNewContact)
//delete contacts
router.delete('/contacts/delete-contact/:id',adminProtect,contactController.deleteContact)
//Edit contacts
router.put('/contacts/edit-contact/:id',adminProtect,contactController.editContact)

export default router;
