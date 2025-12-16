import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

export default function TapjoyOfferwall() {
  const router = useRouter();
  const [sdkKey, setSdkKey] = useState("");
  const [userId, setUserId] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr(null);
    setLoading(true);
    try {
      const res = await api.get("/tapjoy/wall/");
      setSdkKey(res?.data?.sdk_key || "");
      setUserId(res?.data?.user_id || "");
      
      if (!res?.data?.sdk_key) {
        setErr("Tapjoy SDK key missing from backend response.");
      }
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to load Tapjoy offerwall.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">Tapjoy Offerwall</h1>
            <p className="text-slate-400 text-sm">Complete offers and earn coins</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button className="btn" onClick={load} disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="spinner"></span>
                  Loading...
                </span>
              ) : (
                "🔄 Reload"
              )}
            </button>
            <button className="btn bg-slate-800 hover:bg-slate-700 border border-slate-700" onClick={() => router.push("/wallet")}>
              💰 Wallet
            </button>
          </div>
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{err}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <span className="spinner mx-auto mb-4"></span>
              <p className="text-slate-400">Loading Tapjoy offerwall...</p>
            </div>
          </div>
        ) : sdkKey ? (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-800/50 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold mb-4">Tapjoy Offerwall</h2>
              <p className="text-slate-400 mb-4">
                Tapjoy offerwall is primarily designed for mobile apps. For the best experience, 
                please use our mobile app to access Tapjoy offers.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                <p className="text-blue-400 text-sm">
                  💡 <strong>Tip:</strong> Download our mobile app to access Tapjoy offers and earn more coins!
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm mb-2"><strong>SDK Key:</strong> {sdkKey}</p>
                <p className="text-slate-300 text-sm"><strong>User ID:</strong> {userId}</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm">
                💰 <strong>Note:</strong> After completing offers in the mobile app, coins are added automatically via Tapjoy postback.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">🎁</div>
            <p className="text-slate-400 mb-2">Tapjoy offerwall not available</p>
            <p className="text-sm text-slate-500">Please try again later or use the mobile app</p>
          </div>
        )}
      </div>
    </div>
  );
}

