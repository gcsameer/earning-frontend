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

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            {me ? (
              <div className="space-y-1">
                <p>
                  <span className="opacity-70">Username:</span>{" "}
                  <b>{me.username}</b>
                </p>
                <p>
                  <span className="opacity-70">Coins:</span>{" "}
                  <b>{me.coins_balance}</b>
                </p>
                <p>
                  <span className="opacity-70">Referral Code:</span>{" "}
                  <b>{me.ref_code}</b>
                </p>
              </div>
            ) : (
              <p>Profile not available</p>
            )}
          </div>

          <button className="btn" onClick={logoutNow}>
            Logout
          </button>
        </div>

        {msg && <p className="mt-3 text-emerald-400 text-sm">{msg}</p>}
        {err && <p className="mt-3 text-red-400 text-sm">{err}</p>}

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn" onClick={claimBonus}>
            Claim Daily Bonus
          </button>

          <Link className="btn" href="/tasks">
            Tasks
          </Link>

          <Link className="btn" href="/wallet">
            Wallet
          </Link>

          <Link className="btn" href="/withdraw">
            Withdraw
          </Link>

          <Link className="btn" href="/referrals">
            Referrals
          </Link>

          <Link className="btn" href="/offerwall">
            Offerwall
          </Link>
        </div>
      </div>

      <div className="card">
        <p className="text-sm opacity-80">
          Tip: Share this link to invite friends:
        </p>
        <p className="mt-2 break-all text-sm">
          {typeof window !== "undefined" && me?.ref_code
            ? `${window.location.origin}/register?ref=${me.ref_code}`
            : "—"}
        </p>
      </div>
    </div>
  );
}
