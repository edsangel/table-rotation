export class Row {
  id: string;
  json: any;
  is_valid?: boolean;

  constructor(id: string, json: any, is_valid?: boolean) {
    this.id = id;
    this.json = JSON.stringify(json);
    if (is_valid !== undefined) {
      this.is_valid = is_valid;
    }
  }
}
