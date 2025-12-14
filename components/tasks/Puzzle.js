import { useState, useEffect } from 'react';
import api from '../../lib/api';

export default function Puzzle({ task, onComplete }) {
  const [puzzle, setPuzzle] = useState(null);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reward, setReward] = useState(0);

  // Simple math puzzle
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const answer = num1 + num2;
    const wrongAnswers = [
      answer + 1,
      answer - 1,
      answer + 2,
      answer - 2,
    ].filter(a => a > 0 && a !== answer);

    const options = [answer, ...wrongAnswers.slice(0, 3)]
      .sort(() => Math.random() - 0.5);

    setPuzzle({
      question: `What is ${num1} + ${num2}?`,
      answer,
      options,
    });
  }, []);

  const handleAnswer = async (selectedAnswer) => {
    if (solved || loading) return;

    setSelected(selectedAnswer);
    setLoading(true);
    setError(null);

    // Check if answer is correct
    if (selectedAnswer === puzzle.answer) {
      try {
        const response = await api.post(`/tasks/game/complete/${task.id}/`, {
          device_id: '',
        });

        if (response.data && response.data.reward_coins) {
          setReward(response.data.reward_coins);
          setSolved(true);

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
        setSelected(null);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Wrong answer! Try again.');
      setLoading(false);
      setTimeout(() => {
        setSelected(null);
        setError(null);
      }, 2000);
    }
  };

  if (!puzzle) {
    return <div className="text-center p-8">Loading puzzle...</div>;
  }

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700/50">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 gradient-text">{task.title}</h3>
      <p className="text-sm text-slate-400 mb-6">{task.description}</p>

      <div className="bg-slate-700 rounded-lg p-6 mb-4">
        <p className="text-2xl font-bold text-center mb-6">{puzzle.question}</p>

        <div className="grid grid-cols-2 gap-3">
          {puzzle.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={solved || loading}
              className={`p-4 rounded-lg font-semibold transition ${
                solved && option === puzzle.answer
                  ? 'bg-emerald-600 text-white'
                  : selected === option && option !== puzzle.answer
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {solved && (
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
        💰 Solve correctly to earn <span className="text-emerald-400 font-semibold">50 coins</span>
      </p>
    </div>
  );
}

