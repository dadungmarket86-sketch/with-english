/* =========================================================
   저장소 — 브라우저 localStorage 에 설정과 학습 기록을 보관합니다.
   로그인이 없으므로 같은 기기·같은 브라우저에서만 기록이 이어집니다.
   모든 키 앞에 'we:' 를 붙여 다른 사이트 데이터와 섞이지 않게 합니다.
   ========================================================= */
const Store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('we:' + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;   // 사생활 보호 모드 등에서 저장소가 막혀 있어도 앱은 동작
    }
  },
  set(key, value) {
    try { localStorage.setItem('we:' + key, JSON.stringify(value)); } catch (e) { /* 저장 실패는 조용히 무시 */ }
  },
};

/* ---------- 설정 (테마, 발음 속도) ---------- */
const Settings = {
  defaults: { theme: 'system', rate: 'normal', showKo: true },   // theme: system | light | dark,  rate: slow | normal,  showKo: 회화 해석 보기
  get() { return { ...this.defaults, ...Store.get('settings', {}) }; },
  set(patch) {
    const next = { ...this.get(), ...patch };
    Store.set('settings', next);
    return next;
  },
};

/* 테마 적용: 'system' 이면 기기 설정을 따르고, 아니면 고른 테마로 고정 */
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light' || theme === 'dark') root.dataset.theme = theme;
  else delete root.dataset.theme;

  // 휴대폰 상단 상태바 색도 앱 배경과 맞춤
  const colors = { light: '#FAF7F2', dark: '#1C1B19' };
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    m.content = theme === 'light' || theme === 'dark' ? colors[theme] : colors[m.dataset.scheme];
  });
}

/* ---------- 학습 기록 ----------
   저장되는 모양
   - words : { 'cafe-01': 'known' | 'unsure', … }       표현별 "알아요/헷갈려요"
   - days  : { '2026-10-12': { sec: 420, cards: 12 }, … } 날짜별 학습 시간(초)과 넘긴 카드 수
   - review: [ 'cafe-03', … ]                            복습 목록 (퀴즈에서 틀린 표현, 최근 것이 앞)
   - dialogs: { 'cafe-1': '2026-10-12', … }             끝까지 연습한 대화와 마지막으로 한 날짜
   - quizzes: [ { type, correct, total, date }, … ]       퀴즈 결과 (최근 것이 앞, 최대 50개) */
const Progress = {
  dailyGoal: 10,   // 하루 목표(분)

  /* 날짜를 '2026-10-12' 모양의 글자로 (기기 시간 기준) */
  dayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  /* 표현 하나의 상태 저장 + 오늘 넘긴 카드 수 1 증가 */
  words() { return Store.get('words', {}); },
  setWord(id, status) {
    const words = this.words();
    words[id] = status;
    Store.set('words', words);
    this.log({ cards: 1 });
  },

  /* 오늘 기록에 더하기: log({ sec: 30 }) 또는 log({ cards: 1 }) */
  log({ sec = 0, cards = 0 }) {
    const days = Store.get('days', {});
    const key = this.dayKey();
    const day = days[key] || { sec: 0, cards: 0 };
    day.sec += sec;
    day.cards += cards;
    days[key] = day;
    Store.set('days', days);
  },

  isActive(day) { return !!day && (day.sec > 0 || day.cards > 0); },

  today() {
    const day = Store.get('days', {})[this.dayKey()] || { sec: 0, cards: 0 };
    return { minutes: Math.floor(day.sec / 60), seconds: day.sec, cards: day.cards };
  },

  /* 연속 학습일: 오늘(아직 안 했으면 어제)부터 거꾸로 하루씩 세기 */
  streak() {
    const days = Store.get('days', {});
    const d = new Date();
    if (!this.isActive(days[this.dayKey(d)])) d.setDate(d.getDate() - 1);
    let count = 0;
    while (this.isActive(days[this.dayKey(d)])) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  },

  /* 이번 주 월~일 학습 여부 [true, false, …] */
  week() {
    const days = Store.get('days', {});
    const monday = new Date();
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return this.isActive(days[this.dayKey(d)]);
    });
  },

  /* 카테고리별 진도: 알아요 / 헷갈려요 / 전체 개수 */
  category(id) {
    const list = typeof WORDS === 'undefined' ? [] : WORDS.filter((w) => w.category === id);
    const words = this.words();
    return {
      learned: list.filter((w) => words[w.id] === 'known').length,
      unsure: list.filter((w) => words[w.id] === 'unsure').length,
      total: list.length || 10,
    };
  },

  /* 회화: 끝까지 연습한 대화 기록 */
  dialogs() { return Store.get('dialogs', {}); },
  setDialog(id) {
    const dialogs = this.dialogs();
    dialogs[id] = this.dayKey();
    Store.set('dialogs', dialogs);
  },

  /* 복습 목록: 퀴즈에서 틀리면 넣고, 복습에서 맞히면 뺌 */
  reviewList() { return Store.get('review', []); },
  addReview(id) {
    Store.set('review', [id, ...this.reviewList().filter((x) => x !== id)]);
  },
  removeReview(id) {
    Store.set('review', this.reviewList().filter((x) => x !== id));
  },

  /* 퀴즈 결과 */
  quizzes() { return Store.get('quizzes', []); },
  addQuiz({ type, correct, total }) {
    Store.set('quizzes', [{ type, correct, total, date: this.dayKey() }, ...this.quizzes()].slice(0, 50));
  },

  /* 전체 누적: 학습 시간(분), 학습한 날 수 */
  totals() {
    const days = Object.values(Store.get('days', {}));
    return {
      minutes: Math.floor(days.reduce((sum, d) => sum + d.sec, 0) / 60),
      activeDays: days.filter((d) => this.isActive(d)).length,
    };
  },
};
