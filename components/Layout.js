import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api, { clearTokens, getAccessToken } from "../lib/api";

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadMe() {
      const token = getAccessToken();
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
      try {
        const res = await api.get("/me/");
        setUser(res.data);
      } catch (e) {
        // invalid token etc
        clearTokens();
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    loadMe();
  }, [router.pathname]);

  const handleLogout = () => {
    clearTokens();
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
        <Link href="/">
          <span className="text-xl font-bold text-emerald-400 cursor-pointer">
            NepEarn
          </span>
        </Link>

        <div className="flex gap-4 items-center text-sm">
          {user && (
            <>
              <span className="hidden sm:inline text-slate-300">
                Coins:{" "}
                <span className="font-semibold text-emerald-400">
                  {user.coins_balance}
                </span>
              </span>
              <Link href="/dashboard" className="hover:text-emerald-400">
                Dashboard
              </Link>
              <Link href="/tasks" className="hover:text-emerald-400">
                Tasks
              </Link>
              <Link href="/wallet" className="hover:text-emerald-400">
                Wallet
              </Link>
              <Link href="/withdraw" className="hover:text-emerald-400">
                Withdraw
              </Link>
              <Link href="/referrals" className="hover:text-emerald-400">
                Referrals
              </Link>
              <button
                onClick={handleLogout}
                className="ml-3 px-3 py-1 rounded bg-red-600 hover:bg-red-500"
              >
                Logout
              </button>
            </>
          )}

          {!user && !loadingUser && (
            <>
              <Link href="/login" className="hover:text-emerald-400">
                Login
              </Link>
              <Link href="/register" className="hover:text-emerald-400">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Content */}
      <main className="px-4 py-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
