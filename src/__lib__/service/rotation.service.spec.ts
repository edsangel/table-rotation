import fs from 'fs';
import { Row } from '../row';
import { RotationService } from './rotation.service';

jest.mock('fs');

const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

describe('Unit Tests: RotationService', () => {
  describe('getFile', () => {
    beforeEach(() => {
      mockFS.existsSync.mockClear();
    });

    it('should return the file when provided with valid and existing filename', () => {
      mockFS.existsSync.mockReturnValue(true);
      RotationService.getFile('test.csv');
      expect(fs.createReadStream).toHaveBeenCalled();
    });

    it('should throw an error when the filename is not provided', () => {
      expect(() => RotationService.getFile('')).toThrowError();
    });

    it('should throw an error when wrong file type is provided', () => {
      expect(() => RotationService.getFile('test.txt')).toThrowError();
    });

    it('should throw an error when file doest not exist', () => {
      mockFS.existsSync.mockReturnValue(false);
      expect(() => RotationService.getFile('test.csv')).toThrowError();
    });
  });

  describe('validateAndRotateTableData', () => {
    const rows = [
      { id: '1', json: '[1,2,3,4]' },
      { id: '2', json: '[1]' },
      { id: '3', json: '[1, 2]' }
    ];

    it('should validate and rotate table with valid values', () => {
      const result = RotationService.validateAndRotateTableData(rows[0]);
      const expected = new Row('1', [3,1,4,2], true);

      expect(result).toEqual(expected);
    });

    it('should validate and rotate table with single json value', () => {
      const result = RotationService.validateAndRotateTableData(rows[1]);
      const expected = new Row('2', [1], true);

      expect(result).toEqual(expected);
    });

    it('should not validate and rotate table with invalid values', () => {
      const result = RotationService.validateAndRotateTableData(rows[2]);
      const expected = new Row('3', [], false);
 
      expect(result).toEqual(expected);
    });
  });
});
