import express from 'express';
const router = express.Router();
import *as userController from '../controller/userController.js'
import *as contactController from '../controller/contactController.js'
import *as taskController from '../controller/taskController.js'
import *as dealController from  '../controller/dealController.js'
import *as chatController from '../controller/chatController.js'
import *as meetingController from '../controller/meetingController.js'
import { userProtect } from '../middleware/authMiddleware.js';
import multer from 'multer'

// router.get('/',userController.userLogin)

//================== SIGNUP ================
router.post('/',userController.userLogin)
router.post ('/signup',userController.userRegister)
router.post('/signup-validate',userController.checkUserExist)
router.post('/signup/sent-otp',userController.sendEmailOtp)
router.post('/signup/verify-otp',userController.varifySignUpOtp)
router.post ('/logout',userController.userLogOut)
router.post ('/otp-login',userController.otpLogin)
router.post ('/varify-otp',userController.varifyOtp)


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

// ================= DEALS =======================

//View all deals
router.get('/deals',userProtect,dealController.getAllDeals)
//Create deals
router.post('/deals/create-deal',userProtect,dealController.addNewDeal)
//Update Deal
router.put('/deals/update-deal/:id',userProtect,dealController.updateDeal)

//================= CONVERSATION =======================

router.post('/conversation/chat',userProtect,chatController.createChat)
router.get('/conversation/chat',userProtect,chatController.getchats)
router.get('/conversation/users',userProtect,chatController.searchUser)
router.post('/conversation/message',userProtect,chatController.sendMessage)
router.get('/conversation/message/:chatId',userProtect,chatController.allMessage)

//================= MEETINGS =================
 router.get('/meetings',userProtect,meetingController.getAllMeetings)
router.post('/meetings/create-meeting',userProtect,meetingController.addNewMeeting)
router.delete('/meetings/delete-meeting/:id',userProtect,meetingController.deleteMeeting)
router.put('/meetings/update-meeting/:id',userProtect,meetingController.updateMeeting)

//================ PROFILE =================
router.get("/profile",userProtect,userController.getProfile)
router.put("/profile/edit-profile",userProtect,userController.editProfile)

export default router;