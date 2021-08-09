"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate = exports.splitArray = void 0;
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
exports.splitArray = splitArray;
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
        // Manage the the rest of the cells if available
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
exports.rotate = rotate;
