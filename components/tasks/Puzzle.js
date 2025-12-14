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

        setReward(response.data.reward_coins);
        setSolved(true);

        setTimeout(() => {
          if (onComplete) onComplete(response.data);
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to complete task');
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
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold mb-4">{task.title}</h3>
      <p className="text-sm text-slate-400 mb-4">{task.description}</p>

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
        <p className={`text-sm text-center mb-4 ${
          error.includes('Wrong') ? 'text-red-400' : 'text-yellow-400'
        }`}>
          {error}
        </p>
      )}

      <p className="text-xs text-slate-500 text-center">
        Solve the puzzle correctly to earn 50 coins
      </p>
    </div>
  );
}

