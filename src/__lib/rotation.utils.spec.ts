import fs from 'fs';
import { RotationUtils } from './rotation.utils';

jest.mock('fs');

const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

describe('Unit Tests: RotationUtils', () => {
  beforeEach(() => {
    mockFS.existsSync.mockClear();
  });

  describe('getFile', () => {
    it('should return the file when provided with valid and existing filename', () => {
      mockFS.existsSync.mockReturnValue(true);
      RotationUtils.getFile('test.csv');
      expect(fs.createReadStream).toHaveBeenCalled();
    });

    it('should throw an error when the file is not provided', () => {
      expect(() => RotationUtils.getFile('')).toThrowError();
    });

    it('should throw an error when wrong file type is provided', () => {
      expect(() => RotationUtils.getFile('test.txt')).toThrowError();
    });

    it('should throw an error when file doest not exist', () => {
      mockFS.existsSync.mockReturnValue(false);
      expect(() => RotationUtils.getFile('test.csv')).toThrowError();
    });
  });

  describe('validateAndRotateTableData', () => {
    const rows = [
      { id: '1', json: '[1,2,3,4]' },
      { id: '2', json: '[1]' },
      { id: '3', json: '[1, 2]' }
    ];

    it('should validate and rotate table with valid values', () => {
      const result = RotationUtils.validateAndRotateTableData(rows[0]);
      expect(result).toEqual({"id": "1", "is_valid": true, "json": "[3,1,4,2]"});
    });

    it('should validate and rotate table with single json value', () => {
      const result = RotationUtils.validateAndRotateTableData(rows[1]);
      expect(result).toEqual({"id": "2", "is_valid": true, "json": "[1]"});
    });

    it('should not validate and rotate table with invalid values', () => {
      const result = RotationUtils.validateAndRotateTableData(rows[2]);
      expect(result).toEqual({"id": "3", "is_valid": false, "json": "[]"});
    });
  });
});
