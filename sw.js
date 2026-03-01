// v4 - clears all caches, no caching going forward
const CACHE_VERSION = 'hf-v4';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => {
        console.log('Deleting cache:', k);
        return caches.delete(k);
      })))
      .then(() => self.clients.matchAll({ includeUncontrolled: true }))
      .then(clients => clients.forEach(c => c.postMessage('reload')))
  );
  return self.clients.claim();
});
// No fetch handler = always load fresh from network, never cached
