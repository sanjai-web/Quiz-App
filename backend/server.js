const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');

let quizzes = [];

app.use(express.json());
app.use(cors());

// Get all quizzes
app.get('/quizzes', (req, res) => {
  res.send(quizzes);
});

// Get a specific quiz by ID
app.get('/quizzes/:id', (req, res) => {
  const quizId = req.params.id;
  const quiz = quizzes.find(quiz => quiz.id === quizId);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
});

// Create a new quiz
app.post('/quizzes', (req, res) => {
  const { title, questions } = req.body;
  const newQuiz = { id: Date.now().toString(), title, questions };
  quizzes.push(newQuiz);
  res.status(201).json(newQuiz);
});

// Update an existing quiz
app.put('/quizzes/:id', (req, res) => {
  const quizId = req.params.id;
  const { title, questions } = req.body;
  const quizIndex = quizzes.findIndex(quiz => quiz.id === quizId);
  if (quizIndex === -1) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  quizzes[quizIndex] = { ...quizzes[quizIndex], title, questions };
  res.json(quizzes[quizIndex]);
});

// Delete an existing quiz
app.delete('/quizzes/:id', (req, res) => {
  const quizId = req.params.id;
  quizzes = quizzes.filter(quiz => quiz.id !== quizId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
