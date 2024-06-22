import 'express-async-errors';
import express from 'express';
import routes from './routes.js';
import security from './configs/security.js';
import errorHandler from './middlewares/error-handler.js';
import setupHttpRequestLogs from './configs/request-logs.js';

const app = express();

/** Setup Requests Logs */
setupHttpRequestLogs(app);

/** Setup Data Parsing */
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

/** Setup Security Middlewares */
app.use(security.RateLimiter);
app.use(security.SecureHTTPHeaders);
app.use(security.CORSProtection);

/** Setup Application routes */
app.use('/', routes);

/** Setup Error Handling */
app.use(errorHandler.FileNotFoundErrorHandler);
app.use(errorHandler.ApplicationErrorHandler);

export default app;
