import Link from "next/link";
import { useRouter } from "next/router";
import { clearTokens, getAccessToken } from "../lib/api";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(!!getAccessToken());
  }, [router.asPath]);

  const logout = () => {
    clearTokens();
    router.push("/login");
  };

  return (
    <div>
      <div className="w-full border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-emerald-400">
            NepEarn
          </Link>

          <div className="flex gap-5 items-center">
            {authed ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/tasks">Tasks</Link>
                <Link href="/wallet">Wallet</Link>
                <Link href="/withdraw">Withdraw</Link>
                <Link href="/referrals">Referrals</Link>
                <button className="text-red-400" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
