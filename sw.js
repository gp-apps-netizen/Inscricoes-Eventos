/* Inscrições de Eventos — modo offline
   Guarda o app e as bibliotecas no celular para abrir mesmo sem internet.
   Os dados (eventos e inscritos) ficam no cache do próprio Firebase. */
const CACHE = 'insc-offline-v1';
const LIBS = [
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js'
];
const LIB_HOSTS = ['www.gstatic.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];

async function guardarTudo() {
  const c = await caches.open(CACHE);
  await Promise.all([
    c.add(new Request('./', { cache: 'reload' })).catch(() => {}),
    c.add(new Request('./index.html', { cache: 'reload' })).catch(() => {}),
    ...LIBS.map(u => fetch(u, { mode: 'no-cors' }).then(r => c.put(u, r)).catch(() => {}))
  ]);
}

self.addEventListener('install', e => { e.waitUntil(guardarTudo()); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('insc-offline-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => {
  if (e.data === 'guardar') e.waitUntil(guardarTudo().then(() => e.source && e.source.postMessage('guardado')));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Páginas do app: tenta a internet (para pegar atualizações) e usa a cópia guardada se estiver offline
  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try {
        const r = await fetch(req);
        if (r.ok && (req.mode === 'navigate' || /\.(html|js)$/.test(url.pathname) || url.pathname.endsWith('/'))) {
          c.put(req.mode === 'navigate' ? url.origin + url.pathname : req, r.clone());
        }
        return r;
      } catch (err) {
        const m = await c.match(req, { ignoreSearch: true })
          || (req.mode === 'navigate' && !/\/(admin\/|inscricao\.html)/.test(url.pathname) ? (await c.match(url.origin + url.pathname) || await c.match('./index.html') || await c.match('./')) : null);
        if (m) return m;
        throw err;
      }
    })());
    return;
  }

  // Bibliotecas (Firebase, QR code): versões fixas, usa a cópia guardada
  if (LIB_HOSTS.includes(url.hostname) && /\.js$/.test(url.pathname)) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const m = await c.match(req.url);
      if (m) return m;
      const r = await fetch(req);
      c.put(req.url, r.clone()).catch(() => {});
      return r;
    })());
  }
  // Todo o resto (Firestore, login, fontes) segue direto para a internet
});
