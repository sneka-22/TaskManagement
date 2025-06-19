const AuthService=require('../services/auth.service');
import type { Request, Response } from 'express';
const controllerConfig = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../dbconfig').pool;

/**
 * signup - User Registration Controller
 * 
 * Purpose: Creates a new user account with hashed password
 * 
 * Input:
 * - req.body: { username: string, password: string ,email:string,phoneNumber:string}
 * 
 * Response:
 * - Success 201: New user object with id and username
 * - Error 500: "Signup error" with error details
 */
const signup = async function(req:Request, res:Response)  {
  try {
    const body:{username:string,password:string,email:string,phoneNumber:string}={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        phoneNumber: req.body.phoneNumber
    }
  const result= await AuthService.signupservice(body);
    if(result.fails)
  {
     return res.status(401).json({ message: result.fails});
  }
    return res.status(201).json(result.rows[0]);
  } catch (err:any) {
    return res.status(500).json({ message: 'Signup error', error: err.message });
  }
};

/**
 * login - User Authentication Controller
 * 
 * Purpose: Authenticates user credentials and returns JWT token
 * 
 * Input:
 * - req.body: { username: string, password: string }
 * 
 * Response:
 * - Success 200: { token: string } - JWT token for authentication
 * - Error 401: "Invalid credentials" if username/password incorrect
 * - Error 500: "login error" with error details
 */
const login = async function(req:Request, res:Response) {
  try {
    const body:{username:string,password:string}={
        username:req.body.username,
        password:req.body.password
    }
  const token = await AuthService.loginService(body);
  if(token.fails)
  {
     return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({ token });
    
  } catch (err:any) {
    return res.status(500).json({ message: 'login error', error: err.message });
  }
};

module.exports ={
    signup,login
}
