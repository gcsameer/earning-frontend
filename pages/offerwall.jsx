import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

export default function Offerwall() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr(null);
    setLoading(true);
    try {
      // backend must return: { url: "https://..." }
      const res = await api.get("/cpx/wall/");
      const u = res?.data?.url || "";
      if (!u) {
        setErr("Offerwall URL missing from backend response.");
      }
      setUrl(u);
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to load offerwall.");
      setUrl("");
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
            <h1 className="text-3xl font-bold mb-2 gradient-text">Offerwall</h1>
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
              <p className="text-slate-400">Loading offerwall...</p>
            </div>
          </div>
        ) : url ? (
          <div className="rounded-xl overflow-hidden border border-slate-800/50 bg-slate-900/50">
            <iframe
              src={url}
              title="CPX Offerwall"
              className="w-full"
              style={{ height: "80vh", minHeight: "600px", border: "0" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">🎁</div>
            <p className="text-slate-400 mb-2">Offerwall not available</p>
            <p className="text-sm text-slate-500">Please try again later</p>
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            💡 <strong>Tip:</strong> After completing offers, coins are added automatically via CPX postback.
            Check your Wallet to see updates.
          </p>
        </div>
      </div>
    </div>
  );
}
