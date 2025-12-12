import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return String(iso || "");
  }
}

export default function Referrals() {
  const router = useRouter();

  const [me, setMe] = useState(null);
  const [data, setData] = useState(null);

  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const [meRes, refRes] = await Promise.all([api.get("/me/"), api.get("/referrals/")]);
      setMe(meRes.data);
      setData(refRes.data);
    } catch (e) {
      setErr("Failed to load referrals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const referralLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const code = me?.ref_code || "";
    return `${window.location.origin}/register${code ? `?ref=${encodeURIComponent(code)}` : ""}`;
  }, [me]);

  const copy = async () => {
    setMsg(null);
    setErr(null);
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setMsg("Referral link copied!");
      setTimeout(() => setMsg(null), 1500);
    } catch {
      // fallback: still show link, user can select/copy manually
      setErr("Could not copy automatically. Please copy the link manually.");
    }
  };

  const share = async () => {
    setMsg(null);
    setErr(null);
    if (!referralLink) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "NepEarn Referral",
          text: "Join using my referral link:",
          url: referralLink,
        });
      } else {
        await copy();
      }
    } catch {
      // user cancelled share -> ignore
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">Referrals</h1>
        <button className="btn" onClick={loadAll} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {msg && <p className="mb-3 text-emerald-400 text-sm">{msg}</p>}
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      <div className="p-4 rounded-xl border border-white/10 mb-6 space-y-2">
        <p className="text-sm opacity-70">Your referral code:</p>
        <p className="text-lg font-semibold">{me?.ref_code || "-"}</p>

        <p className="text-sm opacity-70 mt-3">Your referral link:</p>
        <p className="break-all">{referralLink || "-"}</p>

        <div className="flex gap-3 mt-3 flex-wrap">
          <button className="btn" onClick={copy} disabled={!referralLink}>
            Copy link
          </button>
          <button className="btn" onClick={share} disabled={!referralLink}>
            Share
          </button>
        </div>

        <p className="text-xs opacity-60">
          Share this link. When someone registers using it, your backend awards referral bonus.
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <p>
            Total referred: <b>{data.total_referred || 0}</b>
          </p>

          <div className="space-y-2 mt-4">
            {(data.users || []).map((u, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-white/10">
                <div className="flex justify-between items-center gap-3">
                  <b>{u.username}</b>
                  <span>{u.coins} coins</span>
                </div>
                <div className="text-xs opacity-70">{formatDate(u.joined)}</div>
              </div>
            ))}
            {(data.users || []).length === 0 && (
              <p className="opacity-70 text-sm">No referrals yet.</p>
            )}
          </div>
        </>
      ) : (
        <p className="opacity-70">No data.</p>
      )}
    </div>
  );
}
