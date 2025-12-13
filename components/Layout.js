import Link from "next/link";
import { useRouter } from "next/router";
import { clearTokens, getAccessToken } from "../lib/api";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setAuthed(!!getAccessToken());
  }, [router.asPath]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  const logout = () => {
    clearTokens();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="w-full border-b border-white/10 sticky top-0 bg-slate-900 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-emerald-400">
            NepEarn
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-5 items-center">
            {authed ? (
              <>
                <Link href="/dashboard" className="hover:text-emerald-400 transition">Dashboard</Link>
                <Link href="/tasks" className="hover:text-emerald-400 transition">Tasks</Link>
                <Link href="/wallet" className="hover:text-emerald-400 transition">Wallet</Link>
                <Link href="/withdraw" className="hover:text-emerald-400 transition">Withdraw</Link>
                <Link href="/referrals" className="hover:text-emerald-400 transition">Referrals</Link>
                <Link href="/offerwall" className="hover:text-emerald-400 transition">Offerwall</Link>
                <button className="text-red-400 hover:text-red-300 transition" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-emerald-400 transition">Login</Link>
                <Link href="/register" className="hover:text-emerald-400 transition">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-800">
            <div className="px-4 py-4 space-y-3">
              {authed ? (
                <>
                  <Link href="/dashboard" className="block py-2 hover:text-emerald-400 transition">Dashboard</Link>
                  <Link href="/tasks" className="block py-2 hover:text-emerald-400 transition">Tasks</Link>
                  <Link href="/wallet" className="block py-2 hover:text-emerald-400 transition">Wallet</Link>
                  <Link href="/withdraw" className="block py-2 hover:text-emerald-400 transition">Withdraw</Link>
                  <Link href="/referrals" className="block py-2 hover:text-emerald-400 transition">Referrals</Link>
                  <Link href="/offerwall" className="block py-2 hover:text-emerald-400 transition">Offerwall</Link>
                  <button className="block w-full text-left py-2 text-red-400 hover:text-red-300 transition" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2 hover:text-emerald-400 transition">Login</Link>
                  <Link href="/register" className="block py-2 hover:text-emerald-400 transition">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
