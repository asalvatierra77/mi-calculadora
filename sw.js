const CACHE_NAME = 'calculadora-pwa-v3'; // Cambia la versión de nuevo
// Lista de archivos a cachear con rutas ABSOLUTAS
const urlsToCache = [
  '/mi-calculadora/',
  '/mi-calculadora/index.html',
  '/mi-calculadora/styles.css',
  '/mi-calculadora/app.js',
  '/mi-calculadora/manifest.json',
  '/mi-calculadora/sw.js', // ¡Importante cachearse a sí mismo!
  '/mi-calculadora/icons/icon-192.png',
  '/mi-calculadora/icons/icon-512.png'
];

// Instalar el SW y cachear los recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Estrategia de recuperación: Cache First
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) // Intenta encontrar el recurso en la cache
      .then(response => {
        // Si está en la cache, lo devuelve
        if (response) {
          return response;
        }
        // Si no está, lo pide a la red
        return fetch(event.request);
      }
    )
  );
});