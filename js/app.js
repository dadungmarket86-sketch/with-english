/* =========================================================
   앱 시작점 — 하단 탭을 만들고, 탭을 누르면 화면을 바꿔 그립니다.
   주소 끝의 #cards 같은 값으로 지금 탭을 기억해서, 새로고침해도 그 탭이 유지됩니다.
   ========================================================= */
const TABS = [
  { id: 'today', label: '오늘', icon: 'sun' },
  { id: 'cards', label: '카드', icon: 'cards' },
  { id: 'talk',  label: '회화', icon: 'chat' },
  { id: 'quiz',  label: '퀴즈', icon: 'quiz' },
  { id: 'stats', label: '기록', icon: 'chart' },
];

const App = {
  view: document.getElementById('view'),
  tabbar: document.getElementById('tabbar'),
  current: null,

  /* 하단 탭 버튼 만들기 */
  buildTabbar() {
    this.tabbar.innerHTML = TABS.map((t) => `
      <button class="tab" data-tab="${t.id}">
        <span class="tab-icon">${icon(t.icon, 22)}</span>${t.label}
      </button>`).join('');
    this.tabbar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tab]');
      if (btn) this.go(btn.dataset.tab);
    });
  },

  /* 탭 이동: 화면을 새로 그리고 살짝 떠오르는 전환 효과를 줍니다
     params 로 추가 정보를 넘길 수 있습니다. 예) App.go('cards', { cat: 'cafe' }) */
  go(tab, params = {}) {
    if (!Screens[tab]) tab = 'today';
    this.current = tab;
    history.replaceState(null, '', '#' + tab);

    this.tabbar.querySelectorAll('.tab').forEach((b) => {
      if (b.dataset.tab === tab) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });

    this.view.classList.remove('enter');
    this.view.innerHTML = '';
    Screens[tab].render(this.view, params);
    void this.view.offsetWidth;        // 애니메이션을 처음부터 다시 재생하기 위한 한 줄
    this.view.classList.add('enter');
    window.scrollTo(0, 0);
  },

  /* 시작: 글꼴이 준비될 때까지 스켈레톤을 보여 주고, 준비되면 첫 화면을 그립니다 */
  start() {
    applyTheme(Settings.get().theme);
    this.buildTabbar();
    this.view.innerHTML = skeletonScreen();

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const timeout = new Promise((resolve) => setTimeout(resolve, 1200));   // 느린 인터넷이어도 1.2초 안에는 시작
    Promise.race([fontsReady, timeout]).then(() => this.go(location.hash.slice(1) || 'today'));
  },
};

App.start();

/* 오프라인 실행·홈 화면 설치용 서비스워커 (index.html 을 더블클릭해 연 file:// 에서는 동작하지 않아 건너뜀) */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
