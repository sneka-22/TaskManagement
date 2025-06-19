# Task Management API

A comprehensive RESTful API for managing tasks with user authentication, built with Node.js, Express, and PostgreSQL.

##  Tech Stack & Tools Used

### **Backend Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js

### **Authentication & Security**
- **Passport.js** - Authentication middleware
- **JWT (JSON Web Tokens)** - Stateless authentication
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT token generation/verification

### **Validation & Documentation**
- **class-validator** - Request validation using decorators
- **class-transformer** - Object transformation
- **Swagger/OpenAPI 3.x** - API documentation
- **swagger-jsdoc** - JSDoc to OpenAPI specification
- **swagger-ui-express** - Interactive API documentation

### **Development Tools**
- **nodemon** - Development server with auto-restart
- **ts-node** - TypeScript execution engine
- **dotenv** - Environment variable management

##  Authentication Flow

### **1. User Registration**
```http
POST /auth/signup
Body: { username, password, email, phoneNumber }
→ Validates input using class-validator
→ Hashes password with bcrypt
→ Creates user in database
→ Returns user object (201)
```

### **2. User Login**
```http
POST /auth/login
Body: { username, password }
→ Validates credentials
→ Compares password hash
→ Generates JWT token
→ Returns token (200)
```

### **3. Protected Route Access**
```http
Request with Authorization: Bearer <JWT_TOKEN>
→ Passport JWT strategy validates token
→ Extracts user data from token payload
→ Attaches user to request object
→ Allows access to protected routes
```

### **4. Middleware Chain**
```http
Request → Validation Middleware → Auth Middleware → Controller → Service → Response
```

##  Task Lifecycle

### **Task States**
1. **pending** - Newly created task
2. **in_progress** - Task being worked on
3. **completed** - Task finished

### **CRUD Operations**
- **CREATE** - `POST /tasks` (requires auth)
- **READ** - `GET /tasks` and `GET /tasks/:id` (requires auth)
- **UPDATE** - `PUT /tasks/:id` (requires auth)
- **DELETE** - `DELETE /tasks/:id` (requires auth)
- **STATUS UPDATE** - `PATCH /tasks/:id/complete` (requires auth)

### **Task Filtering**
- Filter by status: `GET /tasks?status=pending`
- Filter by due date: `GET /tasks?due_date=2024-01-15`
- Combined filters: `GET /tasks?status=completed&due_date=2024-01-15`

##  Route Grouping Explanation

### **Authentication Routes** (`/auth`)
```http
POST /auth/signup - User registration
POST /auth/login  - User authentication
```
- **Purpose**: Handle user account creation and authentication
- **Validation**: Uses DTOs with class-validator
- **Security**: Password hashing, JWT generation

### **Task Routes** (`/tasks`)
```http
GET    /tasks           - Get all user tasks
POST   /tasks           - Create new task
GET    /tasks/:id       - Get specific task
PUT    /tasks/:id       - Update task
PATCH  /tasks/:id/complete - Mark task complete
DELETE /tasks/:id       - Delete task
```
- **Purpose**: Full CRUD operations for tasks
- **Authentication**: All routes protected with JWT
- **Validation**: Request body validation for create/update

### **User Routes** (`/users`)
```http
GET /users/me - Get current user profile
```
- **Purpose**: User profile management
- **Authentication**: Protected with JWT
- **Scope**: User can only access their own profile

## Assumptions & Limitations

### **Assumptions**
1. **Single User per Task**: Each task belongs to one user
2. **JWT Token Storage**: Client stores JWT in localStorage/sessionStorage
3. **Database Connection**: PostgreSQL server is running and accessible
4. **Environment Variables**: Required env vars are properly configured
5. **Request Format**: All requests use JSON content-type

### **Limitations**
1. **No Role-Based Access**: All authenticated users have same permissions
2. **No Task Sharing**: Tasks cannot be shared between users
3. **No File Attachments**: Tasks don't support file uploads
4. **No Search**: No full-text search functionality
5. **No Email Verification**: No email confirmation for registration
6. **No Password Reset**: No forgot password functionality

### **Security Considerations**
- JWT tokens don't expire (should implement refresh tokens)
- No rate limiting implemented
- No input sanitization beyond validation
- No CORS configuration

##  Setup Instructions

### **Prerequisites**
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### **1. Clone Repository**
```bash
git clone <repository-url>
cd TaskManagement
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Configuration**
Create `.env` file in root directory:
```env
Port=3000
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=8640000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-db-password
DB_NAME=taskManagement
```

### **4. Database Setup**
```sql
CREATE DATABASE taskManagement;
-- Connect and run schema (assumed separately provided
)
```
```
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) UNIQUE NOT NULL,
password TEXT NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
phone_number VARCHAR(100)

);
```
```
CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
status VARCHAR(20) DEFAULT 'pending',
due_date DATE,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

### **5. Start Development Server**
```bash
npm start
```

### **6. Access API Documentation**
Navigate to: `https://taskmanagement-tyk1.onrender.com/api-docs/#/`

##  Project Structure
```
TaskManagement/
├── config/
│   ├── swagger.ts
│   └── config.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── task.controller.ts
│   └── user.controller.ts
├── dto/
│   ├── auth.dto.ts
│   └── task.dto.ts
├── middlewares/
│   ├── auth.middleware.ts
│   └── validation.middleware.ts
├── routes/
│   ├── auth.routes.ts
│   ├── task.routes.ts
│   └── user.routes.ts
├── services/
│   ├── auth.service.ts
│   ├── task.service.ts
│   └── user.service.ts
├── dbconfig.ts
├── index.ts
├── package.json
└── tsconfig.json
```

## Testing the API

### **1. Register a User**
```bash
curl -X POST http://localhost:3000/auth/signup   -H "Content-Type: application/json"   -d '{"username":"testuser","password":"password123","email":"test@example.com","phoneNumber":"1234567890"}'
```

### **2. Login and Get Token**
```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"username":"testuser","password":"password123"}'
```

### **3. Create a Task (with token)**
```bash
curl -X POST http://localhost:3000/tasks   -H "Content-Type: application/json"   -H "Authorization: Bearer YOUR_JWT_TOKEN"   -d '{"title":"Complete project","description":"Finish the task management API","status":"pending"}'
```

## API Documentation
- **Interactive Documentation**: `http://localhost:3000/api-docs`
- **OpenAPI Spec**: Generated from JSDoc
- **Try It Out**: Built-in in Swagger UI

## Development

### **Available Scripts**
- `npm start` - Start dev server with nodemon
- `npm run build` - Compile TypeScript
- `npm test` - Run tests (not implemented)


---


