const CACHE = "purple-bytes-v1";
const PRECACHE = ["/", "/manifest.webmanifest", "/prplbyts.svg", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function saveAndReturn(request, response, cacheKey = request) {
  if (response.ok) {
    const cache = await caches.open(CACHE);
    await cache.put(cacheKey, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Pages: use the latest version when online, the saved copy when offline
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => saveAndReturn(request, response, "/"))
        .catch(() => caches.match("/"))
    );
    return;
  }

  // Built files have a unique name per version, so a saved copy is always correct
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then((saved) => saved || fetch(request).then((response) => saveAndReturn(request, response)))
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => saveAndReturn(request, response))
      .catch(() => caches.match(request))
  );
});
