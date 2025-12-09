"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query; // task ID from URL

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [seconds, setSeconds] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6">
      <h2>Task ID: {id}</h2>

      <p className="text-lg mt-4">
        Please wait {seconds} seconds before you can complete the task.
      </p>

      <button
        disabled={seconds > 0}
        className={`mt-4 px-4 py-2 rounded text-white ${
          seconds > 0 ? "bg-gray-400" : "bg-green-600"
        }`}
        onClick={() => alert("Task completed!")}
      >
        Complete Task
      </button>
    </div>
  );
}
