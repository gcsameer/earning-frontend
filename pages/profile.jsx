"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${API_URL}/api/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem("access");
          window.location.href = "/login";
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const copyReferral = () => {
    navigator.clipboard.writeText(user.ref_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="mb-4">
        <strong>Username:</strong> {user.username}
      </div>

      <div className="mb-4">
        <strong>Email:</strong> {user.email}
      </div>

      <div className="mb-4">
        <strong>Phone:</strong> {user.phone || "Not provided"}
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg border">
        <strong>Your Referral Code:</strong>
        <div className="flex items-center gap-3 mt-2">
          <code className="px-3 py-1 bg-gray-200 rounded">{user.ref_code}</code>
          <button
            onClick={copyReferral}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Copy
          </button>
        </div>
        {copied && (
          <p className="text-green-600 mt-2">Referral code copied!</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Wallet</h3>
        <p className="text-lg mt-2">
          Coins: <strong>{user.coins_balance}</strong>
        </p>
      </div>
    </div>
  );
}
