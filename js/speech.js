/* =========================================================
   발음 듣기 — 브라우저에 들어 있는 음성(Web Speech API)을 씁니다.
   인터넷·회원가입 없이 동작하지만, 목소리 종류는 기기마다 다릅니다.
   ========================================================= */
const Speech = {
  supported: 'speechSynthesis' in window,
  voice: null,
  rates: { slow: 0.7, normal: 0.95 },   // 느리게 / 보통

  // 미국 영어 목소리 중 자연스러운 것을 우선 고릅니다
  pickVoice() {
    if (!this.supported) return;
    const voices = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.startsWith('en'));
    const preferred = ['Samantha', 'Google US English', 'Aria', 'Jenny', 'Natural', 'Microsoft Zira'];
    this.voice =
      preferred.map((name) => voices.find((v) => v.name.includes(name) && v.lang === 'en-US')).find(Boolean) ||
      voices.find((v) => v.lang === 'en-US') ||
      voices[0] || null;
  },

  // text 를 읽어 줍니다. button 을 넘기면 읽는 동안 버튼에 표시가 생깁니다.
  speak(text, button) {
    if (!this.supported) { toast('이 브라우저는 발음 듣기를 지원하지 않아요'); return; }
    speechSynthesis.cancel();
    if (!this.voice) this.pickVoice();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = this.rates[Settings.get().rate] || this.rates.normal;
    if (this.voice) u.voice = this.voice;

    if (button) {
      document.querySelectorAll('.is-speaking').forEach((b) => b.classList.remove('is-speaking'));
      button.classList.add('is-speaking');
      u.onend = u.onerror = () => button.classList.remove('is-speaking');
    }
    speechSynthesis.speak(u);
  },
};

if (Speech.supported) {
  Speech.pickVoice();
  speechSynthesis.onvoiceschanged = () => Speech.pickVoice();   // 목소리 목록은 늦게 도착하기도 함
}
