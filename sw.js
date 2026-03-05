// v5 - nuclear cache clear, index.html never cached
const VERSION = 'hf-v5';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ includeUncontrolled: true, type: 'window' }))
      .then(clients => clients.forEach(c => c.postMessage('reload')))
  );
});

// Never cache index.html — always fetch fresh from network
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Let index.html always go to network
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Cache icons and static assets only
  e.respondWith(
    caches.open(VERSION).then(cache =>
      cache.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          cache.put(e.request, res.clone());
          return res;
        })
      )
    )
  );
});
