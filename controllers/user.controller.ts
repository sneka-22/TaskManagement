import type { Request, Response } from 'express';
import type {AuthRequest} from '../middlewares/auth.middleware'
const UserService=require('../services/user.service');
/**
 * getUserInfo - Get User info Controller
 * 
 * Purpose: Retrieves the  information of the authenticated user
 * 
 * Input:
 * - req.user: Authenticated user object (from auth middleware)
 * 
 * Response:
 * - Success 200: User profile object with id, username, email, phoneNumber, password
 * - Error 404: "User not found" if user doesn't exist
 * - Error 500: "Failed to fetch user profile" with error details
 */
const getUserInfo = async function(req:AuthRequest, res:Response) {
    const userId = req?.user?.id;
  try {
      const result = await UserService.getUserDetails(userId);
      if(result.fails)   return res.status(404).json({ message: result.fails });
    return res.status(200).json(result.rows);
  } catch (err) {
   return res.status(500).json({ message: 'Failed to fetch user Details', error: err });
  }
}
module.exports.getUserInfo=getUserInfo