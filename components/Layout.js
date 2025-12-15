import Link from "next/link";
import { useRouter } from "next/router";
import { clearTokens, getAccessToken } from "../lib/api";
import { useEffect, useState } from "react";
import CookieConsent from "./CookieConsent";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Professional Header with Glassmorphism */}
      <header className="w-full border-b border-white/10 sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg sm:text-xl">N</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold gradient-text">NepEarn</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {authed ? (
                <>
                  <Link href="/dashboard" className="px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-sm lg:text-base">
                    Dashboard
                  </Link>
                  <Link href="/tasks" className="px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-sm lg:text-base">
                    Tasks
                  </Link>
                  <Link href="/wallet" className="px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-sm lg:text-base">
                    Wallet
                  </Link>
                  <Link href="/withdraw" className="px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-sm lg:text-base">
                    Withdraw
                  </Link>
                  <Link href="/referrals" className="px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-sm lg:text-base">
                    Referrals
                  </Link>
                  <Link href="/offerwall" className="px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-sm lg:text-base">
                    Offerwall
                  </Link>
                  <Link href="/faq" className="px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-sm lg:text-base">
                    FAQ
                  </Link>
                  <button 
                    className="px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-sm lg:text-base"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="btn text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Slide down animation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-md animate-fade-in">
            <nav className="px-4 py-4 space-y-1">
              {authed ? (
                <>
                  <Link href="/dashboard" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    📊 Dashboard
                  </Link>
                  <Link href="/tasks" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    🎯 Tasks
                  </Link>
                  <Link href="/wallet" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    💰 Wallet
                  </Link>
                  <Link href="/withdraw" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    💸 Withdraw
                  </Link>
                  <Link href="/referrals" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    👥 Referrals
                  </Link>
                  <Link href="/offerwall" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    🎁 Offerwall
                  </Link>
                  <Link href="/faq" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    ❓ FAQ
                  </Link>
                  <button 
                    className="block w-full text-left px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors" 
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="block px-4 py-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content with better spacing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="text-white font-semibold mb-3">NepEarn</h3>
              <p className="text-slate-400 text-sm">
                Earn rewards by completing simple tasks and playing games.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy-policy" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@nepearn.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    support@nepearn.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-4">
            <p className="text-center text-sm text-slate-400">
              © {new Date().getFullYear()} NepEarn. All rights reserved. | 
              <Link href="/privacy-policy" className="ml-1 text-emerald-400 hover:text-emerald-300">Privacy</Link> | 
              <Link href="/terms-of-service" className="ml-1 text-emerald-400 hover:text-emerald-300">Terms</Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
