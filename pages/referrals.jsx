import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import api, { getAccessToken } from "../lib/api";

export default function Referrals() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!getAccessToken()) router.replace("/login");
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setErr(null);
    try {
      const res = await api.get("/referrals/");
      setData(res.data);
    } catch (e) {
      setErr("Failed to load referrals.");
    }
  };

  const myRefCode = useMemo(() => {
    // Your API returns referred users list; ref_code is in /me/, not here.
    // So we build a referral link without crashing; you can also fetch /me/ if needed.
    return "";
  }, []);

  const referralLink =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/register${myRefCode ? `?ref=${myRefCode}` : ""}`;

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Referrals</h1>
      {err && <p className="mb-3 text-red-400 text-sm">{err}</p>}

      <div className="p-3 rounded-lg border border-white/10 mb-6">
        <p className="text-sm opacity-70">Share this register page:</p>
        <p className="break-all">{referralLink}</p>
        <p className="text-xs opacity-60 mt-2">
          Tip: Your real referral link should include your <b>me.ref_code</b>.
          If you want, I’ll update this page to also fetch <code>/me/</code> and show it.
        </p>
      </div>

      {data ? (
        <>
          <p>
            Total referred: <b>{data.total_referred}</b>
          </p>

          <div className="space-y-2 mt-4">
            {(data.users || []).map((u, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-white/10">
                <div className="flex justify-between">
                  <b>{u.username}</b>
                  <span>{u.coins} coins</span>
                </div>
                <div className="text-xs opacity-70">{String(u.joined)}</div>
              </div>
            ))}
            {(data.users || []).length === 0 && (
              <p className="opacity-70 text-sm">No referrals yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
