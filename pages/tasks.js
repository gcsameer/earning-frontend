import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) router.replace("/login");
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTasks = async () => {
    setErr(null);
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data || []);
    } catch (e) {
      setErr("Failed to load tasks.");
    }
  };

  const startTask = async (taskId) => {
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await api.post(`/tasks/start/${taskId}/`, { device_id: "" });
      setMsg(`Task started. user_task_id=${res.data.user_task_id}`);
      // Demo: immediately complete (replace this later with real ad verification)
      const complete = await api.post(`/tasks/complete/${res.data.user_task_id}/`);
      setMsg(`Completed! +${complete.data.reward_coins} coins`);
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to start/complete task.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {msg && <p className="mb-3 text-emerald-400 text-sm">{msg}</p>}
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => (
            <div key={t.id} className="p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm opacity-70">{t.description}</p>
                  <p className="text-sm mt-1">
                    Reward: <b>{t.reward_coins}</b> coins
                  </p>
                </div>
                <button
                  className="btn"
                  disabled={busy}
                  onClick={() => startTask(t.id)}
                >
                  {busy ? "Working..." : "Earn"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs opacity-70 mt-5">
        Note: Right now “Earn” completes immediately. For real ad revenue, you
        must verify ad completion server-side (AdMob/Unity callbacks).
      </p>
    </div>
  );
}
