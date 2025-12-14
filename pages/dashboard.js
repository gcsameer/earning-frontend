import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import api, { clearTokens } from "../lib/api";

export default function Dashboard() {
  const router = useRouter();

  const [me, setMe] = useState(null);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = async () => {
    setErr(null);
    try {
      const res = await api.get("/me/");
      setMe(res.data);
      return true;
    } catch (e) {
      // if token is invalid AND refresh fails, api.js will clear tokens
      const status = e?.response?.status;
      if (status === 401) {
        clearTokens();
        router.replace("/login");
        return false;
      }
      setErr("Failed to load profile. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // DO NOT check getAccessToken() here
    // because on refresh your access token might be expired and api.js will refresh it.
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const claimBonus = async () => {
    setMsg(null);
    setErr(null);
    try {
      const res = await api.post("/daily-bonus/");
      setMsg(`Daily bonus claimed: ${res.data.bonus_coins} coins`);
      await loadMe();
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to claim bonus.");
    }
  };

  const logoutNow = () => {
    clearTokens();
    router.replace("/login");
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Card */}
      <div className="card fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 gradient-text">Dashboard</h1>
            {me ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">👤</span>
                  <span className="text-slate-300">Username:</span>
                  <b className="text-white">{me.username}</b>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">💰</span>
                  <span className="text-slate-300">Coins:</span>
                  <b className="text-emerald-400 text-xl">{me.coins_balance}</b>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">🔗</span>
                  <span className="text-slate-300">Referral Code:</span>
                  <b className="text-white font-mono bg-slate-800 px-2 py-1 rounded">{me.ref_code}</b>
                </div>
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

      {/* Mobile App Download Card */}
      <div className="card fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-3xl">📱</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Download Mobile App</h2>
            <p className="text-sm text-slate-400">Get the NepEarn app for Android</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-4">
          Earn coins on the go! Download our Android app and enjoy all features with a better mobile experience.
        </p>
        <a
          href="/api/download-apk"
          download="NepEarn.apk"
          className="btn w-full flex items-center justify-center gap-2 py-4 text-lg"
        >
          <span className="text-2xl">⬇️</span>
          <span>Download APK</span>
        </a>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Version 1.0.0 • Android 5.0+ • Size: ~25 MB
        </p>
      </div>

      {/* Referral Link Card */}
      <div className="card fade-in">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>🔗</span> Share Your Referral Link
        </h2>
        <p className="text-sm text-slate-400 mb-3">
          Invite friends and earn bonus coins when they join!
        </p>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="break-all text-sm font-mono text-emerald-400">
            {typeof window !== "undefined" && me?.ref_code
              ? `${window.location.origin}/register?ref=${me.ref_code}`
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
