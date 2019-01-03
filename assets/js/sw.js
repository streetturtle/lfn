const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    '/lfn/#',
    '/lfn/index.html',
    '/lfn/assets/css/materialize.css',
    '/lfn/assets/css/app.css',
    '/lfn/assets/js/app.js',
    '/lfn/assets/js/written-number.min.js',
    '/lfn/assets/js/materialize.min.js',
];

// The install handler takes care of precaching the resources we always need.
// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(PRECACHE)
//             .then(cache => cache.addAll(PRECACHE_URLS))
//             .then(self.skipWaiting())
//     );
// });

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(PRECACHE).then(function(cache) {
            return cache.addAll(
                [
                    '/lfn/#',
                    '/lfn/index.html',
                    '/lfn/assets/css/materialize.css',
                    '/lfn/assets/css/app.css',
                    '/lfn/assets/js/app.js',
                    '/lfn/assets/js/written-number.min.js',
                    '/lfn/assets/js/materialize.min.js',
                ]
            );
        })
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
// self.addEventListener('fetch', event => {
//     // Skip cross-origin requests, like those for Google Analytics.
//     if (event.request.url.startsWith(self.location.origin)) {
//         event.respondWith(
//             caches.match(event.request).then(cachedResponse => {
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 }
//
//                 return caches.open(RUNTIME).then(cache => {
//                     return fetch(event.request).then(response => {
//                         // Put a copy of the response in the runtime cache.
//                         return cache.put(event.request, response.clone()).then(() => {
//                             return response;
//                         });
//                     });
//                 });
//             })
//         );
//     }
// });


// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//                     // Cache hit - return response
//                     if (response) {
//                         return response;
//                     }
//                     return fetch(event.request);
//                 }
//             )
//     );
// });


// self.addEventListener('fetch', event => {
//     // We only want to call event.respondWith() if this is a navigation request
//     // for an HTML page.
//     // request.mode of 'navigate' is unfortunately not supported in Chrome
//     // versions older than 49, so we need to include a less precise fallback,
//     // which checks for a GET request with an Accept: text/html header.
//     if (event.request.mode === 'navigate' ||
//         (event.request.method === 'GET' &&
//             event.request.headers.get('accept').includes('text/html'))) {
//         console.log('Handling fetch event for', event.request.url);
//         event.respondWith(
//             fetch(event.request).catch(error => {
//                 // The catch is only triggered if fetch() throws an exception, which will most likely
//                 // happen due to the server being unreachable.
//                 // If fetch() returns a valid HTTP response with an response code in the 4xx or 5xx
//                 // range, the catch() will NOT be called. If you need custom handling for 4xx or 5xx
//                 // errors, see https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/fallback-response
//                 console.log('Fetch failed; returning offline page instead.', error);
//                 return caches.match(event.request);
//             })
//         );
//     }
// });

self.addEventListener('fetch', function(event) {
    // event.respondWith(caches.match(event.request));

    event.respondWith(
        caches.open(PRECACHE).then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});