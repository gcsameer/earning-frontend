// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api, { clearTokens, getAccessToken } from "../lib/api";

export default function Layout({ children }) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [username, setUsername] = useState(null);

  // Check auth on page load / route change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = getAccessToken();

    if (!token) {
      setIsAuthed(false);
      setUsername(null);
      setLoadingUser(false);
      return;
    }

    // Optional: verify token by calling /me/
    (async () => {
      try {
        const res = await api.get("/me/");
        setIsAuthed(true);
        setUsername(res.data.username);
      } catch (err) {
        console.warn("Failed to load user, clearing tokens", err);
        clearTokens();
        setIsAuthed(false);
        setUsername(null);
      } finally {
        setLoadingUser(false);
      }
    })();
  }, [router.pathname]);

  const handleLogout = () => {
    clearTokens();
    setIsAuthed(false);
    setUsername(null);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/">
            <span className="font-semibold text-emerald-400 text-lg cursor-pointer">
              NepEarn
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            {!loadingUser && isAuthed && (
              <>
                <span className="text-slate-400 hidden sm:inline">
                  {username ? `Hi, ${username}` : "Logged in"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs"
                >
                  Logout
                </button>
              </>
            )}

            {!loadingUser && !isAuthed && (
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

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-4 pb-16">{children}</main>
    </div>
  );
}
