import "../styles/globals.css";
import Layout from "../components/Layout";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Register service worker for PWA
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Unregister old service workers first (for mobile browsers)
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      }).then(() => {
        // Register new service worker
        return navigator.serviceWorker.register("/sw.js", { 
          updateViaCache: 'none',
          scope: '/'
        });
      }).then((registration) => {
        if (process.env.NODE_ENV === 'development') {
          console.log("Service Worker registered:", registration);
        }
        
        // Force immediate update check
        registration.update();
        
        // Check for updates more frequently (every 30 seconds)
        const updateInterval = setInterval(() => {
          registration.update();
        }, 30000);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                clearInterval(updateInterval);
                // Force reload on mobile browsers
                if (window.location) {
                  window.location.reload(true);
                } else {
                  window.location.href = window.location.href;
                }
              }
            });
          }
        });
        
        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'SW_UPDATED') {
            // Service worker updated, reload page
            window.location.reload(true);
          }
        });
        
        // Cleanup interval on unmount
        return () => clearInterval(updateInterval);
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
