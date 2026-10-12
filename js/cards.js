/* =========================================================
   '카드' 탭 — ① 카테고리 목록  ② 카드 학습
   카드 학습 조작법
   - 카드를 누르면 뒤집혀서 뜻·예문이 보입니다
   - 오른쪽으로 밀기 또는 [알아요]  /  왼쪽으로 밀기 또는 [헷갈려요]
   - 키보드: → 알아요, ← 헷갈려요, 스페이스 뒤집기
   ========================================================= */

const SWIPE_DISTANCE = 90;   // 이만큼(px) 이상 밀면 다음 카드로 넘어감

Screens.cards = {
  session: null,   // 학습 중일 때의 상태 (카드 목록, 현재 위치, 결과)

  render(el, params = {}) {
    this.el = el;
    if (params.cat) this.start(params.cat, params.only);
    else this.renderList();
  },

  /* ---------------- ① 카테고리 목록 ---------------- */
  renderList() {
    this.session = null;
    const el = this.el;
    const stats = CATEGORIES.map((c) => ({ cat: c, ...Progress.category(c.id) }));
    const total = stats.reduce((sum, s) => sum + s.total, 0);
    const learned = stats.reduce((sum, s) => sum + s.learned, 0);
    const unsure = stats.reduce((sum, s) => sum + s.unsure, 0);

    el.innerHTML = `
      ${screenHead({ eyebrow: 'Vocabulary', title: '단어 카드', sub: '카테고리를 골라 카드를 넘겨 보세요' })}

      <div class="summary">
        <div><div class="summary-value">${total}</div><div class="summary-label">전체 표현</div></div>
        <div><div class="summary-value">${learned}</div><div class="summary-label">알아요</div></div>
        <div><div class="summary-value">${unsure}</div><div class="summary-label">헷갈려요</div></div>
      </div>

      <div>
        ${stats.map((s) => `
          <button class="row pressable" data-cat="${s.cat.id}">
            <span class="icon-tile">${icon(s.cat.icon, 22)}</span>
            <span class="row-main">
              <span class="row-title" style="display:block">${s.cat.name}<span class="serif-i">${s.cat.en}</span></span>
              ${progressBar(s.learned / s.total)}
            </span>
            <span class="row-end">${s.learned === s.total ? `<span class="done-mark">${icon('check', 14, 2.25)}</span>` : `${s.learned}/${s.total}`}${icon('chevronRight', 18)}</span>
          </button>`).join('')}
      </div>`;

    el.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => this.start(b.dataset.cat)));
    animateIn(el);
  },

  /* ---------------- ② 카드 학습 ---------------- */

  /* 학습 시작: 헷갈려요·처음 보는 카드를 앞에, 이미 아는 카드는 뒤에 */
  start(catId, onlyIds) {
    const saved = Progress.words();
    const rank = (w) => (saved[w.id] === 'unsure' ? 0 : saved[w.id] === 'known' ? 2 : 1);
    let deck = WORDS.filter((w) => w.category === catId);
    if (onlyIds) deck = deck.filter((w) => onlyIds.includes(w.id));
    deck.sort((a, b) => rank(a) - rank(b));

    this.session = {
      cat: categoryOf(catId),
      deck,
      index: 0,
      known: [],
      unsure: [],
      seconds: 0,
      lastAt: Date.now(),
      busy: false,   // 카드가 날아가는 중에는 다음 입력을 막음
    };
    this.renderStudy();
  },

  renderStudy() {
    const s = this.session;
    const el = this.el;
    el.innerHTML = `
      <header class="study-head">
        <button class="icon-btn icon-btn-plain" data-back aria-label="목록으로">${icon('chevronLeft', 22)}</button>
        <div class="study-title">
          <p class="eyebrow">${s.cat.en}</p>
          <p class="study-cat">${s.cat.name}</p>
        </div>
        <span class="study-count" data-count></span>
      </header>
      <div class="progress study-progress"><i data-bar style="width:0"></i></div>

      <div class="deck">
        <div class="deck-layer layer-2"></div>
        <div class="deck-layer layer-1"></div>
        <div data-slot></div>
      </div>

      <p class="deck-hint">${icon('rotate', 14)}카드를 누르면 뜻이 보여요 · 옆으로 밀어서 넘기기</p>

      <div class="study-actions">
        <button class="btn btn-unsure" data-answer="unsure">${icon('rotate', 18)}헷갈려요</button>
        <button class="btn btn-primary" data-answer="known">${icon('check', 18)}알아요</button>
      </div>`;

    el.querySelector('[data-back]').addEventListener('click', () => this.renderList());
    el.querySelectorAll('[data-answer]').forEach((b) =>
      b.addEventListener('click', () => this.answer(b.dataset.answer)));

    this.showCard();
  },

  /* 현재 카드를 그리기 */
  showCard() {
    const s = this.session;
    const w = s.deck[s.index];
    const el = this.el;

    el.querySelector('[data-count]').innerHTML = `<b>${s.index + 1}</b> / ${s.deck.length}`;
    el.querySelector('[data-bar]').style.width = `${(s.index / s.deck.length) * 100}%`;
    // 남은 카드가 적으면 뒤에 깔린 카드 층도 줄어듦
    const left = s.deck.length - s.index - 1;
    el.querySelector('.layer-1').classList.toggle('hidden', left < 1);
    el.querySelector('.layer-2').classList.toggle('hidden', left < 2);

    const status = Progress.words()[w.id];
    el.querySelector('[data-slot]').innerHTML = `
      <div class="flash enter" data-card>
        <div class="flash-inner">
          <section class="face front">
            <div class="face-top">
              <span class="chip">${icon(s.cat.icon, 14)}${s.cat.name}</span>
              ${status === 'unsure' ? '<span class="tag-unsure">다시 보는 카드</span>' : ''}
            </div>
            <h2 class="flash-expr">${w.en}</h2>
            <div class="face-bottom">
              <button class="icon-btn" data-say="${w.en}" aria-label="발음 듣기">${icon('volume', 20)}</button>
              <span class="tap-hint">눌러서 뜻 보기</span>
            </div>
          </section>
          <section class="face back">
            <div class="back-head">
              <p class="back-expr">${w.en}</p>
              <button class="icon-btn" data-say="${w.en}" aria-label="발음 듣기">${icon('volume', 20)}</button>
            </div>
            <p class="back-meaning">${w.ko}</p>
            <div class="rule"></div>
            <div class="back-example">
              <p class="example">“${highlight(w.example, w.highlight)}”</p>
              <button class="icon-btn icon-btn-sm" data-say="${w.example}" aria-label="예문 듣기">${icon('volume', 16)}</button>
            </div>
            <p class="example-ko">${w.exampleKo}</p>
            ${w.note ? `<p class="note"><span class="eyebrow">Tip</span>${w.note}</p>` : ''}
          </section>
        </div>
        <div class="stamp stamp-known">알아요</div>
        <div class="stamp stamp-unsure">헷갈려요</div>
      </div>`;

    const card = el.querySelector('[data-card]');
    card.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', (e) => {
      e.stopPropagation();   // 발음 버튼을 눌렀을 때 카드가 뒤집히지 않게
      Speech.speak(b.dataset.say, b);
    }));
    this.enableSwipe(card);
  },

  flip() {
    const card = this.el.querySelector('[data-card]');
    if (card) card.classList.toggle('flipped');
  },

  /* 손가락·마우스로 밀기: 조금 움직이면 따라오고, 충분히 밀면 넘어가고, 그냥 누르면 뒤집기 */
  enableSwipe(card) {
    let startX = 0, startY = 0, dx = 0, dragging = false;

    card.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button') || this.session.busy) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      dx = 0;
      card.setPointerCapture(e.pointerId);
      card.classList.add('dragging');
    });

    card.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      dx = e.clientX - startX;
      card.style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`;
      const strength = Math.min(1, Math.abs(dx) / SWIPE_DISTANCE);
      card.style.setProperty('--known', dx > 0 ? strength : 0);
      card.style.setProperty('--unsure', dx < 0 ? strength : 0);
    });

    const end = (e) => {
      if (!dragging) return;
      dragging = false;
      card.classList.remove('dragging');
      const moved = Math.hypot(e.clientX - startX, e.clientY - startY);

      if (Math.abs(dx) >= SWIPE_DISTANCE) {
        this.answer(dx > 0 ? 'known' : 'unsure');
      } else {
        // 제자리로 돌아오기
        card.style.transform = '';
        card.style.setProperty('--known', 0);
        card.style.setProperty('--unsure', 0);
        if (moved < 6) this.flip();   // 거의 안 움직였으면 '누름'으로 보고 뒤집기
      }
    };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
  },

  /* 알아요 / 헷갈려요 처리 → 카드가 옆으로 날아가고 다음 카드 */
  answer(status) {
    const s = this.session;
    if (!s || s.busy || s.index >= s.deck.length) return;
    s.busy = true;

    const w = s.deck[s.index];
    Progress.setWord(w.id, status);
    s[status].push(w.id);

    // 학습 시간 기록: 카드 한 장에 최대 45초까지만 인정 (자리를 비운 시간 제외)
    const now = Date.now();
    const sec = Math.min(45, Math.round((now - s.lastAt) / 1000));
    s.lastAt = now;
    s.seconds += sec;
    Progress.log({ sec });

    const card = this.el.querySelector('[data-card]');
    const dir = status === 'known' ? 1 : -1;
    card.classList.add('leaving');
    card.style.setProperty(status === 'known' ? '--known' : '--unsure', 1);
    card.style.transform = `translateX(${dir * 130}%) rotate(${dir * 14}deg)`;
    card.style.opacity = '0';

    setTimeout(() => {
      s.busy = false;
      s.index++;
      if (s.index < s.deck.length) this.showCard();
      else this.finish();
    }, 260);
  },

  /* 한 묶음을 다 넘기면 완료 화면 */
  finish() {
    const s = this.session;
    this.el.querySelector('[data-bar]').style.width = '100%';
    const minutes = Math.floor(s.seconds / 60);
    const time = minutes > 0 ? `${minutes}분` : `${s.seconds}초`;
    const perfect = s.unsure.length === 0;

    const actions = perfect
      ? [{ label: '목록으로', onClick: () => this.renderList() },
         { label: '홈으로', kind: 'ghost', onClick: () => App.go('today') }]
      : [{ label: `헷갈린 ${s.unsure.length}개만 다시 보기`, onClick: () => this.start(s.cat.id, s.unsure.slice()) },
         { label: '목록으로', kind: 'ghost', onClick: () => this.renderList() }];

    showComplete({
      eyebrow: s.cat.en,
      title: perfect ? 'Nicely <em>done.</em>' : 'Good <em>work.</em>',
      sub: perfect
        ? `${s.cat.name} 카드를 모두 넘겼어요.\n이제 입으로 한 번씩 말해 보세요.`
        : `${s.cat.name} 카드를 모두 넘겼어요.\n헷갈린 표현은 한 번 더 보면 금방 익숙해져요.`,
      stats: [
        { value: s.known.length, label: '알아요' },
        { value: s.unsure.length, label: '헷갈려요' },
        { value: time, label: '학습 시간' },
      ],
      actions,
    });
  },
};

/* 키보드 조작 (데스크톱): 카드 학습 중일 때만 동작 */
document.addEventListener('keydown', (e) => {
  const cards = Screens.cards;
  if (App.current !== 'cards' || !cards.session || document.querySelector('.complete')) return;
  if (e.key === 'ArrowRight') cards.answer('known');
  else if (e.key === 'ArrowLeft') cards.answer('unsure');
  else if (e.key === ' ') { e.preventDefault(); cards.flip(); }
});
