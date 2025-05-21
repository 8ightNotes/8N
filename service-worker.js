const CACHE_NAME = '8ightnotes-cache-v1';
const urlsToCache = [
  './', // Caches the root URL
  './index.html',
  './style.css',
  './images/8ightnotesimage.jpg', // Your background image
  './images/icon-192x192.png', // Your PWA icons
  './images/icon-512x512.png',
  // Add any other crucial assets here that you want to be available offline,
  // like local font files if you had them, or more images.
];

// Install event: Caches the assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serves cached content first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: Cleans up old caches (optional, but good for updates)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
