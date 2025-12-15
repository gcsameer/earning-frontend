import "../styles/globals.css";
import Layout from "../components/Layout";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Register service worker for PWA
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          if (process.env.NODE_ENV === 'development') {
            console.log("Service Worker registered:", registration);
          }
        })
        .catch((error) => {
          // Log service worker errors even in production (important for debugging PWA)
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
