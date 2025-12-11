import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [bonusMessage, setBonusMessage] = useState(null);
  const [loadingBonus, setLoadingBonus] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [meRes, walletRes] = await Promise.all([
          api.get("/me/"),
          api.get("/wallet/"),
        ]);
        setMe(meRes.data);
        setWallet(walletRes.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const claimBonus = async () => {
    setLoadingBonus(true);
    setBonusMessage(null);
    try {
      const res = await api.post("/daily-bonus/");
      setBonusMessage(res.data.message + ` (+${res.data.bonus_coins} coins)`);
      // refresh wallet/me
      const walletRes = await api.get("/wallet/");
      setWallet(walletRes.data);
    } catch (e) {
      console.error(e);
      if (e.response && e.response.data && e.response.data.detail) {
        setBonusMessage(e.response.data.detail);
      } else {
        setBonusMessage("Could not claim bonus.");
      }
    } finally {
      setLoadingBonus(false);
    }
  };

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {me && (
        <p className="mb-2 text-slate-300">
          Welcome, <span className="font-semibold">{me.username}</span>!
        </p>
      )}

      {wallet && (
        <p className="mb-4 text-slate-300">
          Current balance:{" "}
          <span className="font-semibold text-emerald-400">
            {wallet.coins_balance} coins
          </span>{" "}
          (~ Rs {wallet.approx_balance_rs})
        </p>
      )}

      <button className="btn" onClick={claimBonus} disabled={loadingBonus}>
        {loadingBonus ? "Claiming..." : "Claim Daily Bonus"}
      </button>

      {bonusMessage && (
        <p className="mt-3 text-sm text-emerald-300">{bonusMessage}</p>
      )}
    </div>
  );
}
