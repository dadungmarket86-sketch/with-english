/* =========================================================
   '회화' 탭 — ① 상황 선택  ② 대화 목록  ③ 한 줄씩 대화 연습
   대화 연습 조작법
   - [다음 줄] 을 누르면 대화가 한 줄씩 나오고, 그 줄을 읽어 줍니다
   - 내 차례(오른쪽 말풍선)에서는 소리 내어 따라 말해 보세요
   - [해석] 버튼으로 한국어 해석을 모두 켜고 끌 수 있고,
     꺼 둔 상태에서 말풍선을 누르면 그 줄만 해석이 보입니다
   - 키보드: → 또는 스페이스 다음 줄, R 다시 듣기, H 해석 켜기/끄기
   ========================================================= */

Screens.talk = {
  session: null,   // 대화 연습 중일 때의 상태

  render(el, params = {}) {
    this.el = el;
    this.session = null;
    if (params.dialog) this.start(params.dialog);
    else if (params.cat) this.renderDialogs(params.cat);
    else this.renderScenes();
  },

  /* ---------------- ① 상황 선택 ---------------- */
  renderScenes() {
    this.session = null;
    const el = this.el;
    const done = Progress.dialogs();
    const listFor = (id) => DIALOGS.filter((d) => d.category === id);
    const meta = (id) => {
      const list = listFor(id);
      const n = list.filter((d) => done[d.id]).length;
      return n ? `대화 ${list.length}개 · ${n}개 완료` : `대화 ${list.length}개`;
    };

    el.innerHTML = `
      ${screenHead({ eyebrow: 'Conversation', title: '상황별 회화', sub: '짧은 대화를 듣고, 내 차례에 따라 말해 보세요' })}

      <div class="scene-grid">
        ${CATEGORIES.map((c, i) => i === 0 ? `
          <button class="scene featured pressable" data-cat="${c.id}">
            <span class="icon-tile">${icon(c.icon, 24)}</span>
            <span class="scene-body">
              <span class="scene-en" style="display:block">${c.en}</span>
              <span class="scene-ko" style="display:block">${c.name}</span>
              <span class="scene-meta" style="display:block">${meta(c.id)} · ${c.desc}</span>
            </span>
            <span class="scene-arrow">${icon('chevronRight', 20)}</span>
          </button>` : `
          <button class="scene pressable" data-cat="${c.id}">
            <span class="icon-tile">${icon(c.icon, 20)}</span>
            <span>
              <span class="scene-en" style="display:block">${c.en}</span>
              <span class="scene-ko" style="display:block">${c.name}</span>
              <span class="scene-meta" style="display:block">${meta(c.id)}</span>
            </span>
          </button>`).join('')}
      </div>`;

    el.querySelectorAll('[data-cat]').forEach((b) =>
      b.addEventListener('click', () => this.renderDialogs(b.dataset.cat)));
  },

  /* ---------------- ② 대화 목록 ---------------- */
  renderDialogs(catId) {
    this.session = null;
    const el = this.el;
    const cat = categoryOf(catId);
    const list = DIALOGS.filter((d) => d.category === cat.id);
    const done = Progress.dialogs();

    el.innerHTML = `
      <header class="study-head">
        <button class="icon-btn icon-btn-plain" data-back aria-label="상황 선택으로">${icon('chevronLeft', 22)}</button>
        <div class="study-title">
          <p class="eyebrow">${cat.en}</p>
          <p class="study-cat">${cat.name}</p>
        </div>
      </header>

      <p class="t-sub talk-intro">${cat.desc}. 대화를 골라 한 줄씩 들어 보세요.</p>

      <div>
        ${list.length ? list.map((d) => `
          <button class="row pressable" data-dialog="${d.id}">
            <span class="icon-tile">${icon('chat', 20)}</span>
            <span class="row-main">
              <span class="row-title" style="display:block">${d.titleKo}<span class="serif-i">${d.title}</span></span>
              <span class="row-sub" style="display:block">${d.partner} · ${d.lines.length}줄 · 내 차례 ${d.lines.filter((l) => l.who === 'me').length}번</span>
            </span>
            <span class="row-end">${done[d.id] ? `<span class="done-mark">${icon('check', 14, 2.25)}</span>` : ''}${icon('chevronRight', 18)}</span>
          </button>`).join('')
        : emptyState({ iconName: 'chat', title: '아직 대화가 없어요', body: '이 상황의 대화는 곧 추가될 예정이에요' })}
      </div>`;

    el.querySelector('[data-back]').addEventListener('click', () => this.renderScenes());
    el.querySelectorAll('[data-dialog]').forEach((b) =>
      b.addEventListener('click', () => this.start(b.dataset.dialog)));
  },

  /* ---------------- ③ 한 줄씩 대화 연습 ---------------- */
  start(dialogId) {
    const dialog = DIALOGS.find((d) => d.id === dialogId);
    if (!dialog) { this.renderScenes(); return; }
    this.session = {
      dialog,
      cat: categoryOf(dialog.category),
      shown: 0,          // 지금까지 화면에 나온 줄 수
      seconds: 0,
      lastAt: Date.now(),
    };
    this.renderPlayer();
    this.next();         // 첫 줄은 바로 보여 줌
  },

  renderPlayer() {
    const s = this.session;
    const d = s.dialog;
    const el = this.el;
    const showKo = Settings.get().showKo;

    el.innerHTML = `
      <header class="study-head">
        <button class="icon-btn icon-btn-plain" data-back aria-label="대화 목록으로">${icon('chevronLeft', 22)}</button>
        <div class="study-title">
          <p class="eyebrow">${d.title}</p>
          <p class="study-cat">${d.titleKo}</p>
        </div>
        <button class="ko-toggle" data-ko aria-pressed="${showKo}">${icon(showKo ? 'eye' : 'eyeOff', 16)}해석</button>
      </header>
      <div class="progress study-progress"><i data-bar style="width:0"></i></div>

      <div class="chat${showKo ? '' : ' hide-ko'}" data-chat aria-live="polite"></div>

      <div class="talk-dock">
        <p class="talk-hint" data-hint></p>
        <div class="study-actions">
          <button class="btn btn-unsure" data-replay>${icon('volume', 18)}다시 듣기</button>
          <button class="btn btn-primary" data-next>다음 줄${icon('arrowRight', 18)}</button>
        </div>
      </div>`;

    el.querySelector('[data-back]').addEventListener('click', () => this.renderDialogs(s.cat.id));
    el.querySelector('[data-ko]').addEventListener('click', () => this.toggleKo());
    el.querySelector('[data-replay]').addEventListener('click', () => this.replay());
    el.querySelector('[data-next]').addEventListener('click', () => this.next());

    // 말풍선: 발음 버튼은 그 줄 읽기, 말풍선 자체는 (해석을 꺼 뒀을 때) 그 줄 해석 보기
    el.querySelector('[data-chat]').addEventListener('click', (e) => {
      const say = e.target.closest('[data-say]');
      if (say) { Speech.speak(d.lines[say.dataset.say].en, say); return; }
      const bubble = e.target.closest('.bubble');
      if (bubble) bubble.classList.toggle('peek');
    });
  },

  /* 말풍선 한 줄 만들기 */
  lineHtml(line, i) {
    const d = this.session.dialog;
    const me = line.who === 'me';
    return `
      <div class="line ${me ? 'me' : 'them'}">
        <p class="line-who">${me ? '나 · 따라 말하기' : d.partner}</p>
        <div class="line-row">
          <div class="bubble">
            <p class="line-en">${line.en}</p>
            <p class="line-ko">${line.ko}</p>
          </div>
          <button class="icon-btn icon-btn-sm" data-say="${i}" aria-label="이 줄 듣기">${icon('volume', 16)}</button>
        </div>
      </div>`;
  },

  /* 다음 줄 보여 주기 (마지막 줄 다음이면 완료) */
  next() {
    const s = this.session;
    if (!s) return;
    const lines = s.dialog.lines;
    if (s.shown >= lines.length) { this.finish(); return; }

    // 학습 시간 기록: 한 줄에 최대 45초까지만 인정 (자리를 비운 시간 제외)
    const now = Date.now();
    if (s.shown > 0) {
      const sec = Math.min(45, Math.round((now - s.lastAt) / 1000));
      s.seconds += sec;
      Progress.log({ sec });
    }
    s.lastAt = now;

    const i = s.shown++;
    const chat = this.el.querySelector('[data-chat]');
    chat.querySelectorAll('.line.current').forEach((l) => l.classList.remove('current'));
    chat.insertAdjacentHTML('beforeend', this.lineHtml(lines[i], i));
    const lineEl = chat.lastElementChild;
    lineEl.classList.add('current');

    this.el.querySelector('[data-bar]').style.width = `${(s.shown / lines.length) * 100}%`;
    this.updateDock();
    Speech.speak(lines[i].en, lineEl.querySelector('[data-say]'));
    lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  /* 아래 안내 문구와 버튼 이름을 지금 줄에 맞게 */
  updateDock() {
    const s = this.session;
    const lines = s.dialog.lines;
    const cur = lines[s.shown - 1];
    const last = s.shown >= lines.length;
    this.el.querySelector('[data-hint]').innerHTML = cur.who === 'me'
      ? `${icon('mic', 14)}내 차례예요 · 소리 내어 따라 말해 보세요`
      : `${icon('headphones', 14)}${s.dialog.partner}의 말을 잘 들어 보세요`;
    this.el.querySelector('[data-next]').innerHTML = last
      ? `대화 마치기${icon('check', 18)}`
      : `다음 줄${icon('arrowRight', 18)}`;
  },

  replay() {
    const s = this.session;
    if (!s || !s.shown) return;
    const lineEl = this.el.querySelector('.line.current');
    Speech.speak(s.dialog.lines[s.shown - 1].en, lineEl && lineEl.querySelector('[data-say]'));
  },

  /* 해석 전체 켜기/끄기 — 설정에 저장해서 다음 대화에도 유지 */
  toggleKo() {
    const showKo = !Settings.get().showKo;
    Settings.set({ showKo });
    const chat = this.el.querySelector('[data-chat]');
    chat.classList.toggle('hide-ko', !showKo);
    chat.querySelectorAll('.peek').forEach((b) => b.classList.remove('peek'));
    const btn = this.el.querySelector('[data-ko]');
    btn.setAttribute('aria-pressed', showKo);
    btn.innerHTML = `${icon(showKo ? 'eye' : 'eyeOff', 16)}해석`;
  },

  /* 대화를 끝까지 보면 완료 화면 */
  finish() {
    const s = this.session;
    const d = s.dialog;
    const sec = Math.min(45, Math.round((Date.now() - s.lastAt) / 1000));
    s.seconds += sec;
    Progress.log({ sec });
    Progress.setDialog(d.id);
    this.session = null;   // 완료 화면이 떠 있는 동안 키보드 입력을 막음

    const minutes = Math.floor(s.seconds / 60);
    const time = minutes > 0 ? `${minutes}분` : `${s.seconds}초`;
    const list = DIALOGS.filter((x) => x.category === d.category);
    const nextDialog = list[list.indexOf(d) + 1];

    showComplete({
      eyebrow: d.title,
      title: 'Well <em>said.</em>',
      sub: `‘${d.titleKo}’ 대화를 끝까지 연습했어요.\n해석을 끄고 한 번 더 말해 보면 더 오래 기억나요.`,
      stats: [
        { value: d.lines.length, label: '대화 줄' },
        { value: d.lines.filter((l) => l.who === 'me').length, label: '내 차례' },
        { value: time, label: '학습 시간' },
      ],
      actions: [
        nextDialog
          ? { label: '다음 대화', onClick: () => this.start(nextDialog.id) }
          : { label: '한 번 더 연습하기', onClick: () => this.start(d.id) },
        { label: '대화 목록으로', kind: 'ghost', onClick: () => this.renderDialogs(d.category) },
      ],
    });
  },
};

/* 키보드 조작 (데스크톱): 대화 연습 중일 때만 동작 */
document.addEventListener('keydown', (e) => {
  const talk = Screens.talk;
  if (App.current !== 'talk' || !talk.session || document.querySelector('.complete')) return;
  if (e.target.closest && e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;   // 버튼에 초점이 있으면 그 버튼 동작에 맡김
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); talk.next(); }
  else if (e.key === 'r' || e.key === 'R') talk.replay();
  else if (e.key === 'h' || e.key === 'H') talk.toggleKo();
});
