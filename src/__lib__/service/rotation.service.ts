import { format } from 'fast-csv';
import fs from 'fs';

import { validateFile, isPerfectSquare } from '../utils/validation.utils';
import { rotate, splitArray  } from '../utils/rotation.utils';
import { Row } from '../row';

/**
 * This is the service that is being utilized in the main function that contains
 * functions to get the file, to validate and rotate the table data, and to write
 * the results to the console.
 */
export class RotationService {
  /**
   * Vaidates and fetches the file based on the provided filename.
   * 
   * @param filename 
   * @returns 
   */
  static getFile(filename: string): fs.ReadStream {
    validateFile(filename);
    return fs.createReadStream(filename);
  }

  /**
   * Writes the result of the rotation into the console.
   * 
   * @param rows 
   */
  static writeToStream(rows: any[]) {
    const csvStream = format({ headers: true, quoteColumns: { json: true }, quoteHeaders: false });
    csvStream.pipe(process.stdout).on('end', () => process.exit(0));
    rows.forEach(row => csvStream.write(row));
  }

  /**
   * Validates and rotates the table data of the provided rows.
   * 
   * @param row 
   * @returns 
   */
  static validateAndRotateTableData(row: Row) {
    let numArray: any[] = [];

    try {
      numArray = JSON.parse(row.json);
    } catch (e) {
      return new Row(row.id, [], false);
    }

    if (numArray.length === 1) {
      return new Row(row.id, numArray, true);
    } else if (isPerfectSquare(numArray.length)) {
      const matrix = splitArray(numArray); // Splits the array into chunks a.k.a. table rows
      const rotatedTable = rotate(matrix); // Rotates the table cell once clockwise

      // Flatten the arrays
      let concatArray: any[] = [];
      rotatedTable.forEach((item) => (concatArray = concatArray.concat(item)));

      return new Row(row.id, concatArray, true);
    } else {
      return new Row(row.id, [], false);
    }
  }
}
