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
    <div className="card">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h1 className="text-2xl font-bold">Offerwall</h1>

        <div className="flex gap-2">
          <button className="btn" onClick={load} disabled={loading}>
            {loading ? "Loading..." : "Reload"}
          </button>
          <button className="btn" onClick={() => router.push("/wallet")}>
            Wallet
          </button>
        </div>
      </div>

      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      {loading ? (
        <p>Loading offerwall...</p>
      ) : url ? (
        <iframe
          src={url}
          title="CPX Offerwall"
          style={{ width: "100%", height: "80vh", border: "0" }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      ) : (
        <p>Offerwall not available.</p>
      )}

      <p className="text-xs opacity-70 mt-3">
        After completing offers, coins are added automatically (via CPX postback).
        Open Wallet to see updates.
      </p>
    </div>
  );
}
