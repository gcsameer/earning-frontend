"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ReferralsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/referrals/"); // uses your Django endpoint
        setData(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to load referral stats.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCopy = async () => {
    if (!data) return;

    // Try to use referral_link from API, fall back to building from ref_code
    let link = data.referral_link;
    if (!link) {
      const base =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL || "";
      const code = data.ref_code || data.referral_code || "";
      link = `${base}/register?ref=${code}`;
    }

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return (
      <div className="card mt-10 max-w-2xl mx-auto">
        Loading referral stats…
      </div>
    );
  }

  if (error) {
    return (
      <div className="card mt-10 max-w-2xl mx-auto text-red-400">{error}</div>
    );
  }

  const totalRefs = data?.total_referrals ?? data?.total_refs ?? 0;
  const totalCoins = data?.total_earned_coins ?? data?.total_coins ?? 0;

  const referralLink =
    data?.referral_link ||
    (typeof window !== "undefined" && data?.ref_code
      ? `${window.location.origin}/register?ref=${data.ref_code}`
      : "");

  return (
    <div className="card mt-10 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Referrals</h1>

      {/* Referral link + copy button */}
      <div>
        <p className="label mb-1">Your referral link</p>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            readOnly
            value={referralLink || "No referral code yet"}
          />
          <button
            onClick={handleCopy}
            disabled={!referralLink}
            className="btn whitespace-nowrap"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/60 rounded-xl p-4">
          <p className="text-sm text-slate-300">Total invited</p>
          <p className="text-2xl font-bold mt-1">{totalRefs}</p>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-4">
          <p className="text-sm text-slate-300">Total earned (coins)</p>
          <p className="text-2xl font-bold mt-1">{totalCoins}</p>
        </div>
      </div>

      {/* Optional: recent referrals table if your API returns it */}
      {Array.isArray(data?.recent_referrals) &&
        data.recent_referrals.length > 0 && (
          <div>
            <p className="label mb-2">Recent referrals</p>
            <div className="border border-slate-700/60 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/80">
                  <tr>
                    <th className="text-left px-4 py-2">User</th>
                    <th className="text-left px-4 py-2">Joined</th>
                    <th className="text-right px-4 py-2">Bonus (coins)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_referrals.map((r) => (
                    <tr
                      key={r.id || r.username}
                      className="border-t border-slate-800/60"
                    >
                      <td className="px-4 py-2">{r.username}</td>
                      <td className="px-4 py-2">{r.joined_at}</td>
                      <td className="px-4 py-2 text-right">
                        {r.bonus_coins ?? r.coins ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
}
