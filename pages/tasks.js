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
      const tasksData = res.data || [];
      console.log("📋 Tasks received from API:", tasksData);
      console.log("📊 Task types:", tasksData.map(t => ({ id: t.id, type: t.type, title: t.title, is_active: t.is_active })));
      setTasks(tasksData);
      if (!tasksData || tasksData.length === 0) {
        setErr("No tasks available. Please contact support or check if tasks were created in the database.");
      } else {
        // Check for specific task types
        const hasScratchCard = tasksData.some(t => t.type === "scratch_card");
        const hasSpinWheel = tasksData.some(t => t.type === "spin_wheel");
        const hasPuzzle = tasksData.some(t => t.type === "puzzle");
        const hasQuiz = tasksData.some(t => t.type === "quiz");
        console.log("✅ Task type check:", { hasScratchCard, hasSpinWheel, hasPuzzle, hasQuiz });
        if (!hasScratchCard || !hasSpinWheel) {
          console.warn("⚠️ Missing tasks:", { hasScratchCard, hasSpinWheel });
        }
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
      <div className="max-w-2xl mx-auto">
        <div className="card fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text">Playing: {activeGame.title}</h2>
              <p className="text-sm text-slate-400 mt-1">{activeGame.description}</p>
            </div>
            <button
              className="btn bg-slate-800 hover:bg-slate-700 border border-slate-700"
              onClick={() => setActiveGame(null)}
            >
              ✕ Close
            </button>
          </div>
          {renderGame(activeGame)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">Tasks</h1>
            <p className="text-slate-400 text-sm">Complete tasks and earn coins</p>
          </div>
          <button className="btn" onClick={loadTasks} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="spinner"></span>
                Loading...
              </span>
            ) : (
              "🔄 Refresh"
            )}
          </button>
        </div>

        {msg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm">{msg}</p>
          </div>
        )}
        {err && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{err}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <span className="spinner mx-auto mb-4"></span>
              <p className="text-slate-400">Loading tasks...</p>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4 opacity-30">📋</div>
            <p className="text-slate-400 mb-2">No tasks available</p>
            <p className="text-sm text-slate-500">Check back later for new tasks</p>
          </div>
        ) : (
          <div className="space-y-4">
          {/* Ad at the top of tasks list */}
          <AdUnit 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP}
            className="mb-4"
          />

            {tasks.map((t, index) => (
              <div key={t.id} className="fade-in">
                <div className="p-5 sm:p-6 rounded-xl border border-slate-800/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all card-hover">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-sm opacity-70">{t.description}</p>

                    <p className="text-sm mt-1">
                      {t.type === "scratch_card" && (
                        <>Reward: <b>20-150 coins</b> (random)</>
                      )}
                      {t.type === "spin_wheel" && (
                        <>Reward: <b>20-150 coins</b> (random)</>
                      )}
                      {t.type === "puzzle" && (
                        <>Reward: <b>50 coins</b> (fixed)</>
                      )}
                      {t.type === "quiz" && (
                        <>Reward: <b>50 coins</b> (fixed)</>
                      )}
                      {!["scratch_card", "spin_wheel", "puzzle", "quiz"].includes(t.type) && (
                        <>Reward: <b>{t.reward_coins || "0"} coins</b></>
                      )}
                    </p>

                    {t.type === "offerwall" && (
                      <p className="text-xs opacity-70 mt-1">
                        Opens CPX Offerwall (earn by completing offers)
                      </p>
                    )}


                    {t.type === "scratch_card" && (
                      <p className="text-xs opacity-70 mt-1">
                        🎫 Scratch and win 20-150 coins instantly!
                      </p>
                    )}

                    {t.type === "spin_wheel" && (
                      <p className="text-xs opacity-70 mt-1">
                        🎡 Spin the wheel to win 20-150 coins instantly!
                      </p>
                    )}

                    {t.type === "puzzle" && (
                      <p className="text-xs opacity-70 mt-1">
                        🧩 Solve correctly to earn 50 coins!
                      </p>
                    )}

                    {t.type === "quiz" && (
                      <p className="text-xs opacity-70 mt-1">
                        ❓ Answer correctly to win 50 coins!
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
                      className="btn w-full sm:w-auto min-w-[120px]"
                      onClick={() => startTask(t)}
                      disabled={busyId === t.id}
                    >
                      {busyId === t.id ? (
                        <span className="flex items-center gap-2">
                          <span className="spinner"></span>
                          Starting...
                        </span>
                      ) : t.type === "offerwall" ? (
                        "Open Offerwall"
                      ) : ["scratch_card", "spin_wheel", "puzzle", "quiz"].includes(t.type) ? (
                        "🎮 Play"
                      ) : (
                        "▶️ Start"
                      )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
