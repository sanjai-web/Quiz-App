import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";
const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      await axios.post('http://127.0.0.1:3001/quizzes', { title, questions });
      fetchQuizzes();
      setTitle('');
      setQuestions([]);
      alert('Quiz created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create quiz');
    }
  };

  const handleEditQuiz = async (quizId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/quizzes/${quizId}`);
      setTitle(response.data.title);
      setQuestions(response.data.questions);
      setEditingQuizId(quizId);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch quiz for editing');
    }
  };

  const handleUpdateQuiz = async () => {
    try {
      await axios.put(`http://127.0.0.1:3001/quizzes/${editingQuizId}`, { title, questions });
      fetchQuizzes();
      setTitle('');
      setQuestions([]);
      setEditingQuizId('');
      alert('Quiz updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update quiz');
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/quizzes/${quizId}`);
      fetchQuizzes();
      alert('Quiz deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete quiz');
    }
  };

  return (
    <>
    <div className='container'>
      <h3>Create New Quiz</h3>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Questions:</label>
      <textarea value={questions} onChange={(e) => setQuestions(e.target.value)} />
      <br />
      {!editingQuizId ? (
        <button className='but1' onClick={handleCreateQuiz}>Create Quiz</button>
      ) : (
        <button className='but1' onClick={handleUpdateQuiz}>Update Quiz</button>
      )}

      <h3>Quizzes</h3>
      {quizzes.map(quiz => (
        <div key={quiz.id}>
          <h2 className='tit'><span className='tit2'>Title:</span>{quiz.title}</h2>
          <h3 className='que'><span>Question:</span>{quiz.questions}</h3>
          <button className='but3' onClick={() => handleEditQuiz(quiz.id)}>Edit</button>
          <button className='but2' onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
        </div>
      ))}
    </div></>
  );
};

export default Quiz;
