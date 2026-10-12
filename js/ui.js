/* =========================================================
   공용 UI 부품 — 여러 화면이 함께 쓰는 조각을 만드는 함수들
   각 함수는 HTML 문자열을 돌려주고, 화면 파일이 이것을 조립합니다.
   ========================================================= */

/* 화면 등록소: 각 화면 파일이 Screens.이름 = { render(el) { … } } 로 자기 화면을 등록합니다 */
const Screens = {};

/* 화면 맨 위 제목 묶음 */
function screenHead({ eyebrow, title, sub }) {
  return `
    <header class="screen-head">
      <p class="eyebrow">${eyebrow}</p>
      <h1 class="t-h1">${title}</h1>
      ${sub ? `<p class="t-sub">${sub}</p>` : ''}
    </header>`;
}

/* 진행 링: pct 는 0~1 */
function ring(pct, { size = 64, stroke = 3, label = '' } = {}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.max(0, Math.min(1, pct)));
  return `
    <div class="ring" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle class="track" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"/>
        <circle class="bar" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"
          stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-offset="${offset}"/>
      </svg>
      <div class="ring-label">${label}</div>
    </div>`;
}

/* 얇은 진행 바: pct 는 0~1 */
function progressBar(pct) {
  return `<div class="progress"><i style="width:0" data-width="${Math.round(Math.max(0, Math.min(1, pct)) * 100)}%"></i></div>`;
}

/* 화면을 그린 뒤 호출: 링과 바가 0에서부터 부드럽게 차오릅니다 */
function animateIn(root) {
  root.getBoundingClientRect();   // 시작 상태(0)를 브라우저가 먼저 그리게 한 뒤 값을 바꿔야 차오르는 효과가 보임
  root.querySelectorAll('.ring .bar[data-offset]').forEach((bar) => { bar.style.strokeDashoffset = bar.dataset.offset; });
  root.querySelectorAll('.progress > i[data-width]').forEach((bar) => { bar.style.width = bar.dataset.width; });
}

/* 빈 화면 안내 */
function emptyState({ iconName = 'inbox', title, body, action = '' }) {
  return `
    <div class="empty">
      <div class="empty-icon">${icon(iconName, 24)}</div>
      <p class="empty-title">${title}</p>
      <p class="empty-body">${body}</p>
      ${action}
    </div>`;
}

/* 로딩 중 자리 표시 (스켈레톤) */
function skeletonScreen() {
  return `
    <div>
      <div class="skeleton" style="height:28px;width:40%;margin-top:6px"></div>
      <div class="skeleton" style="height:34px;width:65%;margin-top:28px"></div>
      <div class="skeleton" style="height:176px;border-radius:24px;margin-top:20px"></div>
      <div class="skeleton" style="height:18px;width:30%;margin-top:36px"></div>
      <div class="skeleton" style="height:220px;border-radius:24px"></div>
    </div>`;
}

/* 아래에서 잠깐 떠올랐다 사라지는 알림 */
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* 학습 완료 화면 — 조용하고 품격 있게
   stats: [{ value: '10', label: '표현' }, …]  /  actions: [{ label, kind, onClick }] */
function showComplete({ eyebrow = 'Session complete', title = 'Nicely <em>done.</em>', sub = '', stats = [], actions = [] }) {
  const overlay = document.createElement('div');
  overlay.className = 'complete';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="complete-inner">
      ${ring(1, { size: 112, stroke: 3, label: `<span class="complete-check">${icon('check', 40, 1.5)}</span>` })}
      <p class="eyebrow">${eyebrow}</p>
      <h2 class="complete-title">${title}</h2>
      ${sub ? `<p class="complete-sub">${sub}</p>` : ''}
      ${stats.length ? `<div class="complete-stats">${stats.map((s) => `
        <div><div class="cs-value">${s.value}</div><div class="cs-label">${s.label}</div></div>`).join('')}</div>` : '<div style="height:36px"></div>'}
      ${actions.map((a, i) => `<button class="btn btn-block ${a.kind === 'ghost' ? 'btn-ghost' : 'btn-primary'}" data-i="${i}">${a.label}</button>`).join('')}
    </div>`;
  document.body.appendChild(overlay);

  const close = () => {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 300);
  };
  overlay.querySelectorAll('[data-i]').forEach((btn) => {
    btn.addEventListener('click', () => {
      close();
      const action = actions[btn.dataset.i];
      if (action.onClick) action.onClick();
    });
  });

  requestAnimationFrame(() => {
    overlay.classList.add('show');
    animateIn(overlay);
  });
  return close;
}

/* 예문 속 핵심 부분을 강조 표시 */
function highlight(sentence, part) {
  if (!part) return sentence;
  const i = sentence.toLowerCase().indexOf(part.toLowerCase());
  if (i < 0) return sentence;
  return sentence.slice(0, i) + '<mark>' + sentence.slice(i, i + part.length) + '</mark>' + sentence.slice(i + part.length);
}

/* id 로 카테고리 찾기 */
function categoryOf(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
}
