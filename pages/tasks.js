import { useEffect, useState } from "react";
import api from "../lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/tasks/");
        setTasks(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const handleTask = async (task) => {
    setMessage(null);
    setLoadingId(task.id);
    try {
      // 1) Start task
      const startRes = await api.post(`/tasks/start/${task.id}/`, {
        device_id: "web-" + navigator.userAgent,
      });
      const userTaskId = startRes.data.user_task_id;

      // Here you would normally show ad / quiz UI etc.
      // For now we directly call "complete" after minimum time is enforced by backend.

      const completeRes = await api.post(`/tasks/complete/${userTaskId}/`);
      setMessage(
        `Task "${task.title}" completed. Reward: ${completeRes.data.reward_coins} coins.`
      );
    } catch (e) {
      console.error(e);
      if (e.response && e.response.data && e.response.data.detail) {
        setMessage(e.response.data.detail);
      } else {
        setMessage("Error completing task.");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-4">Available Tasks</h1>

      {message && <p className="mb-3 text-sm text-emerald-300">{message}</p>}

      {tasks.length === 0 && <p>No active tasks right now.</p>}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border border-slate-700 rounded-lg p-4 bg-slate-900/60"
          >
            <h2 className="font-semibold text-lg mb-1">{task.title}</h2>
            <p className="text-sm text-slate-300 mb-1">{task.description}</p>
            <p className="text-sm text-emerald-400 mb-3">
              Reward: {task.reward_coins} coins
            </p>

            <button
              className="btn"
              onClick={() => handleTask(task)}
              disabled={loadingId === task.id}
            >
              {loadingId === task.id ? "Working..." : "Do Task"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
