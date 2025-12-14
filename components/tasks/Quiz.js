import { useState, useEffect } from 'react';
import api from '../../lib/api';

export default function Quiz({ task, onComplete }) {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reward, setReward] = useState(0);

  // Simple quiz questions
  const quizQuestions = [
    {
      question: "What is the capital of Nepal?",
      options: ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur"],
      answer: "Kathmandu"
    },
    {
      question: "Which is the highest mountain in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
      answer: "Mount Everest"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      answer: "Mercury"
    },
    {
      question: "What is the largest ocean?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific"
    }
  ];

  useEffect(() => {
    // Pick a random question
    const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    setQuiz(randomQuestion);
  }, []);

  const handleAnswer = async (selectedAnswer) => {
    if (answered || loading) return;

    setSelected(selectedAnswer);
    setAnswered(true);
    setLoading(true);
    setError(null);

    // Check if answer is correct
    if (selectedAnswer === quiz.answer) {
      try {
        const response = await api.post(`/tasks/game/complete/${task.id}/`, {
          device_id: '',
        });

        if (response.data && response.data.reward_coins) {
          setReward(response.data.reward_coins);
          
          setTimeout(() => {
            if (onComplete) onComplete(response.data);
          }, 2000);
        } else {
          setError('Task completed but no reward received. Please contact support.');
        }
      } catch (err) {
        console.error('Task completion error:', err);
        const errorMessage = err.response?.data?.detail || err.response?.data?.message || err.message || 'Failed to complete task';
        setError(errorMessage);
        setAnswered(false);
        setSelected(null);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Wrong answer! Try again.');
      setLoading(false);
      setTimeout(() => {
        setAnswered(false);
        setSelected(null);
        setError(null);
        // Reset with new question
        const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
        setQuiz(randomQuestion);
      }, 2000);
    }
  };

  if (!quiz) {
    return <div className="text-center p-8">Loading quiz...</div>;
  }

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700/50">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 gradient-text">{task.title}</h3>
      <p className="text-sm text-slate-400 mb-6">{task.description}</p>

      <div className="bg-slate-700 rounded-lg p-6 mb-4">
        <p className="text-xl font-semibold mb-6 text-center">{quiz.question}</p>

        <div className="space-y-3">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={answered || loading}
              className={`w-full p-4 rounded-lg font-semibold text-left transition ${
                answered && option === quiz.answer
                  ? 'bg-emerald-600 text-white'
                  : answered && selected === option && option !== quiz.answer
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              }`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
      </div>

      {answered && selected === quiz.answer && (
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-emerald-400">
            🎉 Correct! You won {reward} coins!
          </p>
        </div>
      )}

        {error && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            error.includes('Wrong') 
              ? 'bg-red-500/10 border border-red-500/20' 
              : 'bg-yellow-500/10 border border-yellow-500/20'
          }`}>
            <p className={`text-sm ${
              error.includes('Wrong') ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {error}
            </p>
          </div>
        )}

      <p className="text-xs text-slate-400 text-center mt-4">
        💰 Answer correctly to earn <span className="text-emerald-400 font-semibold">50 coins</span>
      </p>
    </div>
  );
}

