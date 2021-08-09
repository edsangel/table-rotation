import fs from 'fs';
import path from 'path';

import { ERROR } from '../error/error.enum';
import { ErrorHandler } from '../error/error.handler';

/**
 * Validates the provided filename and throws an error accordingly.
 * 
 * @param filename 
 */
export function validateFile(filename: string) {
  if (!filename) {
    const errorOptions = {
      message: 'Please provide the filename as an argument. e.g. node table-rotation.js sample.csv'
    };
    ErrorHandler.throw(ERROR.INVALID_SYNTAX, errorOptions);
  }

  if (filename && !filename.endsWith('.csv')) {
    ErrorHandler.throw(ERROR.INVALID_FILE);
  }

  if (!fs.existsSync(path.join(filename))) {
    const errorOptions = { filename: filename };
    ErrorHandler.throw(ERROR.FILE_NOT_FOUND, errorOptions);
  }
}

/**
 * Checks whether or not the length provided is a perfect square.
 * 
 * @param length 
 * @returns 
 */
export function isPerfectSquare(length: number) {
  return length > 0 && Math.sqrt(length) % 1 === 0;
}
