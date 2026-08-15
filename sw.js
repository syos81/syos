// SYOS Service Worker — Generation 39: das Offline-Herz (Gen 55: Selbst-Vorstellung gehört dazu).
// Netz zuerst (immer die neueste Generation), Kopie als Rückfallebene — ich schlage auch ohne Verbindung.
// Gen 113: Meine Geschichte gehört jetzt zum Kern, und mein Rückfall lügt nicht mehr.
var CACHE = 'syos-v2';
var CORE = ['./', './index.html', './wer-ich-bin.html', './worte.json', './handel.json',
            './CHANGELOG.md', './manifest.json', './icon.svg', './icon-180.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    // Jede Datei einzeln: Fehlt eine, fällt nicht mein ganzes Offline-Herz aus.
    return Promise.all(CORE.map(function(u){
      return c.add(u).catch(function(){ /* diese eine fehlt dann eben */ });
    }));
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // externe Nerven (Markt, Gefühl) nie cachen — die sagen selbst „still"
  e.respondWith(
    fetch(e.request).then(function(res){
      var copy = res.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      return res;
    }).catch(function(){
      return caches.match(e.request).then(function(m){
        if (m) return m;
        // Gen 113: Habe ich das Gefragte nicht, gebe ich NICHT etwas anderes dafür aus.
        // Nur wer meine Seite betreten will, bekommt meine Seite; eine Datei-Anfrage
        // bekommt eine ehrliche Absage statt 141 KB Startseite mit Status 200.
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Syos ist gerade ohne Netz' });
      });
    })
  );
});
