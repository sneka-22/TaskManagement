import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * validationMiddleware - Request Body Validation Middleware
 * 
 * Purpose: Validates incoming request bodies against DTO classes using class-validator
 * 
 * Input:
 * - dtoClass: The DTO class to validate against (e.g., SignupDto, CreateTaskDto)
 * - req: Express request object with body to validate
 * - res: Express response object
 * - next: Express next function
 * 
 * Response:
 * - Success: Calls next() with validated and transformed data in req.body
 * - Error 400: Validation errors with field names and constraints
 * - Error 400: "Invalid request data" if transformation fails
 */
const validationMiddleware = (dtoClass: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      const dtoObject = plainToClass(dtoClass, req.body);
      const errors = await validate(dtoObject);
      
      if (errors.length > 0) {
        const validationErrors = errors.map((error: any) => ({
          field: error.property,
          constraints: error.constraints
        }));
        
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationErrors
        });
      }
      
      req.body = dtoObject;
      return next();
    } catch (error: any) {
      return res.status(400).json({
        message: 'Invalid request data',
        error: error.message
      });
    }
  };
};

module.exports = { validationMiddleware }; 