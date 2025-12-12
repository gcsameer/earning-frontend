import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken, clearTokens } from "../lib/api";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [claiming, setClaiming] = useState(false);

  // Load logged-in user (protect page on refresh)
  useEffect(() => {
    async function loadMe() {
      const token = getAccessToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await api.get("/me/");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load /me/", err);
        clearTokens();
        router.replace("/login");
      } finally {
        setLoadingUser(false);
      }
    }

    loadMe();
  }, [router]);

  const claimDailyBonus = async () => {
    setStatusMsg("");
    setClaiming(true);
    try {
      const res = await api.post("/daily-bonus/");
      setStatusMsg(`✅ ${res.data.message} (+${res.data.bonus_coins} coins)`);

      // Refresh user balance
      const meRes = await api.get("/me/");
      setUser(meRes.data);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to claim daily bonus.";
      setStatusMsg(`❌ ${msg}`);
    } finally {
      setClaiming(false);
    }
  };

  const logout = () => {
    clearTokens();
    router.push("/login");
  };

  if (loadingUser) {
    return (
      <div className="card mt-10 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="card mt-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>

      {user && (
        <div className="mt-4 text-slate-200 space-y-1">
          <p>
            <span className="text-slate-400">Username:</span> {user.username}
          </p>
          <p>
            <span className="text-slate-400">Coins:</span> {user.coins_balance}
          </p>
          <p>
            <span className="text-slate-400">Referral Code:</span> {user.ref_code}
          </p>
        </div>
      )}

      <div className="mt-6">
        <button className="btn" onClick={claimDailyBonus} disabled={claiming}>
          {claiming ? "Claiming..." : "Claim Daily Bonus"}
        </button>
      </div>

      {statusMsg && (
        <p className="mt-4 text-sm text-emerald-300 whitespace-pre-wrap">
          {statusMsg}
        </p>
      )}
    </div>
  );
}
