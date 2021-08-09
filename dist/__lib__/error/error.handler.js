"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.ErrorLogFontColor = void 0;
// This is used to set the font color of the log to red
exports.ErrorLogFontColor = '\x1b[31m%s\x1b[0m';
/**
 * This error handler throws various errors depending on the provided type and
 * error options (i.e. message, filename).
 */
class ErrorHandler {
    /**
     * Logs the error provided and allows overriding original error name.
     *
     * @param error
     * @param name
     */
    static log(error, name) {
        const errorName = name ? name : error.name;
        console.error(exports.ErrorLogFontColor, `${errorName}: ${error.message}`);
    }
    /**
     * Throws the error based on the provided error type and allows overriding original error message and/or name.
     *
     * @param type
     * @param options
     */
    static throw(type, options) {
        const error = new Error();
        switch (type) {
            case "FILE NOT FOUND" /* FILE_NOT_FOUND */:
                const filename = options?.filename ? options.filename : 'that you\'re trying to access';
                error.name = "FILE NOT FOUND" /* FILE_NOT_FOUND */;
                error.message = `The file ${filename} was not found.`;
                break;
            case "INVALID FILE" /* INVALID_FILE */:
                error.name = "INVALID FILE" /* INVALID_FILE */;
                error.message = 'The file is invalid. Only .csv file format is allowed.';
                break;
            case "INVALID NUMBER OF ARGUMENTS" /* INVALID_NUMBER_OF_ARGUMENTS */:
                error.name = "INVALID NUMBER OF ARGUMENTS" /* INVALID_NUMBER_OF_ARGUMENTS */;
                error.message = 'Only one (1) argument is allowed.';
                break;
            case "INVALID SYNTAX" /* INVALID_SYNTAX */:
                error.name = "INVALID SYNTAX" /* INVALID_SYNTAX */;
                error.message = options?.message ? `${options.message}` : 'The syntax that you provided cannot be processed by the system.';
                break;
            default:
                error.name = "ERROR" /* DEFAULT */;
                error.message = options?.message ? `${options.message}` : 'An unexpected error has occurred. Please try again.';
                break;
        }
        throw error;
    }
}
exports.ErrorHandler = ErrorHandler;
