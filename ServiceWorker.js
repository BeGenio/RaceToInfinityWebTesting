const cacheName = "BeGenio-Race To Infinity-0.10.0_04";
const contentToCache = [
    "Build/5336a4b2c43054286fd70b1faa467eee.loader.js",
    "Build/a64d2a9d7f7823d92362736a2eb27925.framework.js.unityweb",
    "Build/2f7cf14e937963714aebf4114c8bca75.data.unityweb",
    "Build/a088bcb117c9766e24f212824d02cf05.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
