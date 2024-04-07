// routes/students.js

const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Create a new student
router.post('/', (req, res) => {
  const { student_name } = req.body;
  if (!student_name) {
    return res.status(400).json({ error: 'Student name is required' });
  }
  db.query('INSERT INTO Student (student_name) VALUES (?)', [student_name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create student' });
    } else {
      res.status(201).json({ message: 'Student created successfully' });
    }
  });
});

// Retrieve all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM Student', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch students' });
    } else {
      res.json(results);
    }
  });
});

// Retrieve a specific student by ID
router.get('/:studentId', (req, res) => {
  const { studentId } = req.params;
  db.query('SELECT * FROM Student WHERE student_id = ?', [studentId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch student' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Update an existing student
router.put('/:studentId', (req, res) => {
  const { studentId } = req.params;
  const { student_name } = req.body;
  if (!student_name) {
    return res.status(400).json({ error: 'Student name is required' });
  }
  db.query(
    'UPDATE Student SET student_name = ? WHERE student_id = ?',
    [student_name, studentId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update student' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Student not found' });
      } else {
        res.json({ message: 'Student updated successfully' });
      }
    }
  );
});

// Delete an existing student
router.delete('/:studentId', (req, res) => {
  const { studentId } = req.params;
  db.query('DELETE FROM Student WHERE student_id = ?', [studentId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete student' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  });
});

module.exports = router;
