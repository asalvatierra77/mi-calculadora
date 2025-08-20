const CACHE_NAME = 'calculadora-pwa-v2'; // Cambia el versionado
const REPO_NAME = '/mi-calculadora/'; // ¡¡CAMBIA ESTO por el nombre de TU repositorio!!

// Lista de archivos a cachear (usando el nombre del repo)
const urlsToCache = [
  '', // Esto cacheará la raíz de tu repo, que es index.html
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
].map(path => REPO_NAME + path); // Esto antepone el nombre del repo a cada path

// Instalar el SW y cachear los recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Estrategia de recuperación: Cache First, luego Network
self.addEventListener('fetch', event => {
  // Construye la URL correcta para la petición, considerando el repo
  let requestUrl = new URL(event.request.url);
  let pathToCheck = requestUrl.pathname;

  // Solo maneja peticiones que estén dentro de tu repositorio
  if (pathToCheck.startsWith(REPO_NAME)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Devuelve el recurso desde la cache si está, si no, lo pide a la red.
          return response || fetch(event.request);
        })
    );
  }
  // Si la petición no es para tu repo, deja que el navegador la maneje normal.
});