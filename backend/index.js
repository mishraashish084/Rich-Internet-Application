const express = require('express');
const bodyParser = require('body-parser');
const studentsRouter = require('./routes/students');

const app = express();
const port = 3000;

// For parsing application/json
app.use(bodyParser.json())
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.use('/students', studentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
