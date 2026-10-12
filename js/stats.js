/* =========================================================
   '기록' 탭 — 오늘 학습량, 연속 학습일, 이번 주, 카테고리별 진도, 누적, 복습 목록, 최근 퀴즈, 설정
   ========================================================= */
Screens.stats = {
  render(el) {
    const today = Progress.today();
    const streak = Progress.streak();
    const week = Progress.week();
    const todayIndex = (new Date().getDay() + 6) % 7;   // 월요일=0 … 일요일=6
    const learned = CATEGORIES.reduce((sum, c) => sum + Progress.category(c.id).learned, 0);
    const reviews = Progress.reviewList().map((id) => WORDS.find((w) => w.id === id)).filter(Boolean);
    const quizzes = Progress.quizzes();
    const totals = Progress.totals();
    const dialogsDone = Object.keys(Progress.dialogs()).length;
    const accuracy = quizzes.length
      ? Math.round(quizzes.reduce((sum, q) => sum + q.correct, 0) / quizzes.reduce((sum, q) => sum + q.total, 0) * 100)
      : null;
    const s = Settings.get();

    el.innerHTML = `
      ${screenHead({ eyebrow: 'Your progress', title: '학습 기록' })}

      <div class="stat-grid">
        <div class="stat"><div class="stat-value">${today.minutes}<span class="stat-unit">분</span></div><div class="stat-label">오늘 학습</div></div>
        <div class="stat"><div class="stat-value">${streak}<span class="stat-unit">일</span></div><div class="stat-label">${icon('flame', 13)}연속 학습</div></div>
        <div class="stat"><div class="stat-value">${learned}<span class="stat-unit">개</span></div><div class="stat-label">익힌 표현</div></div>
      </div>

      <section class="section">
        <div class="section-head"><h2 class="section-title">이번 주</h2><span class="section-note">${week.filter(Boolean).length} / 7일</span></div>
        <div class="card week">
          ${['월', '화', '수', '목', '금', '토', '일'].map((d, i) => `
            <div class="day ${week[i] ? 'done' : ''} ${i === todayIndex ? 'today' : ''}">
              <span class="day-dot">${week[i] ? icon('check', 15, 2.25) : ''}</span>${d}
            </div>`).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2 class="section-title">카테고리별 진도</h2></div>
        <div class="card cat-progress">
          ${CATEGORIES.map((c) => {
            const p = Progress.category(c.id);
            return `
              <div class="cat-line">
                <div class="cat-line-top"><span class="cat-line-name">${c.name}</span><span class="cat-line-count">${p.learned} / ${p.total}</span></div>
                ${progressBar(p.learned / p.total)}
              </div>`;
          }).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2 class="section-title">지금까지</h2></div>
        <div class="card totals">
          <div><b>${formatMinutes(totals.minutes)}</b><span>누적 학습</span></div>
          <div><b>${dialogsDone}<small> / ${DIALOGS.length}</small></b><span>끝낸 대화</span></div>
          <div><b>${accuracy === null ? '–' : accuracy + '<small>%</small>'}</b><span>퀴즈 정답률</span></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2 class="section-title">복습 목록</h2><span class="section-note">${reviews.length}개</span></div>
        <div class="card${reviews.length ? ' review-card' : ''}">
          ${reviews.length ? `
            <ul class="review-list">
              ${reviews.map((w) => `
                <li class="review-item">
                  <button class="icon-btn" data-say="${w.en.replace(/"/g, '&quot;')}" aria-label="발음 듣기">${icon('volume', 16)}</button>
                  <div class="review-text"><div class="review-en">${w.en}</div><div class="review-ko">${w.ko}</div></div>
                  <button class="icon-btn icon-btn-plain review-remove" data-remove="${w.id}" aria-label="복습 목록에서 빼기">${icon('x', 16)}</button>
                </li>`).join('')}
            </ul>
            <button class="btn btn-soft btn-block" data-review>${icon('rotate', 16)}복습 퀴즈 풀기</button>` : emptyState({
            iconName: 'bookmark',
            title: '아직 비어 있어요',
            body: '퀴즈에서 틀린 표현이 여기에 모여요',
            action: '<button class="btn btn-soft" data-go="quiz">퀴즈 풀러 가기</button>',
          })}
        </div>
      </section>

      ${quizzes.length ? `
      <section class="section">
        <div class="section-head"><h2 class="section-title">최근 퀴즈</h2></div>
        <div class="card quiz-log">
          ${quizzes.slice(0, 5).map((q) => {
            const t = QUIZ_TYPES.find((x) => x.id === q.type);
            return `
              <div class="quiz-log-item">
                <span class="quiz-log-name">${t ? t.title : '복습'}</span>
                <span class="quiz-log-date">${q.date.slice(5).replace('-', '.')}</span>
                <span class="quiz-log-score"><b>${q.correct}</b> / ${q.total}</span>
              </div>`;
          }).join('')}
        </div>
      </section>` : ''}

      <section class="section">
        <div class="section-head"><h2 class="section-title">설정</h2></div>
        <div class="card settings">
          <div class="setting">
            <div class="setting-label">화면 테마</div>
            <div class="segmented" data-setting="theme">
              ${segment('system', s.theme, 'monitor', '시스템')}
              ${segment('light', s.theme, 'sun', '라이트')}
              ${segment('dark', s.theme, 'moon', '다크')}
            </div>
          </div>
          <div class="setting">
            <div class="setting-label">발음 속도
              <button class="icon-btn" data-say="Could you say that again?" aria-label="속도 들어 보기">${icon('volume', 18)}</button>
            </div>
            <div class="segmented" data-setting="rate">
              ${segment('slow', s.rate, '', '느리게')}
              ${segment('normal', s.rate, '', '보통')}
            </div>
          </div>
        </div>
      </section>`;

    // 설정 바꾸기
    el.querySelectorAll('.segmented').forEach((group) => {
      group.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const key = group.dataset.setting;
        Settings.set({ [key]: btn.dataset.value });
        group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b === btn));
        if (key === 'theme') applyTheme(btn.dataset.value);
        if (key === 'rate') toast(btn.dataset.value === 'slow' ? '천천히 읽어 줄게요' : '보통 속도로 읽어 줄게요');
      });
    });

    el.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', () => Speech.speak(b.dataset.say, b)));
    el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => App.go(b.dataset.go)));
    el.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => {
      Progress.removeReview(b.dataset.remove);
      this.render(el);
      toast('복습 목록에서 뺐어요');
    }));
    const reviewBtn = el.querySelector('[data-review]');
    if (reviewBtn) reviewBtn.addEventListener('click', () => App.go('quiz', { review: true }));

    animateIn(el);
  },
};

/* 분 → '2시간 5분' / '35분' */
function formatMinutes(min) {
  const h = Math.floor(min / 60);
  return h ? `${h}<small>시간</small> ${min % 60}<small>분</small>` : `${min}<small>분</small>`;
}

function segment(value, current, iconName, label) {
  return `<button data-value="${value}" aria-pressed="${value === current}">${iconName ? icon(iconName, 16) : ''}${label}</button>`;
}
