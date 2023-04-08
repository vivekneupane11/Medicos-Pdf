var CACHE_NAME = 'medicos-pdf-v2022-1-12';
var urlsToCache = [
 
  '/index.css',
  '/web.png',

];

// var urlsToCache = [
//   '../../frontend/src/pages/Home/index.js',
//   '../../frontend/src/pages/Home/index.scss'
//   // '/completed'
// ];
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
      self.skipWaiting();
      
  }
});
// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
    
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    // Try the cache
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    try {
      // Fall back to network
      return await fetch(event.request);
    } catch (err) {
      // If both fail, show a generic fallback:
   console.log('No Internet Connection.')
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    }
  }());
});
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

// Update a service worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// self.addEventListener('activate', event => {
//   var cacheWhitelist = ['medicos-pdf'];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });