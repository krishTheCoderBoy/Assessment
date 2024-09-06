// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let surveyData = []; // This will act as our "database"

app.post('/api/submit', (req, res) => {
  const { sessionId, answers } = req.body;
  surveyData.push({ sessionId, answers, status: 'COMPLETED' });

  res.status(200).send({surveyData});
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
