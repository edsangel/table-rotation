
export enum ERROR {
  FILE_NOT_FOUND = 'FILE NOT FOUND',
  INVALID_FILE = 'INVALID FILE',
  INVALID_NUMBER_OF_ARGUMENTS = 'INVALID NUMBER OF ARGUMENTS',
  INVALID_SYNTAX = 'INVALID SYNTAX'
};

export const ErrorLogFontColor = '\x1b[31m%s\x1b[0m';

export interface ErrorOptions {
  message?: string;
  filename?: string;
}

/**
 * This error handler throws various errors depending on the provided type and
 * error options (i.e. message, filename).
 */
export class ErrorHandler {
  static throw(type: ERROR, options?: ErrorOptions): Error {
    const error = new Error();

    switch(type) {
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
