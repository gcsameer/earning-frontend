"use client";

import { useEffect, useState } from "react";

export default function ReferralsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    fetch(`${API_URL}/api/referrals/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Referral Analytics</h2>

      <p>Total referred users: <strong>{data.total_referred}</strong></p>

      <div className="mt-4 space-y-2">
        {data.users.map((u, i) => (
          <div key={i} className="p-3 border rounded bg-gray-50">
            <p><strong>{u.username}</strong></p>
            <p>Joined: {new Date(u.joined).toLocaleDateString()}</p>
            <p>Coins: {u.coins}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";

export default function Dashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [message, setMessage] = useState(null);

  const claimBonus = async () => {
    const token = localStorage.getItem("access");

    const res = await fetch(`${API_URL}/api/daily-bonus/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setMessage(data.message || data.detail);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <button
        onClick={claimBonus}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Claim Daily Bonus
      </button>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    fetch(`${API_URL}/api/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-500 text-sm">Coins Balance</p>
          <p className="text-3xl font-bold">{user.coins_balance}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-500 text-sm">Referral Code</p>
          <p className="text-xl font-semibold">{user.ref_code}</p>
        </div>
      </div>

      <div className="mt-6">
        <a href="/tasks" className="block p-4 bg-green-600 text-white rounded text-center">
          View Tasks
        </a>
      </div>
    </div>
  );
}
