import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";
import SocialShare from "../components/SocialShare";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return String(iso || "");
  }
}

export default function Referrals() {
  const router = useRouter();

  const [me, setMe] = useState(null);
  const [data, setData] = useState(null);

  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const [meRes, refRes] = await Promise.all([api.get("/me/"), api.get("/referrals/")]);
      setMe(meRes.data);
      setData(refRes.data);
    } catch (e) {
      setErr("Failed to load referrals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const referralLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const code = me?.ref_code || "";
    return `${window.location.origin}/register${code ? `?ref=${encodeURIComponent(code)}` : ""}`;
  }, [me]);

  const copy = async () => {
    setMsg(null);
    setErr(null);
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setMsg("Referral link copied!");
      setTimeout(() => setMsg(null), 1500);
    } catch {
      // fallback: still show link, user can select/copy manually
      setErr("Could not copy automatically. Please copy the link manually.");
    }
  };

  const share = async () => {
    setMsg(null);
    setErr(null);
    if (!referralLink) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "NepEarn Referral",
          text: "Join using my referral link:",
          url: referralLink,
        });
      } else {
        await copy();
      }
    } catch {
      // user cancelled share -> ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">Referrals</h1>
            <p className="text-slate-400 text-sm">Invite friends and earn bonus coins</p>
          </div>
          <button className="btn" onClick={loadAll} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="spinner"></span>
                Loading...
              </span>
            ) : (
              "🔄 Refresh"
            )}
          </button>
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

        {/* Referral Code Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 mb-6">
          <div className="mb-4">
            <p className="text-sm text-slate-300 mb-2">Your Referral Code</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold font-mono text-emerald-400 bg-slate-900/50 px-4 py-2 rounded-lg">
                {me?.ref_code || "-"}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-300 mb-2">Your Referral Link</p>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <p className="break-all text-sm font-mono text-emerald-400">{referralLink || "-"}</p>
            </div>
          </div>

          <div className="mt-4">
            <SocialShare type="referral" referralLink={referralLink} />
          </div>

          <p className="text-xs text-slate-400 mt-4">
            💡 Share this link. When someone registers using it, you both get bonus coins!
          </p>
        </div>

        {/* Referrals Stats */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <span className="spinner mx-auto mb-4"></span>
              <p className="text-slate-400">Loading referrals...</p>
            </div>
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-sm text-slate-400">Total Referred</p>
                    <p className="text-2xl font-bold text-emerald-400">{data.total_referred || 0}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="text-sm text-slate-400">Coins Earned</p>
                    <p className="text-2xl font-bold text-emerald-400">{data.total_referral_coins || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Your Referrals</h2>
            {(data.users || []).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4 opacity-30">👥</div>
                <p className="text-slate-400 mb-2">No referrals yet</p>
                <p className="text-sm text-slate-500">Share your referral link to invite friends!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(data.users || []).map((u, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl border border-slate-800/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors card-hover"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                        <div>
                          <b className="text-white">{u.username}</b>
                          <p className="text-xs text-slate-500 mt-1">{formatDate(u.joined)}</p>
                        </div>
                      </div>
                      <div className="text-emerald-400 font-semibold">+{u.referral_coins_earned || 50} coins</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
