import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import api, { clearTokens } from "../lib/api";
import SocialShare from "../components/SocialShare";

export default function Dashboard() {
  const router = useRouter();

  const [me, setMe] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [streak, setStreak] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [challenges, setChallenges] = useState(null);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setErr(null);
    try {
      // Load user profile
      const meRes = await api.get("/me/");
      setMe(meRes.data);

      // Load analytics
      try {
        const analyticsRes = await api.get("/analytics/");
        setAnalytics(analyticsRes.data);
      } catch (e) {
        // Analytics optional - fail silently
        if (process.env.NODE_ENV === 'development') {
          console.log("Analytics not available");
        }
      }

      // Load streak
      try {
        const streakRes = await api.post("/streak/");
        setStreak(streakRes.data);
      } catch (e) {
        // Streak optional - fail silently
        if (process.env.NODE_ENV === 'development') {
          console.log("Streak not available");
        }
      }

      // Load achievements
      try {
        const achievementsRes = await api.get("/achievements/");
        setAchievements(achievementsRes.data);
      } catch (e) {
        // Achievements optional - fail silently
        if (process.env.NODE_ENV === 'development') {
          console.log("Achievements not available");
        }
      }

      // Load challenges
      try {
        const challengesRes = await api.get("/challenges/");
        setChallenges(challengesRes.data);
      } catch (e) {
        // Challenges optional - fail silently
        if (process.env.NODE_ENV === 'development') {
          console.log("Challenges not available");
        }
      }

      return true;
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        clearTokens();
        router.replace("/login");
        return false;
      }
      setErr("Failed to load dashboard. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const claimBonus = async () => {
    setMsg(null);
    setErr(null);
    try {
      const res = await api.post("/daily-bonus/");
      setMsg(`Daily bonus claimed: ${res.data.bonus_coins} coins`);
      await loadAll();
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to claim bonus.");
    }
  };

  const claimChallenge = async (challengeId) => {
    setMsg(null);
    setErr(null);
    try {
      const res = await api.post("/challenges/", { challenge_id: challengeId });
      setMsg(`Challenge reward claimed: ${res.data.reward} coins!`);
      await loadAll();
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to claim challenge.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <span className="spinner mx-auto mb-4"></span>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const referralLink = typeof window !== "undefined" && me?.ref_code
    ? `${window.location.origin}/register?ref=${me.ref_code}`
    : "";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Card with Streak */}
      <div className="card fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 gradient-text">Dashboard</h1>
            {me ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">👤</span>
                  <span className="text-slate-300">Username:</span>
                  <b className="text-white">{me.username}</b>
                  {me.user_level > 1 && (
                    <span className="ml-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                      Level {me.user_level}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">💰</span>
                  <span className="text-slate-300">Coins:</span>
                  <b className="text-emerald-400 text-xl">{me.coins_balance}</b>
                </div>
                {streak && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">🔥</span>
                    <span className="text-slate-300">Login Streak:</span>
                    <b className="text-orange-400">{streak.current_streak} days</b>
                    {streak.bonus > 0 && (
                      <span className="ml-2 text-emerald-400 text-sm">+{streak.bonus} coins bonus!</span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400">Profile not available</p>
            )}
          </div>
        </div>

        {msg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm">{msg}</p>
          </div>
        )}
        {err && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{err}</p>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          <button 
            className="btn flex-col py-4 h-auto" 
            onClick={claimBonus}
          >
            <span className="text-2xl mb-1">🎁</span>
            <span className="text-xs">Daily Bonus</span>
          </button>
          <Link className="btn flex-col py-4 h-auto" href="/tasks">
            <span className="text-2xl mb-1">🎯</span>
            <span className="text-xs">Tasks</span>
          </Link>
          <Link className="btn flex-col py-4 h-auto" href="/wallet">
            <span className="text-2xl mb-1">💰</span>
            <span className="text-xs">Wallet</span>
          </Link>
          <Link className="btn flex-col py-4 h-auto" href="/withdraw">
            <span className="text-2xl mb-1">💸</span>
            <span className="text-xs">Withdraw</span>
          </Link>
          <Link className="btn flex-col py-4 h-auto" href="/referrals">
            <span className="text-2xl mb-1">👥</span>
            <span className="text-xs">Referrals</span>
          </Link>
          <Link className="btn flex-col py-4 h-auto" href="/offerwall">
            <span className="text-2xl mb-1">🎁</span>
            <span className="text-xs">Offerwall</span>
          </Link>
        </div>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card fade-in">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold text-emerald-400 mb-1">{analytics.earnings.today}</div>
              <div className="text-sm text-slate-400">Coins Today</div>
            </div>
          </div>
          <div className="card fade-in">
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-blue-400 mb-1">{analytics.earnings.this_week}</div>
              <div className="text-sm text-slate-400">This Week</div>
            </div>
          </div>
          <div className="card fade-in">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-purple-400 mb-1">{analytics.tasks.total_completed}</div>
              <div className="text-sm text-slate-400">Total Tasks</div>
            </div>
          </div>
          <div className="card fade-in">
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-orange-400 mb-1">{analytics.referrals.total}</div>
              <div className="text-sm text-slate-400">Referrals</div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Challenges */}
      {challenges && challenges.challenges && challenges.challenges.length > 0 && (
        <div className="card fade-in">
          <h2 className="text-xl font-bold mb-4 gradient-text flex items-center gap-2">
            <span>🎯</span> Daily Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`p-4 rounded-xl border ${
                  challenge.completed
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-slate-800/50 border-slate-700/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  {challenge.completed && (
                    <span className="text-emerald-400 text-sm">✓</span>
                  )}
                </div>
                <p className="text-sm text-slate-400 mb-3">{challenge.description}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress} / {challenge.target}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-400 font-semibold">
                    Reward: {challenge.reward} coins
                  </span>
                  {challenge.completed && !challenge.claimed && (
                    <button
                      onClick={() => claimChallenge(challenge.id)}
                      className="btn text-xs px-3 py-1"
                    >
                      Claim
                    </button>
                  )}
                  {challenge.completed && challenge.claimed && (
                    <span className="text-xs text-slate-400">Already claimed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {challenges.total_rewards_available > 0 && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <p className="text-emerald-400 text-sm text-center">
                💰 {challenges.total_rewards_available} coins available to claim!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Achievements */}
      {achievements && achievements.unlocked && achievements.unlocked.length > 0 && (
        <div className="card fade-in">
          <h2 className="text-xl font-bold mb-4 gradient-text flex items-center gap-2">
            <span>🏆</span> Achievements ({achievements.total_unlocked}/{achievements.total_available})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {achievements.unlocked.slice(0, 8).map((achievement) => (
              <div
                key={achievement.id}
                className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center"
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{achievement.name}</div>
                <div className="text-xs text-slate-400">{achievement.description}</div>
              </div>
            ))}
          </div>
          {achievements.unlocked.length > 8 && (
            <Link href="/achievements" className="block text-center mt-4 text-emerald-400 hover:text-emerald-300 text-sm">
              View All Achievements →
            </Link>
          )}
        </div>
      )}

      {/* Referral Link with Social Share */}
      <div className="card fade-in">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>🔗</span> Share Your Referral Link
        </h2>
        <p className="text-sm text-slate-400 mb-3">
          Invite friends and earn bonus coins when they join! You get 50 coins, they get 20 coins.
        </p>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-4">
          <p className="break-all text-sm font-mono text-emerald-400">
            {referralLink || "—"}
          </p>
        </div>
        <SocialShare type="referral" referralLink={referralLink} />
      </div>

      {/* Mobile App Download Card */}
      <div className="card fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="NepEarn Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-3xl hidden">📱</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Download Mobile App</h2>
            <p className="text-sm text-slate-400">Get the NepEarn app for Android</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-4">
          Earn coins on the go! Download our Android app and enjoy all features with a better mobile experience. 
          The app includes all features from web: games, daily bonus, streak, analytics, and more!
        </p>
        <a
          href="/api/download-apk"
          download="NepEarn.apk"
          className="btn w-full flex items-center justify-center gap-2 py-4 text-lg hover:scale-105 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-2xl">⬇️</span>
          <span>Download APK</span>
        </a>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Version 1.0.0 • Android 5.0+ • Size: ~25 MB
        </p>
        {process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL ? (
          <p className="text-xs text-emerald-400 mt-2 text-center">
            ✅ APK URL configured - Ready to download!
          </p>
        ) : (
          <p className="text-xs text-yellow-400 mt-2 text-center">
            ⚠️ APK URL not configured. Set NEXT_PUBLIC_APK_DOWNLOAD_URL in Vercel.
          </p>
        )}
      </div>
    </div>
  );
}
