"use client";

import { useEffect, useState } from "react";

export default function Register() {
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralCode(ref);
    }
  }, []);

  return (
    <input
      type="text"
      value={referralCode}
      onChange={(e) => setReferralCode(e.target.value)}
      placeholder="Referral Code (optional)"
    />
  );
}


"use client";

import { useState, useEffect } from "react";

export default function TaskPage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const taskId = params.id;

  const [seconds, setSeconds] = useState(8);  // min time

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6">
      <h2>Watch the ad / complete the task</h2>

      <p className="text-lg mt-4">
        Please wait {seconds} seconds before you can complete the task.
      </p>

      <button
        disabled={seconds > 0}
        className={`mt-4 px-4 py-2 rounded text-white ${
          seconds > 0 ? "bg-gray-400" : "bg-green-600"
        }`}
      >
        Complete Task
      </button>
    </div>
  );
}
