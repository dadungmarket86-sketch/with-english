/* =========================================================
   '오늘' 탭 (홈) — 인사, 오늘의 목표, 오늘의 표현, 바로 시작하기
   ========================================================= */

/* words.js 를 아직 불러오지 못했을 때 보여 줄 예시 표현 */
const SAMPLE_EXPRESSION = {
  category: 'cafe',
  en: 'Can I get a latte?',
  ko: '라떼 한 잔 주세요.',
  example: 'Hi, can I get an iced latte to go?',
  exampleKo: '안녕하세요, 아이스 라떼 테이크아웃으로 주세요.',
  highlight: 'can I get',
};

/* 날짜가 바뀌면 오늘의 표현도 바뀝니다 (같은 날에는 항상 같은 표현) */
function expressionOfTheDay() {
  if (typeof WORDS === 'undefined' || !WORDS.length) return SAMPLE_EXPRESSION;
  const dayNumber = Math.floor(Date.now() / 86400000);
  return WORDS[dayNumber % WORDS.length];
}

/* 시간대별 인사 */
function greeting() {
  const h = new Date().getHours();
  if (h < 5) return '늦은 밤이에요';
  if (h < 12) return '좋은 아침이에요';
  if (h < 18) return '좋은 오후예요';
  return '좋은 저녁이에요';
}

Screens.today = {
  render(el) {
    const now = new Date();
    const dateLabel = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const { minutes } = Progress.today();
    const goal = Progress.dailyGoal;
    const streak = Progress.streak();
    const word = expressionOfTheDay();
    const cat = categoryOf(word.category);
    // 아직 다 익히지 않은 첫 카테고리부터 (모두 익혔으면 헷갈려요가 가장 많은 곳)
    const nextCat = CATEGORIES.find((c) => { const p = Progress.category(c.id); return p.learned < p.total; })
      || CATEGORIES.slice().sort((a, b) => Progress.category(b.id).unsure - Progress.category(a.id).unsure)[0];

    const heroTitle = minutes === 0 ? '오늘의 10분,<br>가볍게 시작해 볼까요?'
      : minutes >= goal ? '오늘 목표를 채웠어요' : `${goal - minutes}분만 더 하면 돼요`;

    el.innerHTML = `
      <header class="topbar">
        <div class="wordmark"><em>with</em> English</div>
        <div class="streak-pill">${icon('flame', 16)}<span>${streak}일 연속</span></div>
      </header>

      <div class="greet">
        <p class="eyebrow">${dateLabel}</p>
        <h1 class="t-h1">${greeting()}</h1>
      </div>

      <section class="hero">
        <div class="hero-top">
          ${ring(minutes / goal, { size: 84, stroke: 4, label: `<div><span class="ring-num">${minutes}</span><span class="ring-unit">/ ${goal}분</span></div>` })}
          <div>
            <p class="eyebrow">Today's goal</p>
            <p class="hero-title">${heroTitle}</p>
            <p class="hero-sub">카드 열 장이면 충분해요</p>
          </div>
        </div>
        <button class="btn btn-on-hero btn-block" data-start>
          ${minutes > 0 ? '이어서 학습하기' : '학습 시작하기'} · ${nextCat.name} ${icon('arrowRight', 18)}
        </button>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-title">오늘의 표현</h2>
          <span class="section-note">매일 바뀌어요</span>
        </div>
        <article class="card feature">
          <div class="feature-top">
            <span class="chip">${icon(cat.icon, 14)}${cat.name}</span>
            <button class="icon-btn" data-say="${word.en}" aria-label="발음 듣기">${icon('volume', 20)}</button>
          </div>
          <h3 class="t-expr">${word.en}</h3>
          <p class="t-meaning">${word.ko}</p>
          <div class="rule"></div>
          <p class="example">“${highlight(word.example, word.highlight)}”</p>
          <p class="example-ko">${word.exampleKo}</p>
        </article>
      </section>

      <section class="section">
        <div class="section-head"><h2 class="section-title">바로 시작하기</h2></div>
        ${quickRow('cards', 'cards', '단어 카드', '넘기면서 익히는 생활 표현')}
        ${quickRow('talk', 'chat', '상황별 회화', '한 줄씩 듣고 따라 말하기')}
        ${quickRow('quiz', 'quiz', '퀴즈', '3분이면 끝나는 확인 문제')}
      </section>`;

    // 버튼 연결
    el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => App.go(b.dataset.go)));
    animateIn(el);
    el.querySelector('[data-start]').addEventListener('click', () => App.go('cards', { cat: nextCat.id }));
    el.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', () => Speech.speak(b.dataset.say, b)));
  },
};

function quickRow(tab, iconName, title, sub) {
  return `
    <button class="row pressable" data-go="${tab}">
      <span class="icon-tile">${icon(iconName, 22)}</span>
      <span class="row-main">
        <span class="row-title" style="display:block">${title}</span>
        <span class="row-sub" style="display:block">${sub}</span>
      </span>
      <span class="row-end">${icon('chevronRight', 18)}</span>
    </button>`;
}
