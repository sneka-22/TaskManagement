var express = require('express');
const serverConfig = require('./config');
require('./dbconfig');
const passport = require("passport"); 
const authRoutes = require('./routes/auth.routes').Authrouter;
const taskRoutes = require('./routes/task.routes').router;
const userRoutes=require('./routes/user.routes').userRouter;
const app = express();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
app.use(express.json());
app.use(passport.initialize());
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Task Management API Documentation'
}));

app.listen(serverConfig.CONFIG.PORT, () => console.log(`Server running on port `, serverConfig.CONFIG.PORT));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/users',userRoutes);

app.get('/ping', () => {
    console.log("App running successfully");
});


