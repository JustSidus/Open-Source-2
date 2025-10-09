import { run, get, all } from '../db/connection.js';

// Clase base simple para operaciones CRUD
// Modelo base muy simple para CRUD genérico.
// table: nombre de la tabla en la BD.
// fields: campos permitidos para inserción/actualización.
export class BaseModel {
  constructor(table, fields) {
    this.table = table;      // nombre de la tabla
    this.fields = fields;    // columnas (sin id)
  }

  async create(data) { // inserta y devuelve { id: newId }
    const cols = this.fields.filter(f => f in data);
    const placeholders = cols.map(() => '?').join(',');
    const sql = `INSERT INTO ${this.table} (${cols.join(',')}) VALUES (${placeholders})`;
    const params = cols.map(c => data[c]);
    return run(sql, params);
  }

  async findAll() { // lista todo
    return all(`SELECT * FROM ${this.table}`);
  }

  async findById(id) { // uno por id
    return get(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }

  async update(id, data) { // actualiza por id
    const cols = this.fields.filter(f => f in data);
    if (!cols.length) return { changes: 0 };
    const setStr = cols.map(c => `${c} = ?`).join(',');
    const sql = `UPDATE ${this.table} SET ${setStr} WHERE id = ?`;
    const params = [...cols.map(c => data[c]), id];
    return run(sql, params);
  }

  async remove(id) { // elimina por id
    return run(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}
