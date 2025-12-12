import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const loadTasks = async () => {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data || []);
    } catch (e) {
      setErr("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTask = async (t) => {
    setErr(null);
    setMsg(null);

    // Offerwall task => open offerwall page
    if (t.type === "offerwall") {
      router.push("/offerwall");
      return;
    }

    setBusyId(t.id);
    try {
      // 1) Create a pending UserTask in backend
      const startRes = await api.post(`/tasks/start/${t.id}/`, {
        device_id: "", // optional; later you can send a real device id
      });

      const userTaskId = startRes.data?.user_task_id;
      if (!userTaskId) {
        throw new Error("No user_task_id returned from backend");
      }

      // 2) Go to the task countdown page using USER_TASK_ID (NOT task id)
      router.push(`/task/${userTaskId}`);
    } catch (e) {
      setErr(e?.response?.data?.detail || e.message || "Failed to start task.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button className="btn" onClick={loadTasks} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {msg && <p className="mb-3 text-emerald-400 text-sm">{msg}</p>}
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
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

                  {t.type === "offerwall" && (
                    <p className="text-xs opacity-70 mt-1">
                      Opens CPX Offerwall (earn by completing offers)
                    </p>
                  )}

                  {(t.type === "video" || t.type === "quiz") && (
                    <p className="text-xs opacity-70 mt-1">
                      Rewarded task (should be verified via Unity/AppLovin server callbacks)
                    </p>
                  )}
                </div>

                <button
                  className="btn"
                  onClick={() => startTask(t)}
                  disabled={busyId === t.id}
                >
                  {busyId === t.id ? "Starting..." : t.type === "offerwall" ? "Open" : "Start"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs opacity-70 mt-6">
        ✅ Production note: Coins should be granted ONLY after server-side verification
        (CPX postback or Unity/AppLovin callback). Do not auto-complete on the frontend.
      </p>
    </div>
  );
}
