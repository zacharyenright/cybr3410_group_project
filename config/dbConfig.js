const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Absolute path should not be joined with __dirname
const dbPath = 'databases/database.db';

// Initialize the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

module.exports = db;
