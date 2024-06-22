import logger from '../configs/logger.js';

/**
 * Error handler middleware
 *
 * The ErrorHandler middleware is used to manage all errors in one place,
 * making it easier to fix issues and keep the code organized.
 *
 * It logs detailed information about errors, which helps developers understand and solve problems quickly.
 * The middleware also ensures that users receive appropriate and friendly error messages,
 * whether they are making an AJAX request or just browsing the site, without exposing any technical details.
 *
 * It checks to make sure that no changes are made to a response once it has started being sent to the client,
 * preventing further errors.
 *
 * By handling errors consistently and securely,
 * the ErrorHandler makes the application more reliable and protects it from potential security threats.
 *
 * @see https://expressjs.com/en/guide/error-handling.html
 */
const ApplicationErrorHandler = (err, req, res) => {
    logger.error(err.message, { stack: err.stack });

    return res.status(500).json({
        message: req.message || 'Server Error',
    });
};

/**
 * File not-found Error handler middleware
 *
 * The FileNotFoundErrorHandler middleware is used to handle 404 errors.
 * This occurs when a user tries to access a page that does not exist.
 */
const FileNotFoundErrorHandler = (req, res) => {
    return res.status(404).json({
        message: 'Not Found',
    });
};

export default {
    ApplicationErrorHandler,
    FileNotFoundErrorHandler,
};
