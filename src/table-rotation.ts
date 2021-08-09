import path from 'path';
import { exit } from 'process';

import { parseStream } from '@fast-csv/parse';

import { ErrorHandler } from './__lib__/error/error.handler';
import { ERROR } from './__lib__/error/error.enum';
import { ErrorOptions } from './__lib__/error/error-options';

import { RotationService } from './__lib__/service/rotation.service';
import { Row } from './__lib__/row';

/**
 * Main function that accepts, validates, and rotates the table accordingly.
 * This then prints the output in the console. You also have the option to print
 * it in a file, such that `node table-rotation.js sample.csv > output.csv`
 * printing the result to output.csv file.
 * 
 * This also returns various error messages.
 */
const tableRotation = () => {
  try {
    // Throw the error right away when arguments exceed the allowed number
    if (process.argv.length > 3) {
      ErrorHandler.throw(ERROR.INVALID_NUMBER_OF_ARGUMENTS);
    }

    // Throw the error right away when filename is missing from the syntax
    if (process.argv[2] === undefined) {
      const errorOptions: ErrorOptions = {
        message: 'Please provide the filename as an argument. e.g. node table-rotation.js sample.csv'
      };
      ErrorHandler.throw(ERROR.INVALID_SYNTAX, errorOptions);
    }

    const filename = process.argv[2];
    const readStream = RotationService.getFile(path.join(__dirname, '/input/', filename));
    const parseStreamOptions = {
      headers: true,
      discardUnmappedColumns: false,
    };

    // Parse input CSV file and print the output
    const rows: Row[] = [];
    parseStream(readStream, parseStreamOptions)
      .on('error', (error) => {
        ErrorHandler.log(error, ERROR.INVALID_FILE);
      })
      .on('data', (csvData: any) => rows.push(csvData))
      .on('end', (rowLength: number) => {
        if (rowLength === 0) {
          console.log('The file is empty!');
          exit();
        }

        // Perform validation and table rotation
        const rotatedRows: Row[] = [];
        rows.forEach((row: Row) => {
          rotatedRows.push(RotationService.validateAndRotateTableData(row));
        });

        // Print the result to stream
        RotationService.writeToStream(rotatedRows);
        console.log('\n');
      });

  } catch (error) {
    ErrorHandler.log(error);
  }
};

export default tableRotation();
