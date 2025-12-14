import { useState } from 'react';
import api from '../../lib/api';

export default function SpinWheel({ task, onComplete }) {
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState(0);

  // Wheel segments with rewards
  const segments = [5, 8, 10, 12, 15, 18, 20, 10];
  const segmentAngle = 360 / segments.length;

  const handleSpin = async () => {
    if (spinning || loading) return;

    setSpinning(true);
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/tasks/game/complete/${task.id}/`, {
        device_id: '',
      });

      const wonReward = response.data.reward_coins;
      setReward(wonReward);

      // Calculate rotation to land on a segment
      const randomRotations = 5 + Math.random() * 3; // 5-8 full rotations
      const targetIndex = segments.indexOf(wonReward);
      const finalRotation = rotation + (randomRotations * 360) + (targetIndex * segmentAngle);
      
      setRotation(finalRotation);

      // Wait for animation to complete
      setTimeout(() => {
        setSpinning(false);
        if (onComplete) onComplete(response.data);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to complete task');
      setSpinning(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700/50">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 gradient-text">{task.title}</h3>
      <p className="text-sm text-slate-400 mb-6">{task.description}</p>

      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-6">
          <div
            className="absolute inset-0 rounded-full border-8 border-slate-600"
            style={{
              background: `conic-gradient(
                #10b981 0deg ${segmentAngle}deg,
                #059669 ${segmentAngle}deg ${segmentAngle * 2}deg,
                #10b981 ${segmentAngle * 2}deg ${segmentAngle * 3}deg,
                #059669 ${segmentAngle * 3}deg ${segmentAngle * 4}deg,
                #10b981 ${segmentAngle * 4}deg ${segmentAngle * 5}deg,
                #059669 ${segmentAngle * 5}deg ${segmentAngle * 6}deg,
                #10b981 ${segmentAngle * 6}deg ${segmentAngle * 7}deg,
                #059669 ${segmentAngle * 7}deg 360deg
              )`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            {segments.map((coins, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${index * segmentAngle}deg)`,
                }}
              >
                <span
                  className="text-white font-bold text-lg"
                  style={{
                    transform: `rotate(${-index * segmentAngle}deg) translateY(-80px)`,
                  }}
                >
                  {coins}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-transparent border-t-white"></div>
          </div>
        </div>

        {reward && !spinning && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-emerald-400">
              🎉 You won {reward} coins!
            </p>
          </div>
        )}

          <button
            onClick={handleSpin}
            disabled={spinning || loading}
            className="btn w-full max-w-xs py-3"
          >
            {loading || spinning ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner"></span>
                Spinning...
              </span>
            ) : reward ? (
              '🎡 Spin Again'
            ) : (
              '🎡 Spin Wheel'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 w-full">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <p className="text-xs text-slate-400 text-center mt-4">
          💰 Win between <span className="text-emerald-400 font-semibold">20-150 coins</span> per spin (random)
        </p>
      </div>
    </div>
  );
}

