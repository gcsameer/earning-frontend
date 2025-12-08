import { useEffect, useState } from "react";
import api, { getAccessToken } from "../lib/api";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    const fetchData = async () => {
      const [meRes, walletRes] = await Promise.all([
        api.get("/me/"),
        api.get("/wallet/"),
      ]);
      setMe(meRes.data);
      setWallet(walletRes.data);
    };
    fetchData().catch((err) => {
      console.error(err);
      router.replace("/login");
    });
  }, [router]);

  if (!me || !wallet) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="mt-6 space-y-4">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Hello, {me.username} 👋</h1>
        <p className="text-slate-300 mb-2">
          Referral Code: <span className="font-mono">{me.ref_code}</span>
        </p>
        <p className="text-slate-400 text-sm">
          Share your referral code with friends to earn extra coins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Coins Balance</p>
          <p className="text-3xl font-bold">{wallet.coins_balance}</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Approx Balance (Rs)</p>
          <p className="text-3xl font-bold">
            {wallet.approx_balance_rs.toFixed(2)}
          </p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Fraud Score</p>
          <p className="text-3xl font-bold text-amber-400">
            {me.fraud_score.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
