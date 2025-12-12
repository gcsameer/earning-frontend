// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api, { getAccessToken, clearTokens } from "../lib/api";

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // On route change / first load, check if we’re logged in
  useEffect(() => {
    async function loadUser() {
      if (typeof window === "undefined") return;

      const token = getAccessToken();
      if (!token) {
        setUser(null);
        setChecking(false);
        return;
      }

      try {
        const res = await api.get("/me/");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch /me/", err);
        clearTokens();
        setUser(null);
      } finally {
        setChecking(false);
      }
    }

    loadUser();
  }, [router.pathname]);

  const handleLogout = () => {
    clearTokens();
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/">
            <span className="font-bold text-xl text-emerald-400 cursor-pointer">
              NepEarn
            </span>
          </Link>

          <nav className="space-x-4 text-sm">
            {user ? (
              <>
                <span className="text-slate-300">
                  Hi, <span className="font-semibold">{user.username}</span>
                </span>
                <Link href="/dashboard" className="hover:text-emerald-400">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-rose-400 hover:text-rose-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-emerald-400">
                  Login
                </Link>
                <Link href="/register" className="hover:text-emerald-400">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* You could show a spinner while checking, but not required */}
        {children}
      </main>
    </div>
  );
}
