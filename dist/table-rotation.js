"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const parse_1 = require("@fast-csv/parse");
const error_definition_1 = require("./__lib/error.definition");
const rotation_utils_1 = require("./__lib/rotation.utils");
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
            error_definition_1.ErrorHandler.throw(error_definition_1.ERROR.INVALID_NUMBER_OF_ARGUMENTS);
        }
        const filename = process.argv[2];
        const readStream = rotation_utils_1.RotationUtils.getFile(path_1.default.join(__dirname, '/input/', filename));
        const parseStreamOptions = {
            headers: true,
            discardUnmappedColumns: false,
        };
        // Parse input CSV file and print the output
        let rows = [];
        parse_1.parseStream(readStream, parseStreamOptions)
            .on('error', (error) => {
            console.error(error_definition_1.ErrorLogFontColor, error.message);
        })
            .on('data', (data) => rows.push(data))
            .on('end', (rowLength) => {
            if (rowLength === 0) {
                console.log('The file is empty');
                process_1.exit();
            }
            const rotatedRows = [];
            rows.forEach((row) => {
                rotatedRows.push(rotation_utils_1.RotationUtils.validateAndRotateTableData(row));
            });
            rotation_utils_1.RotationUtils.writeToStream(rotatedRows);
            console.log('\n');
        });
    }
    catch (error) {
        console.error(error_definition_1.ErrorLogFontColor, `${error.type}: ${error.message}`);
    }
};
exports.default = tableRotation();
