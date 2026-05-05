const CACHE_NAME = 'amn-portfolio-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './home.html',
  './about.html',
  './github.html',
  './skills.html',
  './experience.html',
  './education.html',
  './certificates.html',
  './contact.html',
  'https://cdn.tailwindcss.com',
  'https://code.jquery.com/jquery-3.6.0.min.js'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event (Network First Strategy)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});