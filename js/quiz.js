/* =========================================================
   '퀴즈' 탭 — ① 퀴즈 종류 선택  ② 10문제 풀기  ③ 결과
   - 뜻 맞히기: 영어 표현 → 알맞은 한국어 뜻
   - 빈칸 채우기: 예문 속 핵심 표현이 빠진 자리 채우기
   - 듣고 고르기: 발음만 듣고 영어 표현 고르기
   - 복습: 틀린 표현만 모아 세 종류를 섞어서 출제
   틀린 표현은 복습 목록에 들어가고, 복습에서 맞히면 목록에서 빠집니다.
   키보드: 1~4 보기 고르기, Enter/→ 다음 문제, R 다시 듣기
   ========================================================= */
const QUIZ_TYPES = [
  { id: 'meaning', icon: 'book',       title: '뜻 맞히기',   sub: '영어 표현을 보고 알맞은 뜻 고르기' },
  { id: 'blank',   icon: 'type',       title: '빈칸 채우기', sub: '예문 속 빈칸에 들어갈 표현 고르기' },
  { id: 'listen',  icon: 'headphones', title: '듣고 고르기', sub: '발음을 듣고 들은 표현 고르기' },
];
const QUIZ_LENGTH = 10;

/* 배열 섞기 (원본은 그대로) */
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

