// database/db.js

const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'password', // Replace 'your_password' with your actual MySQL password
  database: 'ExaminationReportingDB'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

module.exports = db;
