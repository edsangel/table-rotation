"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const parse_1 = require("@fast-csv/parse");
const error_handler_1 = require("./__lib__/error/error.handler");
const rotation_service_1 = require("./__lib__/service/rotation.service");
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
            error_handler_1.ErrorHandler.throw("INVALID NUMBER OF ARGUMENTS" /* INVALID_NUMBER_OF_ARGUMENTS */);
        }
        // Throw the error right away when filename is missing from the syntax
        if (process.argv[2] === undefined) {
            const errorOptions = {
                message: 'Please provide the filename as an argument. e.g. node table-rotation.js sample.csv'
            };
            error_handler_1.ErrorHandler.throw("INVALID SYNTAX" /* INVALID_SYNTAX */, errorOptions);
        }
        const filename = process.argv[2];
        const readStream = rotation_service_1.RotationService.getFile(path_1.default.join(__dirname, '/input/', filename));
        const parseStreamOptions = {
            headers: true,
            discardUnmappedColumns: false,
        };
        // Parse input CSV file and print the output
        const rows = [];
        parse_1.parseStream(readStream, parseStreamOptions)
            .on('error', (error) => {
            error_handler_1.ErrorHandler.log(error, "INVALID FILE" /* INVALID_FILE */);
        })
            .on('data', (csvData) => rows.push(csvData))
            .on('end', (rowLength) => {
            if (rowLength === 0) {
                console.log('The file is empty!');
                process_1.exit();
            }
            // Perform validation and table rotation
            const rotatedRows = [];
            rows.forEach((row) => {
                rotatedRows.push(rotation_service_1.RotationService.validateAndRotateTableData(row));
            });
            // Print the result to stream
            rotation_service_1.RotationService.writeToStream(rotatedRows);
            console.log('\n');
        });
    }
    catch (error) {
        error_handler_1.ErrorHandler.log(error);
    }
};
exports.default = tableRotation();
