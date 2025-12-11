import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ReferralsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/referrals/");
        setData(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  if (!data) return <div className="card mt-8">Loading referrals...</div>;

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/register?ref=${data.users[0]?.ref_code || ""}`
      : "";

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-4">Referrals</h1>

      <p className="mb-3">
        Total referred:{" "}
        <span className="font-semibold text-emerald-400">
          {data.total_referred}
        </span>
      </p>

      <h2 className="font-semibold mb-2">Referred users</h2>
      {data.users.length === 0 && (
        <p className="text-sm text-slate-400">No referred users yet.</p>
      )}

      <div className="space-y-2 mt-2">
        {data.users.map((u, idx) => (
          <div
            key={idx}
            className="flex justify-between text-sm border-b border-slate-800 py-1"
          >
            <span>{u.username}</span>
            <span className="text-xs text-slate-400">
              Joined: {new Date(u.joined).toLocaleDateString()}
            </span>
            <span className="text-emerald-300">{u.coins} coins</span>
          </div>
        ))}
      </div>
    </div>
  );
}
