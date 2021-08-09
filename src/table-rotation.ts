import path from 'path';
import { exit } from 'process';

import { parseStream } from '@fast-csv/parse';

import { ERROR, ErrorHandler, ErrorLogFontColor } from './__lib/error.definition';
import { RotationUtils } from './__lib/rotation.utils';
import { Row } from './__lib/row';

/**
 * Main function that accepts, validates, and rotates the table accordingly.
 * This then prints the output in the console. You also have the option to print
 * it in a file, such that `node table-rotation.js sample.csv > output.csv
 * printing the result to output.csv file.
 * 
 * This also returns various error messages.
 */
const tableRotation = () => {
  try {
    if (process.argv.length > 3) {
      ErrorHandler.throw(ERROR.INVALID_NUMBER_OF_ARGUMENTS);
    }

    const filename = process.argv[2];
    const readStream = RotationUtils.getFile(path.join(__dirname, '/input/', filename));
    const parseStreamOptions = {
      headers: true,
      discardUnmappedColumns: false,
    };

    // Parse input CSV file and print the output
    let rows: Row[] = [];
    parseStream(readStream, parseStreamOptions)
      .on('error', (error) => {
        console.error(ErrorLogFontColor, error.message);
      })
      .on('data', (data: any) => rows.push(data))
      .on('end', (rowLength: number) => {
        if (rowLength === 0) {
          console.log('The file is empty');
          exit();
        }

        const rotatedRows: Row[] = [];
        rows.forEach((row: Row) => {
          rotatedRows.push(RotationUtils.validateAndRotateTableData(row));
        });
        RotationUtils.writeToStream(rotatedRows);
        console.log('\n');
      });
  } catch (error) {
    console.error(ErrorLogFontColor, `${error.type}: ${error.message}`);
  }
};

export default tableRotation();
