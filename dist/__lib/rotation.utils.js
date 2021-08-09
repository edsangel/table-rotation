"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotationUtils = void 0;
const fast_csv_1 = require("fast-csv");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const error_definition_1 = require("./error.definition");
/**
 * Validates the provided filename and throws an error accordingly.
 *
 * @param filename
 */
function validateFile(filename) {
    if (!filename) {
        const errorOptions = {
            message: 'Please provide the filename as an argument. e.g. node table-rotation.js sample.csv'
        };
        error_definition_1.ErrorHandler.throw(error_definition_1.ERROR.INVALID_SYNTAX, errorOptions);
    }
    if (filename && !filename.endsWith('.csv')) {
        error_definition_1.ErrorHandler.throw(error_definition_1.ERROR.INVALID_FILE);
    }
    if (!fs.existsSync(path.join(filename))) {
        const errorOptions = { filename: filename };
        error_definition_1.ErrorHandler.throw(error_definition_1.ERROR.FILE_NOT_FOUND, errorOptions);
    }
}
/**
 * Checks whether or not the length provided is a perfect square
 *
 * @param length
 * @returns
 */
function isPerfectSquare(length) {
    return length > 0 && Math.sqrt(length) % 1 === 0;
}
/**
 * Splits the array into chunks depending on its size and returns
 * and new two-dimensional array.
 *
 * @param array
 * @returns
 */
function splitArray(array) {
    const newArray = [];
    const chunk = Math.sqrt(array.length);
    for (let i = 0; i < array.length; i += chunk) {
        const arr = array.slice(i, i + chunk);
        newArray.push(arr);
    }
    return newArray;
}
/**
 * Rotates the two-dimensional array's values and returns the rotated
 * values.
 *
 * @param matrix
 * @returns
 */
function rotate(matrix) {
    const newMatrix = matrix.map((arr) => arr.slice());
    const mLength = matrix.length;
    const sequence = Math.floor(mLength / 2);
    const mLimit = mLength - 1;
    for (let i = 0; i < sequence; i++) {
        const boundary = mLimit - i;
        let bBound = boundary;
        // Manage the first four corners
        newMatrix[i][i] = matrix[i + 1][i];
        newMatrix[i][boundary] = matrix[i][boundary - 1];
        newMatrix[boundary][i] = matrix[boundary][i + 1];
        newMatrix[boundary][boundary] = matrix[boundary - 1][boundary];
        if (mLength > 2) {
            for (let j = i; j < boundary - 1; j++) {
                bBound--;
                newMatrix[i][j + 1] = matrix[i][j];
                newMatrix[j + 1][boundary] = matrix[j][boundary];
                newMatrix[bBound][i] = matrix[mLimit - j][i];
                newMatrix[boundary][bBound] = matrix[boundary][mLimit - j];
            }
        }
    }
    return newMatrix;
}
/**
 * Converts the provided data into a Row object.
 *
 * @param id
 * @param json
 * @param is_valid
 * @returns
 */
function convertToRowObject(id, json, is_valid) {
    const rowObj = {
        id: id,
        json: JSON.stringify(json),
        is_valid: is_valid
    };
    return rowObj;
}
class RotationUtils {
    /**
     * Vaidates and fetches the file based on the provided filename.
     *
     * @param filename
     * @returns
     */
    static getFile(filename) {
        validateFile(filename);
        return fs.createReadStream(filename);
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
            return convertToRowObject(row.id, row.json, false);
        }
        if (numArray.length === 1) {
            return convertToRowObject(row.id, numArray, true);
        }
        else if (isPerfectSquare(numArray.length)) {
            const matrix = splitArray(numArray); // Splits the array into chunks a.k.a. table rows
            const rotatedTable = rotate(matrix); // Rotates the table cell once clockwise
            // Flatten the arrays
            let concatArray = [];
            rotatedTable.forEach((item) => (concatArray = concatArray.concat(item)));
            return convertToRowObject(row.id, concatArray, true);
        }
        else {
            return convertToRowObject(row.id, [], false);
        }
    }
}
exports.RotationUtils = RotationUtils;
