import { ErrorOptions } from './error-options';
import { ERROR } from './error.enum';

// This is used to set the font color of the log to red
export const ErrorLogFontColor = '\x1b[31m%s\x1b[0m';

/**
 * This error handler throws various errors depending on the provided type and
 * error options (i.e. message, filename).
 */
export class ErrorHandler {

  /**
   * Logs the error provided and allows overriding original error name.
   * 
   * @param error 
   * @param name 
   */
  static log(error: Error, name?: ERROR) {
    const errorName = name ? name : error.name;
    console.error(ErrorLogFontColor, `${errorName}: ${error.message}`);
  }

  /**
   * Throws the error based on the provided error type and allows overriding original error message and/or name.
   * 
   * @param type 
   * @param options 
   */
  static throw(type?: ERROR, options?: ErrorOptions): Error {
    const error = new Error();

    switch(type) {
      case ERROR.FILE_NOT_FOUND:
        const filename = options?.filename ? options.filename : 'that you\'re trying to access';
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
      case ERROR.INVALID_SYNTAX:
        error.name = ERROR.INVALID_SYNTAX;
        error.message = options?.message ? `${options.message}` : 'The syntax that you provided cannot be processed by the system.';
        break;
      default:
        error.name = ERROR.DEFAULT;
        error.message = options?.message ? `${options.message}` : 'An unexpected error has occurred. Please try again.';
        break;
    }

    throw error;
  }
}
