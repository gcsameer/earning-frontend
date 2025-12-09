"use client";

import { useEffect, useState } from "react";

export default function Register() {
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralCode(ref);
    }
  }, []);

  return (
    <input
      type="text"
      value={referralCode}
      onChange={(e) => setReferralCode(e.target.value)}
      placeholder="Referral Code (optional)"
    />
  );
}
