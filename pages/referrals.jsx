"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ReferralsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchReferrals() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/referrals/");
        if (isMounted) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Failed to load referral data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReferrals();
    return () => {
      isMounted = false;
    };
  }, []);

  const referralCode = data?.my_ref_code || "";

  const referralLink =
    typeof window !== "undefined" && referralCode
      ? `${window.location.origin}/register?ref=${referralCode}`
      : "";

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard error", e);
    }
  };

  return (
    <div className="card mt-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Referrals</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4">
            <p className="mb-1 text-sm text-gray-300">
              Your referral code:{" "}
              <span className="font-mono font-semibold">
                {referralCode || "-"}
              </span>
            </p>
            <div className="flex gap-2 items-center">
              <input
                className="input flex-1"
                readOnly
                value={referralLink || "Referral link not available"}
              />
              <button
                className="btn"
                type="button"
                onClick={handleCopy}
                disabled={!referralLink}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mb-2">
            <p className="font-semibold">
              Total referred users: {data?.total_referred ?? 0}
            </p>
          </div>

          <div className="mt-4 overflow-x-auto">
            {data?.users?.length ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="py-2 pr-4">Username</th>
                    <th className="py-2 pr-4">Joined</th>
                    <th className="py-2 pr-4">Coins</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((u) => (
                    <tr key={u.username} className="border-b border-gray-800">
                      <td className="py-2 pr-4">{u.username}</td>
                      <td className="py-2 pr-4">
                        {u.joined
                          ? new Date(u.joined).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-2 pr-4">{u.coins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-300">No referrals yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
