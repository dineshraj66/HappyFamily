// Force clear all old caches and unregister
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.matchAll())
      .then(clients => clients.forEach(c => c.postMessage('reload')))
  );
  self.clients.claim();
});
// No fetch handler = no caching, always fetch fresh from network
