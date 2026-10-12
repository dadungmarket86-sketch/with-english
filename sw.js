/* =========================================================
   서비스워커 — 한 번 열어 본 뒤에는 인터넷 없이도 앱이 열리게 합니다.
   - 앱 파일: 설치할 때 미리 저장해 두고, 열 때는 저장본을 바로 보여 준 뒤
     뒤에서 새 버전을 받아 둡니다 (다음에 열 때 반영)
   - 글꼴(구글 폰트·Pretendard): 처음 받을 때 저장해서 다음부터 저장본 사용
   파일을 추가·삭제했다면 아래 APP_FILES 를 고치고 VERSION 숫자를 올리세요.
   ========================================================= */
const VERSION = 'v1';
const APP_CACHE = 'we-app-' + VERSION;
const FONT_CACHE = 'we-fonts';

const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './css/base.css',
  './css/components.css',
  './css/screens.css',
  './css/tokens.css',
  './data/categories.js',
  './data/dialogs.js',
  './data/words.js',
  './js/app.js',
  './js/cards.js',
  './js/home.js',
  './js/icons.js',
  './js/quiz.js',
  './js/speech.js',
  './js/stats.js',
  './js/storage.js',
  './js/talk.js',
  './js/ui.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(APP_CACHE).then((c) => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

/* 예전 버전 저장본 지우기 */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('we-app-') && k !== APP_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 글꼴: 저장본 우선, 없으면 받아서 저장
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net/.test(url.host)) {
    e.respondWith(caches.open(FONT_CACHE).then((c) =>
      c.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok || res.type === 'opaque') c.put(req, res.clone());
        return res;
      }))
    ));
    return;
  }

  // 앱 파일: 저장본을 바로 주고, 뒤에서 새로 받아 저장 (인터넷이 없으면 저장본만)
  if (url.origin === self.location.origin) {
    e.respondWith(caches.open(APP_CACHE).then((c) =>
      c.match(req, { ignoreSearch: true }).then((hit) => {
        const fresh = fetch(req).then((res) => {
          if (res.ok) c.put(req, res.clone());
          return res;
        }).catch(() => hit || c.match('./index.html'));
        return hit || fresh;
      })
    ));
  }
});
