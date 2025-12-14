import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";
import AdUnit from "../components/AdUnit";
import ScratchCard from "../components/tasks/ScratchCard";
import SpinWheel from "../components/tasks/SpinWheel";
import Puzzle from "../components/tasks/Puzzle";
import Quiz from "../components/tasks/Quiz";

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const loadTasks = async () => {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data || []);
      if (!res.data || res.data.length === 0) {
        setErr("No tasks available. Please contact support or check if tasks were created in the database.");
      }
    } catch (e) {
      console.error("Tasks API Error:", e);
      const errorMsg = e?.response?.data?.detail || e?.message || "Failed to load tasks.";
      setErr(`Failed to load tasks: ${errorMsg}. Status: ${e?.response?.status || 'Unknown'}`);
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

    // Game-based tasks (instant completion)
    const gameTypes = ["scratch_card", "spin_wheel", "puzzle", "quiz"];
    if (gameTypes.includes(t.type)) {
      setActiveGame(t);
      return;
    }

    // Regular tasks (with countdown)
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

  const handleGameComplete = (result) => {
    setMsg(`🎉 Task completed! You earned ${result.reward_coins} coins!`);
    setActiveGame(null);
    // Refresh tasks list
    loadTasks();
    // Optionally refresh user balance
    setTimeout(() => {
      setMsg(null);
    }, 5000);
  };

  // Render game component based on task type
  const renderGame = (task) => {
    switch (task.type) {
      case "scratch_card":
        return <ScratchCard task={task} onComplete={handleGameComplete} />;
      case "spin_wheel":
        return <SpinWheel task={task} onComplete={handleGameComplete} />;
      case "puzzle":
        return <Puzzle task={task} onComplete={handleGameComplete} />;
      case "quiz":
        return <Quiz task={task} onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  // If a game is active, show it in a modal
  if (activeGame) {
    return (
      <div className="card max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Playing: {activeGame.title}</h2>
          <button
            className="btn bg-slate-700 hover:bg-slate-600"
            onClick={() => setActiveGame(null)}
          >
            Close
          </button>
        </div>
        {renderGame(activeGame)}
      </div>
    );
  }

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
          {/* Ad at the top of tasks list */}
          <AdUnit 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP}
            className="mb-4"
          />

          {tasks.map((t, index) => (
            <div key={t.id}>
              <div className="p-4 rounded-xl border border-white/10">
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

                    {(t.type === "video") && (
                      <p className="text-xs opacity-70 mt-1">
                        Rewarded task (should be verified via Unity/AppLovin server callbacks)
                      </p>
                    )}

                    {t.type === "scratch_card" && (
                      <p className="text-xs opacity-70 mt-1">
                        🎫 Scratch and win instant coins!
                      </p>
                    )}

                    {t.type === "spin_wheel" && (
                      <p className="text-xs opacity-70 mt-1">
                        🎡 Spin the wheel to win coins!
                      </p>
                    )}

                    {t.type === "puzzle" && (
                      <p className="text-xs opacity-70 mt-1">
                        🧩 Solve the puzzle to earn coins!
                      </p>
                    )}

                    {t.type === "quiz" && (
                      <p className="text-xs opacity-70 mt-1">
                        ❓ Answer correctly to win coins!
                      </p>
                    )}
                  </div>

                  <button
                    className="btn"
                    onClick={() => startTask(t)}
                    disabled={busyId === t.id}
                  >
                    {busyId === t.id 
                      ? "Starting..." 
                      : t.type === "offerwall" 
                      ? "Open" 
                      : ["scratch_card", "spin_wheel", "puzzle", "quiz"].includes(t.type)
                      ? "Play"
                      : "Start"}
                  </button>
                </div>
              </div>

              {/* Show ad after every 3rd task */}
              {(index + 1) % 3 === 0 && index < tasks.length - 1 && (
                <AdUnit 
                  adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE}
                  className="my-4"
                />
              )}
            </div>
          ))}

          {/* Ad at the bottom of tasks list */}
          <AdUnit 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM}
            className="mt-4"
          />
        </div>
      )}

      <p className="text-xs opacity-70 mt-6">
        ✅ Production note: Coins should be granted ONLY after server-side verification
        (CPX postback or Unity/AppLovin callback). Do not auto-complete on the frontend.
      </p>
    </div>
  );
}
