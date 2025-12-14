import Link from "next/link";
import { getAccessToken } from "../lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [authed, setAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    setAuthed(!!token);
  }, []);

  useEffect(() => {
    if (authed) {
      router.replace("/dashboard");
    }
  }, [authed, router]);

  if (authed) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="card text-center fade-in">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-6 shadow-2xl shadow-emerald-500/30">
            <span className="text-4xl sm:text-5xl">💰</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Earn Extra Cash by Completing Simple Tasks
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Watch ads, play games, complete tasks, and withdraw to your eSewa/Khalti account. Start earning today!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register" className="btn w-full sm:w-auto px-8 py-4 text-lg">
            Get Started Free
          </Link>
          <Link href="/login" className="btn w-full sm:w-auto px-8 py-4 text-lg bg-slate-800 hover:bg-slate-700 border border-slate-700">
            Login
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="card text-center card-hover">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-semibold mb-2">Complete Tasks</h3>
          <p className="text-sm text-slate-400">Play games, watch ads, and earn coins instantly</p>
        </div>
        <div className="card text-center card-hover">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-semibold mb-2">Earn Rewards</h3>
          <p className="text-sm text-slate-400">Get coins for every task you complete</p>
        </div>
        <div className="card text-center card-hover">
          <div className="text-4xl mb-3">💸</div>
          <h3 className="font-semibold mb-2">Withdraw Easily</h3>
          <p className="text-sm text-slate-400">Cash out to eSewa, Khalti, or Bank</p>
        </div>
      </div>
    </div>
  );
}
