"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotationService = void 0;
const fast_csv_1 = require("fast-csv");
const fs_1 = __importDefault(require("fs"));
const validation_utils_1 = require("../utils/validation.utils");
const rotation_utils_1 = require("../utils/rotation.utils");
const row_1 = require("../row");
/**
 * This is the service that is being utilized in the main function that contains
 * functions to get the file, to validate and rotate the table data, and to write
 * the results to the console.
 */
class RotationService {
    /**
     * Vaidates and fetches the file based on the provided filename.
     *
     * @param filename
     * @returns
     */
    static getFile(filename) {
        validation_utils_1.validateFile(filename);
        return fs_1.default.createReadStream(filename);
    }
    /**
     * Writes the result of the rotation into the console.
     *
     * @param rows
     */
    static writeToStream(rows) {
        const csvStream = fast_csv_1.format({ headers: true, quoteColumns: { json: true }, quoteHeaders: false });
        csvStream.pipe(process.stdout).on('end', () => process.exit(0));
        rows.forEach(row => csvStream.write(row));
    }
    /**
     * Validates and rotates the table data of the provided rows.
     *
     * @param row
     * @returns
     */
    static validateAndRotateTableData(row) {
        let numArray = [];
        try {
            numArray = JSON.parse(row.json);
        }
        catch (e) {
            return new row_1.Row(row.id, row.json, false);
        }
        if (numArray.length === 1) {
            return new row_1.Row(row.id, numArray, true);
        }
        else if (validation_utils_1.isPerfectSquare(numArray.length)) {
            const matrix = rotation_utils_1.splitArray(numArray); // Splits the array into chunks a.k.a. table rows
            const rotatedTable = rotation_utils_1.rotate(matrix); // Rotates the table cell once clockwise
            // Flatten the arrays
            let concatArray = [];
            rotatedTable.forEach((item) => (concatArray = concatArray.concat(item)));
            return new row_1.Row(row.id, concatArray, true);
        }
        else {
            return new row_1.Row(row.id, [], false);
        }
    }
}
exports.RotationService = RotationService;
