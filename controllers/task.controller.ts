const TaskService = require('../services/task.service');
import type { Request, Response } from 'express';
import type {AuthRequest} from '../middlewares/auth.middleware'

/**
 * createTask - Create New Task Controller
 * 
 * Purpose: Creates a new task for the authenticated user
 * 
 * Input:
 * - req.body: Task data (title, description, dueDate, status)
 * - req.user: Authenticated user object (from auth middleware)
 * 
 * Response:
 * - Success 201: Newly created task object
 * - Error 500: "Failed to create task" with error details
 */
const createTask = async function(req:AuthRequest, res:Response) {
  const userId = req?.user?.id;
  try {
      const result = await TaskService.createTaskService(req.body, userId);
  
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create task', error: err });
  }
}

/**
 * getTasks - Get All Tasks Controller
 * 
 * Purpose: Retrieves all tasks for the authenticated user with optional filtering
 * 
 * Input:
 * - req.query: Optional query parameters for filtering (status, due_date)
 * - req.user: Authenticated user object (from auth middleware)
 * 
 * Response:
 * - Success 201: Array of task objects
 * - Error 500: "Failed to fetch all task" with error details
 */
const getTasks = async function(req:AuthRequest, res:Response) {
    const userId = req?.user?.id;
  try {
      const result = await TaskService.getTasksService(req?.query, userId);
    return res.status(200).json(result.rows);
  } catch (err) {
   return res.status(500).json({ message: 'Failed to fetch all task', error: err });
  }
}

/**
 * getTaskById - Get Single Task Controller
 * 
 * Purpose: Retrieves a specific task by ID for the authenticated user
 * 
 * Input:
 * - req.params.id: Task ID
 * - req.user: Authenticated user object (from auth middleware)
 * 
 * Response:
 * - Success 200: Task object
 * - Error 404: "Task not found" if task doesn't exist
 * - Error 500: "Failed to fetch task" with error details
 */
const getTaskById = async function(req:AuthRequest, res:Response) {
    const userId = req?.user?.id;
  try {
      const result = await TaskService.getTaskByIdService(req.params.id, userId);
      const task = result.rows[0];
    if (!task) return res.status(404).json({ message: 'Task not found' });
   return  res.json(task);

  } catch (err) {
   return res.status(500).json({ message: 'Failed to fetch task', error: err });
  }
}

/**
 * updateTask - Update Task Controller
 * 
 * Purpose: Updates an existing task for the authenticated user
 * 
 * Input:
 * - req.params.id: Task ID
 * - req.body: Updated task data (title, description, dueDate, status)
 * - req.user: Authenticated user object (from auth middleware)
 * 
 * Response:
 * - Success 200: Updated task object
 * - Error 404: "Task not found" if task doesn't exist
 * - Error 500: "Failed to Update task" with error details
 */
const updateTask = async function(req:AuthRequest, res:Response) {
     const userId = req?.user?.id;
  try {
      const result = await TaskService.updateTaskService(req.params.id, req.body, userId);
    if (result?.fails) return res.status(404).json({ message: 'Task not found' });
    return res.json(result.rows[0]);

  } catch (err) {
  return  res.status(500).json({ message: 'Failed to Update task', error: err });
  }
}

/**
 * completeTask - Mark Task Complete Controller
 * 
 * Purpose: Marks a task as completed for the authenticated user
 * 
 * Input:
 * - req.params.id: Task ID
 * - req.user: Authenticated user object (from auth middleware)
 * - req.body: task status
 * 
 * Response:
 * - Success 200: Updated task object with completed status
 * - Error 404: "Task not found" if task doesn't exist
 * - Error 500: "Error marking complete" with error details
 */
const completeTask = async function(req:AuthRequest, res:Response) {
  try{
    const result = await TaskService.completeTaskService(req?.params?.id,req.body, req?.user?.id);
     if (result?.fails) return res.status(404).json({ message: 'Task not found' });
    return  res.json({"success":true}); 
  } catch(err) {
    return res.status(500).json({ message: 'Error marking complete', error: err });
  }
}

/**
 * deleteTask - Delete Task Controller
 * 
 * Purpose: Deletes a task for the authenticated user
 * 
 * Input:
 * - req.params.id: Task ID
 * - req.user: Authenticated user object (from auth middleware)
 * 
 * Response:
 * - Success 200: Deleted task object
 * - Error 404: "Task not found" if task doesn't exist
 * - Error 500: "Error deleting task" with error details
 */
const deleteTask = async function(req:AuthRequest, res:Response) {
    try{
    const result = await TaskService.deleteTaskService(req?.params?.id, req?.user?.id);
     if (result?.fails) return res.status(404).json({ message: 'Task not found' });
    return  res.json(result.rows[0]); 
  } catch(err) {
   return  res.status(500).json({ message: 'Error deleting task', error: err });
  }
}

module.exports = {
    createTask, getTasks, getTaskById, updateTask, completeTask, deleteTask
};