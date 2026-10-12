/* 학습 카테고리 7개
   id 는 words.js / dialogs.js 의 category 값과 같아야 합니다.
   icon 은 js/icons.js 에 있는 아이콘 이름입니다. */
const CATEGORIES = [
  { id: 'cafe',       name: '카페·식당 주문', en: 'Ordering',     icon: 'coffee',    desc: '주문하고, 바꾸고, 계산하기' },
  { id: 'shopping',   name: '쇼핑',          en: 'Shopping',     icon: 'bag',       desc: '찾고, 입어 보고, 교환하기' },
  { id: 'directions', name: '길 묻기',        en: 'Directions',   icon: 'pin',       desc: '길 찾고, 위치 설명하기' },
  { id: 'greetings',  name: '인사·자기소개',   en: 'Small Talk',   icon: 'smile',     desc: '처음 만나 가볍게 대화하기' },
  { id: 'phone',      name: '전화·약속',      en: 'Plans & Calls', icon: 'phone',     desc: '약속 잡고, 시간 바꾸기' },
  { id: 'travel',     name: '여행·공항',      en: 'Travel',       icon: 'plane',     desc: '체크인부터 호텔까지' },
  { id: 'work',       name: '직장 기본 표현',  en: 'At Work',      icon: 'briefcase', desc: '회의하고, 부탁하고, 답하기' },
];
