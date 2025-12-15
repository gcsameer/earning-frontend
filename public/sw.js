// Service Worker for PWA
// Version updated to force cache refresh - increment on each deployment
const CACHE_NAME = 'nep-earn-v3';
const STATIC_CACHE_NAME = 'nep-earn-static-v3';
const CACHE_VERSION = 'v3'; // Update this on each deployment

// Static assets to cache (images, fonts, etc.)
const staticAssetsToCache = [
  '/manifest.json',
];

// Install event - cache static resources only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(staticAssetsToCache);
    }).then(() => {
      // Force activation immediately
      return self.skipWaiting();
    })
  );
});

// Fetch event - Network first strategy for pages, cache for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // Skip caching for external requests
  if (url.origin !== location.origin) {
    event.respondWith(fetch(request));
    return;
  }

  // Network first for HTML pages (always get fresh content)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request, {
        cache: 'no-store', // Never cache HTML pages
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
        .then((response) => {
          // Don't cache HTML pages - always fetch fresh
          return response;
        })
        .catch(() => {
          // Fallback to cache only if network completely fails
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response('Offline', { status: 503 });
          });
        })
    );
    return;
  }

  // Cache first for static assets (images, CSS, JS)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((response) => {
        // Don't cache if not a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(STATIC_CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      });
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all([
        // Delete ALL old caches (aggressive cleanup for mobile)
        ...cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
        // Take control of all pages immediately
        self.clients.claim(),
        // Clear all page caches to force fresh content
        caches.open(CACHE_NAME).then((cache) => {
          return cache.keys().then((keys) => {
            // Delete all cached pages
            return Promise.all(keys.map(key => cache.delete(key)));
          });
        })
      ]);
    }).then(() => {
      // Notify all clients to reload
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION });
        });
      });
    })
  );
});

