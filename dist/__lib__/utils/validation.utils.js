"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPerfectSquare = exports.validateFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const error_handler_1 = require("../error/error.handler");
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
        error_handler_1.ErrorHandler.throw("INVALID SYNTAX" /* INVALID_SYNTAX */, errorOptions);
    }
    if (filename && !filename.endsWith('.csv')) {
        error_handler_1.ErrorHandler.throw("INVALID FILE" /* INVALID_FILE */);
    }
    if (!fs_1.default.existsSync(path_1.default.join(filename))) {
        const errorOptions = { filename: filename };
        error_handler_1.ErrorHandler.throw("FILE NOT FOUND" /* FILE_NOT_FOUND */, errorOptions);
    }
}
exports.validateFile = validateFile;
/**
 * Checks whether or not the length provided is a perfect square.
 *
 * @param length
 * @returns
 */
function isPerfectSquare(length) {
    return length > 0 && Math.sqrt(length) % 1 === 0;
}
exports.isPerfectSquare = isPerfectSquare;
