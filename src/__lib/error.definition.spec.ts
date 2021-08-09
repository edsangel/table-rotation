import { ERROR, ErrorHandler } from './error.definition';

describe('Unit Test: ErrorHandler', () => {
  describe('FILE_NOT_FOUND error', () => {
    it('should include the filename when provided', () => {
      const expectedError = new Error();
      expectedError.name = ERROR.FILE_NOT_FOUND;
      expectedError.message = 'The file foo.bar was not found.';
      expect(() => ErrorHandler.throw(ERROR.FILE_NOT_FOUND, { filename: 'foo.bar' })).toThrowError(expectedError);
    });

    it('should throw generic message', () => {
      const expectedError = new Error();
      expectedError.name = ERROR.FILE_NOT_FOUND;
      expectedError.message = 'The file that you\'re trying to access was not found.';
      expect(() => ErrorHandler.throw(ERROR.FILE_NOT_FOUND)).toThrowError(expectedError);
    });
  });

  it('should throw INVALID_FILE error', () => {
    const expectedError = new Error();
    expectedError.name = ERROR.INVALID_FILE;
    expectedError.message = 'The file is invalid. Only .csv file format is allowed.';
    expect(() => ErrorHandler.throw(ERROR.INVALID_FILE)).toThrowError(expectedError);
  });

  it('should throw INVALID_NUMBER_OF_ARGUMENTS error', () => {
    const expectedError = new Error();
    expectedError.name = ERROR.INVALID_NUMBER_OF_ARGUMENTS;
    expectedError.message = 'Only one (1) argument is allowed.';
    expect(() => ErrorHandler.throw(ERROR.INVALID_NUMBER_OF_ARGUMENTS)).toThrowError(expectedError);
  });

  describe('INVALID_SYNTAX error', () => {
    it('should throw error with the override message', () => {
      const expectedError = new Error();
      expectedError.name = ERROR.FILE_NOT_FOUND;
      expectedError.message = 'The error message has been overridden.';
      expect(() => ErrorHandler.throw(ERROR.INVALID_SYNTAX, { message: 'The error message has been overridden.' })).toThrowError(expectedError);
    });

    it('should throw generic message', () => {
      const expectedError = new Error();
      expectedError.name = ERROR.FILE_NOT_FOUND;
      expectedError.message = 'An error has occurred. Please try again.';
      expect(() => ErrorHandler.throw(ERROR.INVALID_SYNTAX)).toThrowError(expectedError);
    });
  });
});
