import Link from "next/link";
import { useRouter } from "next/router";
import { clearTokens, getAccessToken } from "../lib/api";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(!!getAccessToken());
  }, [router.pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Are you sure you want to log out?");
      if (!confirmed) return;
    }
    clearTokens();
    router.push("/login");
  };

  return (
    <div>
      <nav className="bg-slate-900 border-b border-slate-800 mb-6">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <span className="font-bold text-xl text-emerald-400 cursor-pointer">
              NepEarn
            </span>
          </Link>
          <div className="space-x-4">
            {authed && (
              <>
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
                <button
                  className="ml-4 text-sm text-red-400 hover:text-red-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
            {!authed && (
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
        </div>
      </nav>
      <main className="container">{children}</main>
    </div>
  );
}
