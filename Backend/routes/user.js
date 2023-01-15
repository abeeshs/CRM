import express from 'express';
const router = express.Router();
import *as userController from '../controller/userController.js'
import *as contactController from '../controller/contactController.js'
import *as taskController from '../controller/taskController.js'
import { userProtect } from '../middleware/authMiddleware.js';
import multer from 'multer'
// router.get('/',userController.userLogin)
router.post('/',userController.userLogin)
router.post ('/signup',userController.userRegister)
router.post ('/logout',userController.userLogOut)
//==================== TASK =====================

//View task
router.get('/task',userProtect,taskController.getAllTask)
//pending task
router.get('/task/pending-task',userProtect,taskController.getPendingTask)
//completed task
router.get('/task/completed-task',userProtect,taskController.getAllCompletedTask)

//Create tasks
router.post('/task/add-task',taskController.createNewTask);
//Delete Task
router.delete('/task/delete-task/:id',taskController.deleteTask);
//Edit Task
router.put('/task/edit-task/:id',taskController.editTask);

//Change Task Status
router.put('/task/change-status/:id',userProtect,taskController.changeTaskStatus)
//Upload file
const storage=multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'public')
	},
	filename:(req,file,cb)=>{
		cb(null,Date.now()+'-'+file.originalname)
	}
})
 const upload = multer({storage})
router.post('/task/upload-file/:id',userProtect,upload.single('file'),taskController.uploadTaskFile)


//================== CONTACTS ====================

//view -Contacts
router.get('/contacts',userProtect,contactController.getAllContact)
//create contacts
router.post('/contacts/add-contact',userProtect,contactController.addNewContact)
//delete contacts
router.delete('/contacts/delete-contact/:id',contactController.deleteContact)
//Edit contacts
router.put('/contacts/edit-contact/:id',userProtect,contactController.editContact)

// ================= USERS =======================

//view all users
router.get('/users',userProtect,userController.viewAllUser)
//Edit contacts
router.put('/contacts/edit-contact/:id',userProtect,contactController.editContact)

export default router;