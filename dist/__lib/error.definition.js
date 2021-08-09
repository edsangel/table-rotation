"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.ErrorLogFontColor = exports.ERROR = void 0;
var ERROR;
(function (ERROR) {
    ERROR["FILE_NOT_FOUND"] = "FILE NOT FOUND";
    ERROR["INVALID_FILE"] = "INVALID FILE";
    ERROR["INVALID_NUMBER_OF_ARGUMENTS"] = "INVALID NUMBER OF ARGUMENTS";
    ERROR["INVALID_SYNTAX"] = "INVALID SYNTAX";
})(ERROR = exports.ERROR || (exports.ERROR = {}));
;
exports.ErrorLogFontColor = '\x1b[31m%s\x1b[0m';
/**
 * This error handler throws various errors depending on the provided type and
 * error options (i.e. message, filename).
 */
class ErrorHandler {
    static throw(type, options) {
        const error = new Error();
        switch (type) {
            case ERROR.FILE_NOT_FOUND:
                const filename = options && options.filename ? options.filename : 'that you\'re trying to access';
                error.name = ERROR.FILE_NOT_FOUND;
                error.message = `The file ${filename} was not found.`;
                break;
            case ERROR.INVALID_FILE:
                error.name = ERROR.INVALID_FILE;
                error.message = 'The file is invalid. Only .csv file format is allowed.';
                break;
            case ERROR.INVALID_NUMBER_OF_ARGUMENTS:
                error.name = ERROR.INVALID_NUMBER_OF_ARGUMENTS;
                error.message = 'Only one (1) argument is allowed.';
                break;
            default:
                error.name = ERROR.INVALID_SYNTAX;
                error.message = options && options.message ? `${options.message}` : 'An error has occurred. Please try again.';
                break;
        }
        throw error;
    }
}
exports.ErrorHandler = ErrorHandler;
