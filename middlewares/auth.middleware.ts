const jsonwebtoken = require('jsonwebtoken');
import type { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

/**
 * authMiddleware - JWT Token Authentication Middleware
 * 
 * Purpose: Validates JWT tokens from Authorization header and attaches user data to request
 * 
 * Input:
 * - req: Express request object with Authorization header
 * - res: Express response object
 * - next: Express next function
 * 
 * Response:
 * - Success: Calls next() with user data attached to req.user
 * - Error 401: "Missing or invalid token" if no Bearer token
 * - Error 403: "Invalid token" if JWT verification fails
 */
const authMiddleware = (req:AuthRequest, res:Response, next:any):any => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded ;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { authMiddleware };