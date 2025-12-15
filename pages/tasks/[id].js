"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../../lib/api";
import AdUnit from "../../components/AdUnit";
import NativeAd from "../../components/NativeAd";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query; // THIS IS user_task_id

  const [seconds, setSeconds] = useState(8);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Protect route
  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
    }
  }, [router]);

  // Countdown
  useEffect(() => {
    if (!id) return;
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, id]);

  const completeTask = async () => {
    setErr(null);
    setLoading(true);

    try {
      const res = await api.post(`/tasks/complete/${id}/`);
      alert(`Task completed! +${res.data.reward_coins} coins`);
      router.push("/wallet");
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to complete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-3">Task in Progress</h1>

      {/* Native Advanced Ad at the top of task page */}
      <NativeAd className="mb-4" />
      
      {/* Banner Ad at the top of task page */}
      <AdUnit 
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP}
        className="mb-4"
      />

      <p className="text-lg">
        Please wait <b>{seconds}</b> seconds
      </p>

      {err && <p className="text-red-400 text-sm mt-2">{err}</p>}

      <button
        disabled={seconds > 0 || loading}
        className="btn w-full mt-4"
        onClick={completeTask}
      >
        {loading
          ? "Completing..."
          : seconds > 0
          ? "Waiting..."
          : "Complete Task"}
      </button>

      {/* Ad in the middle */}
      <AdUnit 
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE}
        className="my-4"
      />

      <p className="text-xs opacity-60 mt-3">
        ⚠️ In real production, rewarded ads must be verified via Unity/AppLovin
        callbacks. This delay is only a placeholder.
      </p>

      {/* Ad at the bottom */}
      <AdUnit 
        adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM}
        className="mt-4"
      />
    </div>
  );
}
