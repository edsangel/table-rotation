"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
class Row {
    constructor(id, json, is_valid) {
        this.id = id;
        this.json = JSON.stringify(json);
        if (is_valid !== undefined) {
            this.is_valid = is_valid;
        }
    }
}
exports.Row = Row;
