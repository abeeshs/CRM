import asyncHandler from 'express-async-handler';
import Task from '../Model/taskModel.js';
import * as taskService from '../Services/taskService.js';
import multer from 'multer';

//--------------- View all tasks assigned to this user ---------------

export const getAllTask = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const allTask = await Task.find({ assigned_to: userId }).populate('created_by');
	if (allTask) {
		res.status(200).json(allTask);
	} else {
		res.status(400);
		throw new Error('Tasks not found');
	}
});

//--------------- Get pending task ---------------

export const getPendingTask = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const allTask = await Task.find({ assigned_to: userId, task_status: 'Pending' }).populate(
		'created_by'
	);
	if (allTask) {
		res.status(200).json(allTask);
	} else {
		res.status(400);
		throw new Error('Tasks not found');
	}
});

//--------------- Create new Task ---------------

export const createNewTask = asyncHandler(async (req, res) => {
	const { title, type, associated, assignedTo, dueDate, time, description, priority } = req.body;

	const taskDetails = {
		created_by: req.user._id,
		title: title,
		task_type: type,
		associated_with: associated ?? 'nill',
		assigned_to: assignedTo,
		priority: priority,
		due_date: dueDate,
		due_time: time,
		description: description
	};
	const newTask = await Task.create(taskDetails);
	if (newTask) {
		res.status(200).json({ message: 'Task created successfully' });
	} else {
		res.status(400);
		throw new Error('task creation failed');
	}
});

//--------------- Delete Task-------------
//Method- DELETE

export const deleteTask = asyncHandler(async (req, res) => {
	const taskId = req.params.id;
	const task = await Task.deleteOne({ _id: taskId });
	if (task) {
		res.status(200).json({ message: 'Task deleted succesfully' });
	} else {
		res.status(400);
		throw new Error('Task delete failed');
	}
});

//-------------Edit Task-------------------
//Method -PUT

export const editTask = asyncHandler(async (req, res) => {
	const taskID = req.params.id;
	const { title, type, associated, assignedTo, dueDate, time, description, priority } = req.body;
	const taskDetails = {
		userId: assignedTo,
		title: title,
		task_type: type,
		associated_with: associated,
		assigned_to: assignedTo,
		priority: priority,
		due_date: dueDate,
		due_time: time,
		description: description,
		created_by: req.user._id
	};
	const editTask = await Task.findByIdAndUpdate(taskID, taskDetails, {
		new: true
	});
	if (editTask) {
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(400);
		throw new Error('Task update failed');
	}
});

//------------------ Change Task Status --------------
//Method - Patch

export const changeTaskStatus = asyncHandler(async (req, res) => {
	const taskId = req.params.id;
	const { status } = req.body;
	const updateStatus = await Task.findByIdAndUpdate(taskId, { task_status: status }, { new: true });
	if (updateStatus) {
		res.status(200).json(updateStatus);
	} else {
		res.status(400);
		throw new Error('Tasks not found');
	}
});

export const aproveTask = asyncHandler(async (req, res) => {
	const taskId = req.params.id;
	const updateStatus = await Task.findByIdAndUpdate(
		taskId,
		{ task_status: 'Completed' },
		{ new: true }
	);
	if (updateStatus) {
		res.status(200).json(updateStatus);
	} else {
		res.status(400);
		throw new Error('Tasks not found');
	}
});

//--------- Get all compleated Task ------------
// Method- POSt
export const getAllCompletedTask = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const completedTask = await taskService.getCompletedTask(userId);
	if (completedTask) {
		res.status(200).json(completedTask);
	} else {
		res.status(400);
		throw new Error('Task not found/task is empty');
	}
});

//---------- Upload task documents ------------
//Mothod - POST
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

export const uploadTaskFile = asyncHandler(async (req, res) => {
	const taskId = req.params.id;
	const uploaded = await taskService.uploadTaskDocument(taskId, req.file.filename);
	if (uploaded) {
		res.status(200).json(uploaded);
	} else {
		res.status(400);
		throw new Error('dsgdgs');
	}
});
