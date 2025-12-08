import { useEffect, useState } from "react";
import api, { getAccessToken } from "../lib/api";
import { useRouter } from "next/router";

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    api
      .get("/tasks/")
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error(err);
        router.replace("/login");
      });
  }, [router]);

  const handleStartAndComplete = async (taskId) => {
    try {
      setLoadingId(taskId);
      // in real life, you'd load an ad, then complete after callback
      const startRes = await api.post(`/tasks/start/${taskId}/`, {
        device_id: "web-device-123",
      });
      const userTaskId = startRes.data.user_task_id;
      await new Promise((res) => setTimeout(res, 2000)); // simulate watch time
      const completeRes = await api.post(`/tasks/complete/${userTaskId}/`);
      alert(
        `Task completed! You earned ${completeRes.data.reward_coins} coins.`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to complete task.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="mt-6">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Available Tasks</h1>
        <p className="text-slate-300 text-sm">
          For now, click &quot;Start & Complete&quot; to simulate watching an ad.
          Later you&apos;ll integrate real ad networks here.
        </p>
      </div>

      {tasks.length === 0 && (
        <p className="text-center mt-4 text-slate-400">No tasks available.</p>
      )}

      {tasks.map((task) => (
        <div key={task.id} className="card flex justify-between items-center">
          <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-slate-400 text-sm">{task.description}</p>
            <p className="text-emerald-400 text-sm mt-1">
              Reward: {task.reward_coins} coins
            </p>
          </div>
          <button
            className="btn"
            onClick={() => handleStartAndComplete(task.id)}
            disabled={loadingId === task.id}
          >
            {loadingId === task.id ? "Processing..." : "Start & Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
