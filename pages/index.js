import Link from "next/link";
import { getAccessToken } from "../lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [authed, setAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    setAuthed(!!token);
  }, []);

  useEffect(() => {
    if (authed) {
      router.replace("/dashboard");
    }
  }, [authed, router]);

  if (authed) return null;

  return (
    <div className="card mt-10 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Earn extra cash by completing simple tasks
      </h1>
      <p className="text-slate-300 mb-6">
        Watch ads, complete tasks, and withdraw to your eSewa/Khalti account.
      </p>
      <div className="space-x-4">
        <Link href="/register" className="btn">
          Get Started
        </Link>
        <Link href="/login" className="btn bg-slate-700 hover:bg-slate-600">
          Login
        </Link>
      </div>
    </div>
  );
}
