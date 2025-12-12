import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

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
    } catch (e) {
      setErr("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
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
      setErr(
        e?.response?.data?.detail || "Failed to claim bonus. Try again later."
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {msg && <p className="mb-3 text-emerald-400 text-sm">{msg}</p>}
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      {me ? (
        <div className="space-y-2">
          <p>
            <span className="opacity-70">Username:</span> <b>{me.username}</b>
          </p>
          <p>
            <span className="opacity-70">Coins:</span> <b>{me.coins_balance}</b>
          </p>
          <p>
            <span className="opacity-70">Referral Code:</span>{" "}
            <b>{me.ref_code}</b>
          </p>

          <button className="btn mt-4" onClick={claimBonus}>
            Claim Daily Bonus
          </button>
        </div>
      ) : (
        <p>Profile not available</p>
      )}
    </div>
  );
}
