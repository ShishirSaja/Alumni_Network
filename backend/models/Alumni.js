const db = require('../config/db');

class Alumni {
    static create(data, callback) {
        const sql = 'INSERT INTO alumni SET ?';
        db.query(sql, data, callback);
    }

    static findAll(callback) {
        const sql = 'SELECT * FROM alumni';
        db.query(sql, callback);
    }

    static findByName(name, callback) {
        const sql = 'SELECT * FROM alumni WHERE name = ?';
        db.query(sql, [name], callback);
    }

    static update(data, name, callback) {
        const sql = 'UPDATE alumni SET ? WHERE name = ?';
        db.query(sql, [data, name], callback);
    }

    
    
    static delete(name, callback) {
        const sqlDelete = 'DELETE FROM alumni WHERE name = ?';
        db.query(sqlDelete, [name], callback);
    }
    
}

module.exports = Alumni;