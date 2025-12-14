import { useState, useEffect } from 'react';
import api from '../../lib/api';

export default function ScratchCard({ task, onComplete }) {
  const [scratched, setScratched] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScratch = async () => {
    if (scratched || loading) return;
    
    setScratched(true);
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/tasks/game/complete/${task.id}/`, {
        device_id: '',
      });

      setReward(response.data.reward_coins);
      setRevealed(true);
      
      // Call onComplete callback after a short delay
      setTimeout(() => {
        if (onComplete) onComplete(response.data);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to complete task');
      setScratched(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold mb-4">{task.title}</h3>
      <p className="text-sm text-slate-400 mb-4">{task.description}</p>

      <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg p-8 mb-4 min-h-[200px] flex items-center justify-center">
        {!scratched ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🎫</div>
            <p className="text-white font-semibold">Scratch to reveal your reward!</p>
            <button
              onClick={handleScratch}
              disabled={loading}
              className="mt-4 btn bg-white text-emerald-600 hover:bg-emerald-50"
            >
              {loading ? 'Scratching...' : 'Scratch Card'}
            </button>
          </div>
        ) : revealed ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-white text-2xl font-bold mb-2">
              You won {reward} coins!
            </p>
            <p className="text-emerald-100">Coins added to your balance</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-spin text-4xl mb-2">⏳</div>
            <p className="text-white">Processing...</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <p className="text-xs text-slate-500 text-center">
        Reward: 20-150 coins (random)
      </p>
    </div>
  );
}

