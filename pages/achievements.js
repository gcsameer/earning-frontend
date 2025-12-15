import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";
import Layout from "../components/Layout";

export default function Achievements() {
  const router = useRouter();
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }

    const loadAchievements = async () => {
      try {
        const res = await api.get("/achievements/");
        setAchievements(res.data);
      } catch (e) {
        setErr("Failed to load achievements.");
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <span className="spinner mx-auto mb-4"></span>
          <p className="text-slate-400">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-2xl">🏆</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Achievements</h1>
          {achievements && (
            <p className="text-slate-400 text-sm">
              {achievements.total_unlocked} of {achievements.total_available} unlocked
            </p>
          )}
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{err}</p>
          </div>
        )}

        {achievements && (
          <>
            {/* Unlocked Achievements */}
            {achievements.unlocked && achievements.unlocked.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Unlocked Achievements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {achievements.unlocked.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center card-hover"
                    >
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <div className="font-semibold text-white mb-1">{achievement.name}</div>
                      <div className="text-xs text-slate-400">{achievement.description}</div>
                      <div className="mt-2 text-xs text-emerald-400">✓ Unlocked</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Locked Achievements */}
            {achievements.locked && achievements.locked.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Locked Achievements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {achievements.locked.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center opacity-60"
                    >
                      <div className="text-4xl mb-3 filter grayscale">{achievement.icon}</div>
                      <div className="font-semibold text-slate-400 mb-1">{achievement.name}</div>
                      <div className="text-xs text-slate-500 mb-3">{achievement.description}</div>
                      {achievement.progress !== undefined && achievement.target !== undefined && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress} / {achievement.target}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-slate-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-slate-500">🔒 Locked</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

