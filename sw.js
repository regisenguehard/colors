// On écoute l'évènement install pour effectuer les actions de démarrage
self.addEventListener("install", function(event) {
  // Ici on utilise waitUntil qui attends une promesse pour valider l'installation
  event.waitUntil(
    caches.open("cache-v1").then(function(cache) {
      // On met en cache une liste d'URLs qui sont la fondation de notre app.
      return cache.addAll([
          "/",
          "/favicon-16x16.png",
          "/safari-pinned-tab.svg",
          "/favicon.ico",
          "/apple-touch-icon.png",
          "/css/styles.css",
          "/images/android-chrome-192x192.jpg",
          "/images/pencils-452238_640x192.jpg",
          "/images/android-chrome-512x512.jpg",
          "/images/mstile-150x150.png",
          "/images/pencils-452238_640x512.jpg",
          "/app.js",
          "/manifest.json",
          "/favicon-32x32.png"
      ]);
    })
  );
});

// On indique que pour chaque requêtes, si cela match nos URLs de cache défini plus haut, alors on servira le cache plutôt que d'effectuer la vrai requête par le réseau.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache HIT, on retourne la réponse en cache.
        if (response) {
          return response;
        }
        // Sinon on effectue la requête réellement et on retourne son contenu.
        return fetch(event.request);
      }
    )
  );
});