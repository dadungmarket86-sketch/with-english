/* 상황별 대화 데이터
   who: 'me' 는 학습자가 따라 말할 줄, 'them' 은 상대방 줄입니다. */
const DIALOGS = [
  // ===== 카페·식당 주문 =====
  {
    id: 'cafe-1',
    category: 'cafe',
    title: 'At the counter',
    titleKo: '카운터에서 주문하기',
    partner: 'Barista',
    lines: [
      { who: 'them', en: 'Hi there! What can I get for you?', ko: '안녕하세요! 뭐 드릴까요?' },
      { who: 'me', en: 'Can I get a medium iced latte?', ko: '아이스 라떼 미디엄 사이즈로 주세요.' },
      { who: 'them', en: 'For here or to go?', ko: '매장에서 드시나요, 포장해 드릴까요?' },
      { who: 'me', en: 'To go, please.', ko: '포장해 주세요.' },
      { who: 'them', en: "That'll be $5.50.", ko: '5달러 50센트입니다.' },
      { who: 'me', en: 'Here you go. Thanks!', ko: '여기 있어요. 감사합니다!' },
    ]
  },
  {
    id: 'cafe-2',
    category: 'cafe',
    title: 'Paying the bill',
    titleKo: '식당에서 계산하기',
    partner: 'Server',
    lines: [
      { who: 'them', en: 'How was everything today?', ko: '오늘 식사는 어떠셨어요?' },
      { who: 'me', en: 'It was great, thanks.', ko: '맛있었어요, 감사해요.' },
      { who: 'me', en: 'Can we get the check, please?', ko: '계산서 주세요.' },
      { who: 'them', en: "Of course. I'll be right back.", ko: '네, 금방 가져다드릴게요.' },
      { who: 'them', en: "Here's your check.", ko: '계산서 여기 있어요.' },
      { who: 'me', en: 'Thanks so much!', ko: '정말 감사해요!' },
    ]
  },
  // ===== 쇼핑 =====
  {
    id: 'shopping-1',
    category: 'shopping',
    title: 'At the clothing store',
    titleKo: '옷 가게에서 둘러보기',
    partner: 'Sales Associate',
    lines: [
      { who: 'them', en: 'Hi! Looking for anything special today?', ko: '안녕하세요! 찾으시는 게 있으세요?' },
      { who: 'me', en: "I'm just looking, thanks.", ko: '그냥 둘러보는 중이에요, 감사해요.' },
      { who: 'me', en: 'Actually, do you have this in medium?', ko: '아, 이거 미디엄 사이즈 있어요?' },
      { who: 'them', en: 'Let me check in the back.', ko: '뒤에 재고가 있는지 확인해 볼게요.' },
      { who: 'me', en: 'Can I try this on?', ko: '입어봐도 돼요?' },
      { who: 'them', en: 'The fitting rooms are over there.', ko: '피팅룸은 저쪽에 있어요.' },
    ]
  },
  {
    id: 'shopping-2',
    category: 'shopping',
    title: 'At the checkout',
    titleKo: '계산대에서 결제하기',
    partner: 'Cashier',
    lines: [
      { who: 'them', en: 'Did you find everything okay?', ko: '찾으시는 거 다 찾으셨어요?' },
      { who: 'me', en: "Yeah, I did. Just this, please.", ko: '네, 찾았어요. 이것만 계산할게요.' },
      { who: 'them', en: "That'll be $42.99.", ko: '42달러 99센트입니다.' },
      { who: 'me', en: "Wait, isn't this on sale?", ko: '어, 이거 세일 중 아니에요?' },
      { who: 'them', en: 'Yes, 20% off today.', ko: '네, 오늘 20% 할인이에요.' },
      { who: 'me', en: "Great, here's my card.", ko: '좋네요, 카드로 할게요.' },
    ]
  },
  // ===== 길 묻기 =====
  {
    id: 'directions-1',
    category: 'directions',
    title: 'Finding the subway',
    titleKo: '지하철역 찾기',
    partner: 'Passerby',
    lines: [
      { who: 'me', en: "Excuse me, where's the nearest subway station?", ko: '실례합니다, 가장 가까운 지하철역이 어디예요?' },
      { who: 'them', en: 'Go straight, then turn left at the corner.', ko: '직진하시다가 모퉁이에서 좌회전하세요.' },
      { who: 'me', en: 'Is this the right way?', ko: '이 방향이 맞나요?' },
      { who: 'them', en: "Yes, it's a five-minute walk.", ko: '네, 걸어서 5분이에요.' },
      { who: 'me', en: 'Thanks so much!', ko: '정말 감사해요!' },
    ]
  },
  {
    id: 'directions-2',
    category: 'directions',
    title: 'Finding a cafe',
    titleKo: '카페 찾기',
    partner: 'Local',
    lines: [
      { who: 'me', en: "I'm totally lost. Could you show me on the map?", ko: '완전히 길을 잃었어요. 지도에서 보여 주시겠어요?' },
      { who: 'them', en: "Sure. You're here, and the cafe is here.", ko: '네. 지금 여기 계시고, 카페는 여기예요.' },
      { who: 'them', en: "It's right across the street.", ko: '길 바로 건너편이에요.' },
      { who: 'me', en: 'Oh, I see it now. Thanks!', ko: '아, 이제 보이네요. 감사해요!' },
    ]
  },
  // ===== 인사·자기소개 =====
  {
    id: 'greetings-1',
    category: 'greetings',
    title: 'Meeting someone new',
    titleKo: '처음 만난 사람과 인사',
    partner: 'New Friend',
    lines: [
      { who: 'them', en: "Hi, I'm Sarah. Nice to meet you.", ko: '안녕, 난 사라야. 만나서 반가워.' },
      { who: 'me', en: "Nice to meet you too. I'm David.", ko: '나도 반가워. 난 데이빗이야.' },
      { who: 'me', en: 'What do you do?', ko: '무슨 일 해?' },
      { who: 'them', en: "I'm a designer. How about you?", ko: '디자이너야. 너는?' },
      { who: 'me', en: 'I work in marketing.', ko: '마케팅 쪽에서 일해.' },
      { who: 'them', en: "Cool! Let's grab coffee sometime.", ko: '멋지다! 언제 커피 마시자.' },
    ]
  },
  {
    id: 'greetings-2',
    category: 'greetings',
    title: 'Running into a friend',
    titleKo: '오랜 친구와 재회',
    partner: 'Old Friend',
    lines: [
      { who: 'me', en: 'Wow, long time no see!', ko: '와, 오랜만이다!' },
      { who: 'them', en: 'I know! How have you been?', ko: '그러게! 어떻게 지냈어?' },
      { who: 'me', en: "Pretty good. What about you?", ko: '잘 지냈어. 너는?' },
      { who: 'them', en: 'Busy, but good.', ko: '바쁘지만 잘 지내.' },
      { who: 'me', en: "Let's meet up this weekend!", ko: '이번 주말에 만나자!' },
    ]
  },
  // ===== 전화·약속 =====
  {
    id: 'phone-1',
    category: 'phone',
    title: 'Missing a call',
    titleKo: '부재중 전화에 답하기',
    partner: 'Friend',
    lines: [
      { who: 'them', en: 'Hey, do you have a minute?', ko: '야, 잠깐 시간 돼?' },
      { who: 'me', en: "Sorry, I'm in a meeting. Can I call you back?", ko: '미안, 회의 중이야. 나중에 다시 전화해도 돼?' },
      { who: 'them', en: 'Sure, no rush.', ko: '응, 천천히 해.' },
      { who: 'me', en: "I'll text you the details later.", ko: '자세한 건 나중에 문자로 보낼게.' },
    ]
  },
  {
    id: 'phone-2',
    category: 'phone',
    title: 'Rescheduling a meeting',
    titleKo: '회의 일정 변경하기',
    partner: 'Coworker',
    lines: [
      { who: 'me', en: "Hi, about tomorrow's meeting...", ko: '안녕하세요, 내일 회의 건으로...' },
      { who: 'them', en: 'Yes, what about it?', ko: '네, 무슨 일이세요?' },
      { who: 'me', en: 'Something came up. Can we move it to Friday?', ko: '급한 일이 생겼어요. 금요일로 옮길 수 있을까요?' },
      { who: 'them', en: 'Friday works for me.', ko: '금요일 괜찮아요.' },
      { who: 'me', en: "Thanks! I'll send a new invite.", ko: '감사해요! 새로 초대장 보낼게요.' },
    ]
  },
  // ===== 여행·공항 =====
  {
    id: 'travel-1',
    category: 'travel',
    title: 'At check-in',
    titleKo: '체크인 카운터에서',
    partner: 'Airline Staff',
    lines: [
      { who: 'them', en: 'Hi, where are you flying today?', ko: '안녕하세요, 오늘 어디로 가세요?' },
      { who: 'me', en: "To Tokyo. Can I get a window seat?", ko: '도쿄요. 창가 자리로 주세요.' },
      { who: 'them', en: 'Got it. Is Tokyo your final destination?', ko: '알겠습니다. 도쿄가 최종 목적지 맞으세요?' },
      { who: 'me', en: 'No, I have a connecting flight.', ko: '아니요, 환승 비행기가 있어요.' },
      { who: 'them', en: "Here's your boarding pass.", ko: '탑승권 여기 있어요.' },
      { who: 'me', en: 'Thank you!', ko: '감사합니다!' },
    ]
  },
  {
    id: 'travel-2',
    category: 'travel',
    title: 'At the hotel',
    titleKo: '호텔 프런트에서',
    partner: 'Receptionist',
    lines: [
      { who: 'me', en: 'Hi, I have a reservation under Kim.', ko: '안녕하세요, 김으로 예약했어요.' },
      { who: 'them', en: "Welcome! Here's your key card.", ko: '환영합니다! 키 카드 여기 있어요.' },
      { who: 'me', en: 'Is breakfast included?', ko: '조식 포함이에요?' },
      { who: 'them', en: 'Yes, from 7 to 10.', ko: '네, 7시부터 10시까지예요.' },
      { who: 'me', en: 'Perfect, thanks!', ko: '좋네요, 감사해요!' },
    ]
  },
  // ===== 직장 기본 표현 =====
  {
    id: 'work-1',
    category: 'work',
    title: 'Starting a meeting',
    titleKo: '회의 시작하기',
    partner: 'Manager',
    lines: [
      { who: 'them', en: "Let's get started. Any updates?", ko: '시작해요. 업데이트 있어요?' },
      { who: 'me', en: 'The report is almost done.', ko: '보고서가 거의 다 됐어요.' },
      { who: 'me', en: "I'll send it by Friday.", ko: '금요일까지 보낼게요.' },
      { who: 'them', en: 'Sounds good to me.', ko: '좋네요.' },
      { who: 'me', en: "Keep me posted on the client's feedback.", ko: '클라이언트 피드백 있으면 알려 주세요.' },
    ]
  },
  {
    id: 'work-2',
    category: 'work',
    title: 'Asking for help',
    titleKo: '도움 요청하기',
    partner: 'Coworker',
    lines: [
      { who: 'me', en: 'Do you have a minute?', ko: '잠깐 시간 돼요?' },
      { who: 'them', en: "Sure, what's up?", ko: '응, 무슨 일이야?' },
      { who: 'me', en: 'I need a hand with this report.', ko: '이 보고서 좀 도와줄 수 있어?' },
      { who: 'them', en: 'Of course. What do you need?', ko: '그럼. 뭐가 필요해?' },
      { who: 'me', en: 'Could you check the numbers for me?', ko: '숫자 부분 확인해 줄 수 있어?' },
      { who: 'them', en: 'No problem.', ko: '문제없어.' },
    ]
  },
];
