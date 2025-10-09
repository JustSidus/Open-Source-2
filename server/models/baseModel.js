import { run, all, get } from '../db/connection.js';

// Generic helper base for simple CRUD tables
export class BaseModel {
  constructor(table, fields) {
    this.table = table;
    this.fields = fields; // array of field names (excluding id)
  }

  async create(data) {
    const cols = this.fields.filter(f => f in data);
    const placeholders = cols.map(() => '?').join(',');
    const sql = `INSERT INTO ${this.table} (${cols.join(',')}) VALUES (${placeholders})`;
    const params = cols.map(c => data[c]);
    return run(sql, params);
  }

  async findAll() {
    return all(`SELECT * FROM ${this.table}`);
  }

  async findById(id) {
    return get(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }

  async update(id, data) {
    const cols = this.fields.filter(f => f in data);
    if (!cols.length) return { changes: 0 };
    const setStr = cols.map(c => `${c} = ?`).join(',');
    const sql = `UPDATE ${this.table} SET ${setStr} WHERE id = ?`;
    const params = [...cols.map(c => data[c]), id];
    return run(sql, params);
  }

  async remove(id) {
    return run(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}