Screens.quiz = {
  session: null,   // 문제를 푸는 중일 때의 상태

  render(el, params = {}) {
    this.el = el;
    this.session = null;
    if (params.review) this.start('review');
    else if (params.type) this.start(params.type);
    else this.renderMenu();
  },

  /* ---------------- ① 퀴즈 종류 선택 ---------------- */
  renderMenu() {
    this.session = null;
    const el = this.el;
    const reviewCount = Progress.reviewList().length;
    const results = Progress.quizzes();
    const lastScore = (type) => {
      const r = results.find((x) => x.type === type);
      return r ? `<span>${icon('check', 13)}최근 ${r.correct}/${r.total}</span>` : '';
    };

    el.innerHTML = `
      ${screenHead({ eyebrow: 'Practice', title: '퀴즈', sub: '틀린 표현은 복습 목록에 자동으로 모여요' })}

      <button class="review-banner pressable" data-review>
        <span class="icon-tile">${icon('bookmark', 20)}</span>
        <span class="row-main">
          <span class="row-title" style="display:block">복습할 표현 <b>${reviewCount}</b>개</span>
          <span class="row-sub" style="display:block">${reviewCount ? '틀렸던 표현만 다시 풀어 보세요' : '아직 틀린 표현이 없어요'}</span>
        </span>
        <span class="row-end">${icon('chevronRight', 18)}</span>
      </button>

      <div>
        ${QUIZ_TYPES.map((q) => `
          <button class="row quiz-type pressable" data-quiz="${q.id}">
            <span class="icon-tile">${icon(q.icon, 22)}</span>
            <span class="row-main">
              <span class="row-title" style="display:block">${q.title}</span>
              <span class="row-sub" style="display:block">${q.sub}</span>
              <span class="quiz-meta"><span>${icon('target', 13)}${QUIZ_LENGTH}문제</span><span>${icon('clock', 13)}약 3분</span>${lastScore(q.id)}</span>
            </span>
            <span class="row-end">${icon('chevronRight', 18)}</span>
          </button>`).join('')}
      </div>`;

    el.querySelectorAll('[data-quiz]').forEach((b) =>
      b.addEventListener('click', () => this.start(b.dataset.quiz)));
    el.querySelector('[data-review]').addEventListener('click', () => {
      if (Progress.reviewList().length) this.start('review');
      else toast('퀴즈에서 틀린 표현이 여기에 모여요');
    });
  },

  /* ---------------- ② 문제 만들기 ---------------- */
  /* 보기로 쓸 다른 표현 3개: 같은 카테고리에서 먼저, 모자라면 다른 카테고리에서 */
  distractors(word, keyOf) {
    const seen = new Set([keyOf(word).toLowerCase()]);
    const same = shuffle(WORDS.filter((w) => w.category === word.category));
    const other = shuffle(WORDS.filter((w) => w.category !== word.category));
    const picked = [];
    for (const w of [...same, ...other]) {
      const key = keyOf(w).toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      picked.push(w);
      if (picked.length === 3) break;
    }
    return picked;
  },

  makeQuestion(word, type) {
    const keyOf = { meaning: (w) => w.ko, blank: (w) => w.highlight, listen: (w) => w.en }[type];
    const options = shuffle([word, ...this.distractors(word, keyOf)]);
    return {
      word,
      type,
      options: options.map((w) => keyOf(w)),
      answer: options.indexOf(word),
    };
  },

  start(type) {
    const review = type === 'review';
    const reviewIds = Progress.reviewList();
    const pool = review ? WORDS.filter((w) => reviewIds.includes(w.id)) : WORDS;
    if (!pool.length) { this.renderMenu(); return; }

    const types = QUIZ_TYPES.map((q) => q.id);
    const questions = shuffle(pool).slice(0, QUIZ_LENGTH)
      .map((w) => this.makeQuestion(w, review ? types[Math.floor(Math.random() * types.length)] : type));

    this.session = {
      type,
      questions,
      index: 0,
      correct: 0,
      wrong: 0,
      cleared: 0,        // 복습에서 맞혀서 목록에서 지운 개수
      answered: false,
      seconds: 0,
      lastAt: Date.now(),
    };
    this.renderQuestion();
  },

  /* ---------------- ③ 문제 화면 ---------------- */
  renderQuestion() {
    const s = this.session;
    const q = s.questions[s.index];
    const w = q.word;
    const el = this.el;
    const title = s.type === 'review' ? '복습' : QUIZ_TYPES.find((t) => t.id === s.type).title;

    const prompt = {
      meaning: `
        <p class="quiz-ask">이 표현의 뜻은?</p>
        <div class="quiz-en">${w.en}</div>
        <button class="icon-btn quiz-say" data-say aria-label="발음 듣기">${icon('volume', 20)}</button>`,
      blank: `
        <p class="quiz-ask">빈칸에 들어갈 표현은?</p>
        <div class="quiz-sentence" data-sentence>${blankOut(w.example, w.highlight)}</div>
        <p class="quiz-ko">${w.exampleKo}</p>`,
      listen: `
        <p class="quiz-ask">들은 표현을 고르세요</p>
        <button class="listen-btn pressable" data-say aria-label="다시 듣기">${icon('volume', 34, 1.5)}</button>
        <p class="quiz-ko">한 번 더 들으려면 누르세요</p>`,
    }[q.type];

    el.innerHTML = `
      <header class="study-head">
        <button class="icon-btn icon-btn-plain" data-back aria-label="퀴즈 목록으로">${icon('chevronLeft', 22)}</button>
        <div class="study-title">
          <p class="eyebrow">${s.type === 'review' ? 'Review' : 'Quiz'}</p>
          <p class="study-cat">${title}</p>
        </div>
        <span class="study-count"><b>${s.index + 1}</b> / ${s.questions.length}</span>
      </header>
      <div class="progress study-progress"><i style="width:${(s.index / s.questions.length) * 100}%"></i></div>

      <div class="card quiz-card ${q.type === 'listen' ? 'is-listen' : ''}">${prompt}</div>

      <div class="choices${q.type === 'meaning' ? ' ko' : ''}" role="group" aria-label="보기">
        ${q.options.map((o, i) => `
          <button class="choice pressable" data-choice="${i}">
            <span class="choice-num">${i + 1}</span><span class="choice-text">${o}</span>
          </button>`).join('')}
      </div>

      <div class="quiz-feedback" data-feedback hidden></div>`;

    el.querySelector('[data-back]').addEventListener('click', () => this.renderMenu());
    el.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', () => this.replay()));
    el.querySelectorAll('[data-choice]').forEach((b) =>
      b.addEventListener('click', () => this.answer(Number(b.dataset.choice))));

    if (q.type === 'listen') setTimeout(() => this.replay(), 350);   // 듣기 문제는 바로 읽어 줌
    animateIn(el);
  },

  /* 소리 다시 듣기: 빈칸 문제는 (답을 고른 뒤에만) 예문 전체를 읽어 줌 */
  replay() {
    const s = this.session;
    if (!s) return;
    const q = s.questions[s.index];
    if (q.type === 'blank' && !s.answered) return;
    const btn = this.el.querySelector('[data-say]');
    Speech.speak(q.type === 'blank' ? q.word.example : q.word.en, btn);
  },

  answer(i) {
    const s = this.session;
    if (!s || s.answered) return;
    const q = s.questions[s.index];
    const w = q.word;
    const right = i === q.answer;
    s.answered = true;
    this.tick();

    if (right) {
      s.correct++;
      if (s.type === 'review') { Progress.removeReview(w.id); s.cleared++; }
    } else {
      s.wrong++;
      Progress.addReview(w.id);
    }

    // 보기 표시: 정답은 초록, 고른 오답은 붉게, 나머지는 흐리게
    this.el.querySelectorAll('[data-choice]').forEach((b) => {
      const n = Number(b.dataset.choice);
      b.disabled = true;
      if (n === q.answer) b.classList.add('is-right');
      else if (n === i) b.classList.add('is-wrong');
      else b.classList.add('is-dim');
      if (n === q.answer || n === i) b.querySelector('.choice-num').innerHTML = icon(n === q.answer ? 'check' : 'x', 14, 2.25);
    });

    // 빈칸 문제는 빈칸을 정답으로 채워서 보여 줌
    if (q.type === 'blank') this.el.querySelector('[data-sentence]').innerHTML = highlight(w.example, w.highlight);

    const last = s.index >= s.questions.length - 1;
    const fb = this.el.querySelector('[data-feedback]');
    fb.className = `quiz-feedback ${right ? 'ok' : 'no'}`;
    fb.innerHTML = `
      <div class="fb-head">${icon(right ? 'check' : 'x', 16, 2.25)}${right
        ? (s.type === 'review' ? '맞았어요 · 복습 목록에서 뺐어요' : '정답이에요')
        : '아쉬워요 · 복습 목록에 담았어요'}</div>
      <div class="fb-answer">
        <button class="icon-btn" data-say-answer aria-label="발음 듣기">${icon('volume', 18)}</button>
        <div><div class="fb-en">${w.en}</div><div class="fb-ko">${w.ko}</div></div>
      </div>
      ${w.note ? `<p class="fb-note">${w.note}</p>` : ''}
      <button class="btn btn-primary btn-block" data-next>${last ? '결과 보기' : '다음 문제'}${icon('arrowRight', 18)}</button>`;
    fb.hidden = false;
    fb.querySelector('[data-say-answer]').addEventListener('click', (e) => Speech.speak(w.en, e.currentTarget));
    fb.querySelector('[data-next]').addEventListener('click', () => this.next());

    Speech.speak(q.type === 'blank' ? w.example : w.en);
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  next() {
    const s = this.session;
    if (!s || !s.answered) return;
    if (s.index >= s.questions.length - 1) { this.finish(); return; }
    s.index++;
    s.answered = false;
    this.renderQuestion();
    window.scrollTo(0, 0);
  },

  /* 학습 시간 기록: 한 문제에 1~45초로 인정 (자리를 비운 시간 제외, 빨리 풀어도 오늘 학습으로 남게) */
  tick() {
    const s = this.session;
    const sec = Math.max(1, Math.min(45, Math.round((Date.now() - s.lastAt) / 1000)));
    s.seconds += sec;
    s.lastAt = Date.now();
    Progress.log({ sec });
  },

  finish() {
    const s = this.session;
    const total = s.questions.length;
    Progress.addQuiz({ type: s.type, correct: s.correct, total });
    this.session = null;   // 완료 화면이 떠 있는 동안 키보드 입력을 막음

    const minutes = Math.floor(s.seconds / 60);
    const time = minutes > 0 ? `${minutes}분` : `${s.seconds}초`;
    const rate = s.correct / total;
    const title = rate >= 0.9 ? 'Excellent <em>work.</em>' : rate >= 0.6 ? 'Nicely <em>done.</em>' : 'Keep <em>going.</em>';
    const left = Progress.reviewList().length;
    let sub;
    if (s.type === 'review') sub = s.cleared ? `${s.cleared}개를 복습 목록에서 지웠어요.\n남은 복습 표현은 ${left}개예요.` : `남은 복습 표현은 ${left}개예요.\n카드로 한 번 더 보고 다시 풀어 보세요.`;
    else sub = s.wrong ? `틀린 ${s.wrong}개는 복습 목록에 담았어요.\n잊기 전에 한 번 더 풀어 보세요.` : '한 문제도 틀리지 않았어요.\n다른 퀴즈도 도전해 보세요.';

    showComplete({
      eyebrow: 'Quiz complete',
      title,
      sub,
      stats: [
        { value: `${s.correct}/${total}`, label: '정답' },
        { value: `${Math.round(rate * 100)}%`, label: '정답률' },
        { value: time, label: '학습 시간' },
      ],
      actions: [
        left
          ? { label: `틀린 표현 복습하기 (${left})`, onClick: () => this.start('review') }
          : { label: '한 번 더 풀기', onClick: () => this.start(s.type === 'review' ? 'meaning' : s.type) },
        { label: '퀴즈 목록으로', kind: 'ghost', onClick: () => this.renderMenu() },
      ],
    });
  },
};

/* 예문에서 핵심 표현을 빈칸으로 */
function blankOut(sentence, part) {
  const i = sentence.toLowerCase().indexOf(part.toLowerCase());
  if (i < 0) return sentence;
  return sentence.slice(0, i) + '<span class="blank" aria-label="빈칸"></span>' + sentence.slice(i + part.length);
}

/* 키보드 조작 (데스크톱): 문제를 푸는 중일 때만 동작 */
document.addEventListener('keydown', (e) => {
  const quiz = Screens.quiz;
  if (App.current !== 'quiz' || !quiz.session || document.querySelector('.complete')) return;
  if (e.target.closest && e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;   // 버튼에 초점이 있으면 그 버튼 동작에 맡김
  if (/^[1-4]$/.test(e.key)) quiz.answer(Number(e.key) - 1);
  else if (e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); quiz.next(); }
  else if (e.key === 'r' || e.key === 'R') quiz.replay();
});
