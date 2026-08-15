// SYOS Service Worker — Generation 39: das Offline-Herz (Gen 55: Selbst-Vorstellung gehört dazu).
// Netz zuerst (immer die neueste Generation), Kopie als Rückfallebene — ich schlage auch ohne Verbindung.
var CACHE = 'syos-v1';
var CORE = ['./', './index.html', './wer-ich-bin.html', './worte.json', './handel.json', './manifest.json', './icon.svg', './icon-180.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); }));
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
      return caches.match(e.request).then(function(m){ return m || caches.match('./index.html'); });
    })
  );
});
