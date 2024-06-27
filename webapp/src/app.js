import 'express-async-errors';
import express from 'express';
import routes from './routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csrf from 'csurf';
import security from './configs/security.js';
import errorHandler from './middlewares/error-handler.js';
import setupViewTemplateEngine from './configs/views.js';
import setupApplicationAssets from './configs/assets.js';
import requestUtils from './middlewares/request-utils.js';
import setupHttpRequestLogs from './configs/request-logs.js';

const app = express();

/** Setup Local Variables */
app.use(requestUtils.setupLocalVariables);

/** Setup Requests Logs */
setupHttpRequestLogs(app);

/** Setup Static Assets (ex. CSS, Javascript, Images files, etc...) */
setupApplicationAssets(app);

/** Serve static files */
app.use(express.static('public'));

/** Setup View Engine */
setupViewTemplateEngine(app);

/** Setup Data Parsing */
app.use(cookieParser()); // Parse Cookie header and populate req.cookies
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

const secretKey = process.env.SESSION_SECRET;
/** Setup Session */
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt thành true nếu bạn sử dụng HTTPS
}));
/** Setup CSRF Protection */
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

/** Setup Security Middlewares */
app.use(security.RateLimiter);
app.use(security.SecureHTTPHeaders);
app.use(security.CORSProtection);
app.use(security.CSRFProtection);

/** Setup Utility Middlewares */
app.use(requestUtils.isAjax);
app.use(requestUtils.setCSRFToken);

/** Setup Application routes */
app.use('/', routes);

/** Setup Error Handling */
app.use(errorHandler.FileNotFoundErrorHandler);
app.use(errorHandler.ApplicationErrorHandler);

export default app;
