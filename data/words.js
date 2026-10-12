/* 단어·표현 데이터
   새 표현을 추가하려면 같은 모양의 { } 한 덩어리를 복사해 붙여 넣으세요. */
const WORDS = [
  // ===== 카페·식당 주문 =====
  {
    id: 'cafe-01',
    category: 'cafe',
    en: 'Can I get a latte?',
    ko: '라떼 한 잔 주세요.',
    example: 'Hi, can I get an iced latte to go?',
    exampleKo: '안녕하세요, 아이스 라떼 테이크아웃으로 주세요.',
    highlight: 'can I get',
    note: "주문할 때 가장 흔한 표현이에요. I'd like보다 가볍고 자연스러워요."
  },
  {
    id: 'cafe-02',
    category: 'cafe',
    en: 'For here or to go?',
    ko: '매장에서 드시나요, 포장인가요?',
    example: 'Would you like that for here or to go?',
    exampleKo: '매장에서 드실 건가요, 포장해 드릴까요?',
    highlight: 'for here or to go',
    note: '주문할 때 점원이 자주 물어보는 말이에요. 미리 대답을 준비해 두면 편해요.'
  },
  {
    id: 'cafe-03',
    category: 'cafe',
    en: 'Could I get it decaf?',
    ko: '디카페인으로 바꿔 주세요.',
    example: 'Could I get it decaf with oat milk, please?',
    exampleKo: '귀리 우유 넣은 디카페인으로 주세요.',
    highlight: 'get it decaf',
    note: '옵션을 바꿔 달라고 할 땐 could로 시작하면 더 정중해요.'
  },
  {
    id: 'cafe-04',
    category: 'cafe',
    en: 'Can we get the check, please?',
    ko: '계산서 주세요.',
    example: 'Excuse me, can we get the check, please?',
    exampleKo: '저기요, 계산서 주세요.',
    highlight: 'get the check',
    note: "미국에서는 'check', 영국에서는 'bill'이라고 해요."
  },
  {
    id: 'cafe-05',
    category: 'cafe',
    en: 'Is this seat taken?',
    ko: '이 자리 앉아도 돼요?',
    example: 'Sorry to bother you, is this seat taken?',
    exampleKo: '실례합니다, 이 자리에 누가 앉아 있나요?',
    highlight: 'is this seat taken',
    note: '카페에서 빈자리를 물어볼 때 쓰는 정중한 표현이에요.'
  },
  {
    id: 'cafe-06',
    category: 'cafe',
    en: "I'll have the same.",
    ko: '저도 같은 걸로 주세요.',
    example: "That looks great, I'll have the same thing.",
    exampleKo: '그거 맛있어 보이네요, 저도 같은 걸로 주세요.',
    highlight: "I'll have the same",
    note: '메뉴 고르기가 귀찮을 때 딱 좋은 표현이에요.'
  },
  {
    id: 'cafe-07',
    category: 'cafe',
    en: 'Can I get this to go?',
    ko: '이거 포장해 주세요.',
    example: "I'm running late, can I get this to go?",
    exampleKo: '늦었어요, 이거 포장해 주세요.',
    highlight: 'get this to go',
    note: '다 먹지 못했을 때 포장을 요청하는 말이에요.'
  },
  {
    id: 'cafe-08',
    category: 'cafe',
    en: 'What do you recommend?',
    ko: '뭐가 맛있어요?',
    example: "It's my first time here, what do you recommend?",
    exampleKo: '처음 와봤는데, 뭐가 맛있어요?',
    highlight: 'what do you recommend',
    note: '처음 가는 가게에서 메뉴를 추천받을 때 써요.'
  },
  {
    id: 'cafe-09',
    category: 'cafe',
    en: 'Just the coffee, thanks.',
    ko: '커피만 주세요.',
    example: 'No dessert for me, just the coffee, thanks.',
    exampleKo: '디저트는 됐고, 커피만 주세요.',
    highlight: 'just the coffee',
    note: '딱 하나만 주문할 때 쓰는 표현이에요.'
  },
  {
    id: 'cafe-10',
    category: 'cafe',
    en: 'Could we sit outside?',
    ko: '밖에 앉아도 돼요?',
    example: "It's such a nice day, could we sit outside?",
    exampleKo: '날씨가 너무 좋은데, 밖에 앉아도 될까요?',
    highlight: 'sit outside',
    note: '테라스 자리를 원할 때 쓰는 표현이에요.'
  },
  // ===== 쇼핑 =====
  {
    id: 'shopping-01',
    category: 'shopping',
    en: "I'm just looking, thanks.",
    ko: '그냥 둘러보는 중이에요.',
    example: "No, I'm good. I'm just looking, thanks.",
    exampleKo: '아니요, 생일 선물 둘러보는 중이에요.',
    highlight: "I'm just looking",
    note: '점원이 말을 걸 때 부담 없이 거절하는 표현이에요.'
  },
  {
    id: 'shopping-02',
    category: 'shopping',
    en: 'Do you have this in medium?',
    ko: '이거 미디엄 사이즈 있어요?',
    example: 'I love this shirt, do you have it in medium?',
    exampleKo: '이 셔츠 마음에 드는데, 미디엄 사이즈 있나요?',
    highlight: 'have it in medium',
    note: '사이즈를 물을 때 가장 자연스러운 표현이에요.'
  },
  {
    id: 'shopping-03',
    category: 'shopping',
    en: 'Can I try this on?',
    ko: '입어봐도 돼요?',
    example: 'Excuse me, can I try this on in the fitting room?',
    exampleKo: '실례합니다, 피팅룸에서 입어봐도 될까요?',
    highlight: 'try this on',
    note: '옷을 입어보고 싶을 때 쓰는 말이에요.'
  },
  {
    id: 'shopping-04',
    category: 'shopping',
    en: 'Is this on sale?',
    ko: '이거 세일 중이에요?',
    example: 'Is this on sale, or is it full price?',
    exampleKo: '가격표가 없는데, 이거 세일 중인가요?',
    highlight: 'on sale',
    note: '할인 여부를 물을 때 쓰는 표현이에요.'
  },
  {
    id: 'shopping-05',
    category: 'shopping',
    en: "I'll take it.",
    ko: '이걸로 할게요.',
    example: "It fits perfectly. Okay, I'll take it.",
    exampleKo: '잘 어울리네요, 좋아요, 이걸로 할게요.',
    highlight: "I'll take it",
    note: '구매를 결정했을 때 쓰는 짧고 확실한 표현이에요.'
  },
  {
    id: 'shopping-06',
    category: 'shopping',
    en: 'Do you have anything cheaper?',
    ko: '좀 더 저렴한 건 없어요?',
    example: "That's a bit pricey, do you have anything cheaper?",
    exampleKo: '좀 비싸네요, 더 저렴한 건 없나요?',
    highlight: 'anything cheaper',
    note: '예산에 맞는 상품을 찾을 때 쓰는 표현이에요.'
  },
  {
    id: 'shopping-07',
    category: 'shopping',
    en: 'Can I return this?',
    ko: '이거 반품할 수 있어요?',
    example: 'I lost the receipt, can I still return this?',
    exampleKo: '영수증을 잃어버렸는데, 그래도 반품할 수 있나요?',
    highlight: 'return this',
    note: '반품이 가능한지 물을 때 쓰는 표현이에요.'
  },
  {
    id: 'shopping-08',
    category: 'shopping',
    en: 'How much is this?',
    ko: '이거 얼마예요?',
    example: "There's no price tag, how much is this?",
    exampleKo: '가격표가 없는데, 이거 얼마예요?',
    highlight: 'how much is this',
    note: '가격을 물을 때 가장 기본이 되는 표현이에요.'
  },
  {
    id: 'shopping-09',
    category: 'shopping',
    en: "I'm looking for a gift.",
    ko: '선물 찾고 있어요.',
    example: "I'm looking for a birthday gift for my best friend.",
    exampleKo: '제일 친한 친구 생일 선물을 찾고 있어요.',
    highlight: 'looking for',
    note: '점원에게 도움을 요청할 때 쓰는 표현이에요.'
  },
  {
    id: 'shopping-10',
    category: 'shopping',
    en: "That's too expensive for me.",
    ko: '저한텐 좀 비싸네요.',
    example: "I really like it, but that's too expensive for me.",
    exampleKo: '정말 마음에 드는데, 저한텐 좀 비싸네요.',
    highlight: 'too expensive for me',
    note: '가격이 부담될 때 솔직하게 말하는 표현이에요.'
  },
  // ===== 길 묻기 =====
  {
    id: 'directions-01',
    category: 'directions',
    en: "Excuse me, where's the subway station?",
    ko: '실례합니다, 지하철역이 어디예요?',
    example: "Excuse me, where's the nearest subway station around here?",
    exampleKo: '실례합니다, 이 근처에서 가장 가까운 지하철역이 어디예요?',
    highlight: "where's the nearest",
    note: '길을 물을 때 쓰는 정중한 시작 표현이에요.'
  },
  {
    id: 'directions-02',
    category: 'directions',
    en: 'Is this the right way to the station?',
    ko: '여기가 역 가는 길이 맞나요?',
    example: 'Is this the right way to the central station?',
    exampleKo: '여기가 중앙역 가는 길이 맞나요?',
    highlight: 'the right way',
    note: '가고 있는 방향이 맞는지 확인할 때 써요.'
  },
  {
    id: 'directions-03',
    category: 'directions',
    en: 'How do I get to the airport?',
    ko: '공항에 어떻게 가요?',
    example: 'How do I get to the airport from here?',
    exampleKo: '여기서 공항에 어떻게 가나요?',
    highlight: 'How do I get to',
    note: '목적지까지 가는 방법을 물을 때 쓰는 표현이에요.'
  },
  {
    id: 'directions-04',
    category: 'directions',
    en: "It's a five-minute walk.",
    ko: '걸어서 5분이에요.',
    example: "Don't take a taxi, it's just a five-minute walk.",
    exampleKo: '택시 타지 마세요, 걸어서 5분이에요.',
    highlight: 'five-minute walk',
    note: '거리를 설명할 때 쓰는 표현이에요.'
  },
  {
    id: 'directions-05',
    category: 'directions',
    en: 'Go straight, then turn left.',
    ko: '직진하다가 좌회전하세요.',
    example: 'Go straight for two blocks, then turn left.',
    exampleKo: '두 블록 직진하다가 좌회전하세요.',
    highlight: 'turn left',
    note: '길을 알려줄 때 쓰는 기본 표현이에요.'
  },
  {
    id: 'directions-06',
    category: 'directions',
    en: "It's right across the street.",
    ko: '길 바로 건너편이에요.',
    example: "You can't miss it, it's right across the street.",
    exampleKo: '못 찾을 리 없어요, 길 바로 건너편이에요.',
    highlight: 'right across the street',
    note: '가까운 위치를 설명할 때 쓰는 표현이에요.'
  },
  {
    id: 'directions-07',
    category: 'directions',
    en: 'Could you show me on the map?',
    ko: '지도에서 보여 주시겠어요?',
    example: "I'm totally lost, could you show me on the map?",
    exampleKo: '완전히 길을 잃었어요, 지도에서 보여 주시겠어요?',
    highlight: 'show me on the map',
    note: '말로 설명하기 어려울 때 쓰는 표현이에요.'
  },
  {
    id: 'directions-08',
    category: 'directions',
    en: 'Am I going the right way?',
    ko: '제가 맞는 방향으로 가고 있나요?',
    example: "I've been walking for a while, am I going the right way?",
    exampleKo: '한참 걸었는데, 제가 맞는 방향으로 가고 있나요?',
    highlight: 'going the right way',
    note: '걷다가 방향을 다시 확인할 때 쓰는 표현이에요.'
  },
  {
    id: 'directions-09',
    category: 'directions',
    en: 'Take the second right.',
    ko: '두 번째 길에서 우회전하세요.',
    example: 'At the traffic light, take the second right.',
    exampleKo: '신호등에서 두 번째 길로 우회전하세요.',
    highlight: 'take the second right',
    note: '길을 자세히 알려줄 때 쓰는 표현이에요.'
  },
  {
    id: 'directions-10',
    category: 'directions',
    en: "You can't miss it.",
    ko: '못 찾으실 리 없어요.',
    example: "It's the big red building, you can't miss it.",
    exampleKo: '큰 빨간 건물이니까 못 찾으실 리 없어요.',
    highlight: "you can't miss it",
    note: '찾기 쉬운 장소를 설명할 때 쓰는 표현이에요.'
  },
  // ===== 인사·자기소개 =====
  {
    id: 'greetings-01',
    category: 'greetings',
    en: 'Nice to meet you.',
    ko: '만나서 반가워요.',
    example: "Hi, I'm Sarah from marketing, nice to meet you.",
    exampleKo: '안녕하세요, 마케팅팀 사라예요, 만나서 반가워요.',
    highlight: 'nice to meet you',
    note: '처음 만났을 때 쓰는 가장 기본적인 인사예요.'
  },
  {
    id: 'greetings-02',
    category: 'greetings',
    en: "How's it going?",
    ko: '어떻게 지내?',
    example: "Hey Mike, long time no see, how's it going?",
    exampleKo: '야 마이크, 오랜만이다, 어떻게 지내?',
    highlight: "how's it going",
    note: '친한 사이에서 쓰는 가벼운 안부 인사예요.'
  },
  {
    id: 'greetings-03',
    category: 'greetings',
    en: 'What do you do?',
    ko: '무슨 일 하세요?',
    example: 'So, what do you do for work?',
    exampleKo: '이야기 나눠서 반가워요, 무슨 일 하세요?',
    highlight: 'what do you do',
    note: '상대의 직업을 물을 때 쓰는 자연스러운 표현이에요.'
  },
  {
    id: 'greetings-04',
    category: 'greetings',
    en: "I'm from Korea.",
    ko: '한국에서 왔어요.',
    example: "I'm from Korea, but I've lived here for five years.",
    exampleKo: '한국에서 왔는데, 여기서 산 지 5년 됐어요.',
    highlight: "I'm from Korea",
    note: '자신의 출신을 밝힐 때 쓰는 표현이에요.'
  },
  {
    id: 'greetings-05',
    category: 'greetings',
    en: 'See you later!',
    ko: '나중에 봐!',
    example: "This was fun, I gotta run, see you later!",
    exampleKo: '재밌었어, 나 가봐야 해, 나중에 봐!',
    highlight: 'see you later',
    note: '헤어질 때 쓰는 가벼운 인사예요.'
  },
  {
    id: 'greetings-06',
    category: 'greetings',
    en: 'Long time no see!',
    ko: '오랜만이야!',
    example: "Wow, long time no see! How have you been?",
    exampleKo: '와, 오랜만이다! 어떻게 지냈어?',
    highlight: 'long time no see',
    note: '오래간만에 만났을 때 쓰는 반가운 인사예요.'
  },
  {
    id: 'greetings-07',
    category: 'greetings',
    en: 'How do you know him?',
    ko: '그분이랑 어떻게 아는 사이예요?',
    example: 'So how do you know him? Did you go to school together?',
    exampleKo: '신랑 친구예요? 그분이랑 어떻게 아는 사이예요?',
    highlight: 'how do you know',
    note: '모임에서 서로의 관계를 물을 때 쓰는 표현이에요.'
  },
  {
    id: 'greetings-08',
    category: 'greetings',
    en: 'What brings you here?',
    ko: '여긴 어쩐 일로 오셨어요?',
    example: "Hey, what brings you here today?",
    exampleKo: '여기서 볼 줄 몰랐는데, 어쩐 일로 오셨어요?',
    highlight: 'what brings you here',
    note: '우연히 만났을 때 용무를 물을 때 쓰는 표현이에요.'
  },
  {
    id: 'greetings-09',
    category: 'greetings',
    en: "It was nice talking to you.",
    ko: '이야기 나눠서 즐거웠어요.',
    example: "Well, it was nice talking to you. Hope to see you again.",
    exampleKo: '이야기 나눠서 즐거웠어요, 또 뵈었으면 좋겠네요.',
    highlight: 'nice talking to you',
    note: '대화를 마무리할 때 쓰는 정중한 표현이에요.'
  },
  {
    id: 'greetings-10',
    category: 'greetings',
    en: 'Let me introduce myself.',
    ko: '자기소개할게요.',
    example: "Hi everyone, let me introduce myself, I'm David.",
    exampleKo: '여러분 안녕하세요, 자기소개할게요, 데이빗이에요.',
    highlight: 'let me introduce myself',
    note: '모임에서 자신을 소개할 때 쓰는 표현이에요.'
  },
  // ===== 전화·약속 =====
  {
    id: 'phone-01',
    category: 'phone',
    en: 'Can I call you back?',
    ko: '나중에 다시 전화해도 돼요?',
    example: "I'm in a meeting right now, can I call you back?",
    exampleKo: '지금 회의 중인데, 나중에 다시 전화해도 돼요?',
    highlight: 'call you back',
    note: '지금 통화하기 어려울 때 쓰는 표현이에요.'
  },
  {
    id: 'phone-02',
    category: 'phone',
    en: "You're breaking up.",
    ko: '목소리가 끊겨요.',
    example: "Sorry, you're breaking up, can you hear me?",
    exampleKo: '죄송해요, 목소리가 끊기는데, 제 말 들리세요?',
    highlight: 'breaking up',
    note: '통화 음질이 안 좋을 때 쓰는 표현이에요.'
  },
  {
    id: 'phone-03',
    category: 'phone',
    en: 'Let me get back to you.',
    ko: '확인하고 다시 연락드릴게요.',
    example: 'I need to check the schedule, let me get back to you.',
    exampleKo: '일정을 확인해야 해서, 확인하고 다시 연락드릴게요.',
    highlight: 'get back to you',
    note: '바로 답하기 어려울 때 쓰는 표현이에요.'
  },
  {
    id: 'phone-04',
    category: 'phone',
    en: 'Do you have a minute?',
    ko: '잠깐 시간 돼요?',
    example: 'Do you have a minute to talk about tomorrow?',
    exampleKo: '내일 일에 대해 잠깐 이야기할 시간 돼요?',
    highlight: 'have a minute',
    note: '대화나 통화를 시작할 때 쓰는 표현이에요.'
  },
  {
    id: 'phone-05',
    category: 'phone',
    en: "I'll text you the details.",
    ko: '자세한 건 문자로 보낼게요.',
    example: "I'm driving now, so I'll text you the details later.",
    exampleKo: '좀 복잡해서, 자세한 건 나중에 문자로 보낼게요.',
    highlight: 'text you the details',
    note: '전화로 설명하기 어려울 때 쓰는 표현이에요.'
  },
  {
    id: 'phone-06',
    category: 'phone',
    en: 'Sorry I missed your call.',
    ko: '전화 못 받아서 미안해요.',
    example: 'Sorry I missed your call earlier, I was driving home.',
    exampleKo: '아까 전화 못 받았어, 미안해, 집에 운전 중이었어.',
    highlight: 'missed your call',
    note: '부재중 전화에 답할 때 쓰는 표현이에요.'
  },
  {
    id: 'phone-07',
    category: 'phone',
    en: 'Can you hear me?',
    ko: '제 말 들리세요?',
    example: 'The connection is bad, can you hear me okay?',
    exampleKo: '연결이 안 좋은데, 제 말 잘 들리세요?',
    highlight: 'can you hear me',
    note: '통화 상태를 확인할 때 쓰는 표현이에요.'
  },
  {
    id: 'phone-08',
    category: 'phone',
    en: "Let's meet up this weekend.",
    ko: '이번 주말에 만나요.',
    example: "It's been too long, let's meet up this weekend.",
    exampleKo: '너무 오랜만이네, 이번 주말에 만나요.',
    highlight: 'meet up',
    note: '약속을 잡을 때 쓰는 자연스러운 표현이에요.'
  },
  {
    id: 'phone-09',
    category: 'phone',
    en: 'Something came up.',
    ko: '급한 일이 생겼어요.',
    example: "I'm sorry, something came up, I can't make it.",
    exampleKo: '미안해, 급한 일이 생겨서 못 갈 것 같아.',
    highlight: 'something came up',
    note: '약속을 취소할 때 돌려서 말하는 표현이에요.'
  },
  {
    id: 'phone-10',
    category: 'phone',
    en: "I'll be there in ten minutes.",
    ko: '10분 안에 도착해요.',
    example: "Don't worry, I'll be there in ten minutes.",
    exampleKo: '걱정 마세요, 10분 안에 도착해요.',
    highlight: 'be there in ten minutes',
    note: '늦을 때 도착 시간을 알릴 때 쓰는 표현이에요.'
  },
  // ===== 여행·공항 =====
  {
    id: 'travel-01',
    category: 'travel',
    en: "Can I get a window seat?",
    ko: '창가 자리로 주세요.',
    example: "If there's one left, can I get a window seat?",
    exampleKo: '가능하면 창가 자리로 주세요.',
    highlight: 'window seat',
    note: '비행기 좌석을 요청할 때 쓰는 표현이에요.'
  },
  {
    id: 'travel-02',
    category: 'travel',
    en: 'Is this the right gate?',
    ko: '이 게이트가 맞나요?',
    example: 'My flight is at six, is this the right gate?',
    exampleKo: '제 비행기가 6시인데, 이 게이트가 맞나요?',
    highlight: 'the right gate',
    note: '공항에서 게이트를 확인할 때 쓰는 표현이에요.'
  },
  {
    id: 'travel-03',
    category: 'travel',
    en: 'My flight got delayed.',
    ko: '제 비행기가 지연됐어요.',
    example: 'Bad news, my flight got delayed by two hours.',
    exampleKo: '안 좋은 소식이에요, 제 비행기가 2시간 지연됐어요.',
    highlight: 'got delayed',
    note: '비행기 지연 소식을 전할 때 쓰는 표현이에요.'
  },
  {
    id: 'travel-04',
    category: 'travel',
    en: "Where's the baggage claim?",
    ko: '수하물 찾는 곳이 어디예요?',
    example: "Excuse me, where's the baggage claim for international flights?",
    exampleKo: '실례합니다, 국제선 수하물 찾는 곳이 어디예요?',
    highlight: 'baggage claim',
    note: '공항에서 짐 찾는 곳을 물을 때 써요.'
  },
  {
    id: 'travel-05',
    category: 'travel',
    en: 'How long is the flight?',
    ko: '비행 시간이 얼마나 돼요?',
    example: 'How long is the flight from here to Tokyo?',
    exampleKo: '여기서 도쿄까지 비행 시간이 얼마나 돼요?',
    highlight: 'How long is the flight',
    note: '비행 시간을 물을 때 쓰는 표현이에요.'
  },
  {
    id: 'travel-06',
    category: 'travel',
    en: 'I have a connecting flight.',
    ko: '환승 비행기가 있어요.',
    example: "Sorry, I'm in a rush. I have a connecting flight in an hour.",
    exampleKo: '서두르세요, 1시간 뒤에 환승 비행기가 있어요.',
    highlight: 'connecting flight',
    note: '환승편이 있을 때 쓰는 표현이에요.'
  },
  {
    id: 'travel-07',
    category: 'travel',
    en: 'Can I get a taxi here?',
    ko: '여기서 택시 잡을 수 있어요?',
    example: "It's late, can I get a taxi around here?",
    exampleKo: '늦었는데, 이 근처에서 택시 잡을 수 있어요?',
    highlight: 'get a taxi',
    note: '공항이나 역에서 택시를 물을 때 써요.'
  },
  {
    id: 'travel-08',
    category: 'travel',
    en: "I'm here on vacation.",
    ko: '휴가로 왔어요.',
    example: "No business this time. I'm here on vacation for two weeks.",
    exampleKo: '그냥 놀러 왔어요, 2주 동안 휴가로 왔어요.',
    highlight: 'here on vacation',
    note: '방문 목적을 말할 때 쓰는 표현이에요.'
  },
  {
    id: 'travel-09',
    category: 'travel',
    en: 'Is breakfast included?',
    ko: '조식 포함이에요?',
    example: 'The room looks nice, is breakfast included in the rate?',
    exampleKo: '방이 괜찮네요, 요금에 조식 포함이에요?',
    highlight: 'breakfast included',
    note: '호텔 요금 조건을 확인할 때 쓰는 표현이에요.'
  },
  {
    id: 'travel-10',
    category: 'travel',
    en: "My bag didn't show up.",
    ko: '제 가방이 안 나왔어요.',
    example: "Everyone got their bags, but mine didn't show up.",
    exampleKo: '다들 가방을 찾았는데, 제 것만 안 나왔어요.',
    highlight: "didn't show up",
    note: '수하물이 안 나왔을 때 쓰는 표현이에요.'
  },
  // ===== 직장 기본 표현 =====
  {
    id: 'work-01',
    category: 'work',
    en: "I'll look into it.",
    ko: '확인해 볼게요.',
    example: "That's a good question, I'll look into it.",
    exampleKo: '좋은 질문이네요, 확인해 볼게요.',
    highlight: 'look into it',
    note: '바로 답하기 어려울 때 쓰는 표현이에요.'
  },
  {
    id: 'work-02',
    category: 'work',
    en: "Let's touch base tomorrow.",
    ko: '내일 다시 얘기해요.',
    example: "Let's touch base tomorrow morning about the budget.",
    exampleKo: '내일 아침에 예산 건으로 다시 얘기해요.',
    highlight: 'touch base',
    note: '나중에 다시 얘기하자는 비즈니스 표현이에요.'
  },
  {
    id: 'work-03',
    category: 'work',
    en: "Sorry I'm late.",
    ko: '늦어서 죄송해요.',
    example: "Sorry I'm late everyone, the train was delayed again.",
    exampleKo: '여러분 늦어서 죄송해요, 기차가 또 지연됐어요.',
    highlight: "Sorry I'm late",
    note: '회의에 늦었을 때 쓰는 표현이에요.'
  },
  {
    id: 'work-04',
    category: 'work',
    en: 'Could you send me the file?',
    ko: '파일 보내 주시겠어요?',
    example: 'Could you send me the file when you get a chance?',
    exampleKo: '시간 되실 때 파일 보내 주시겠어요?',
    highlight: 'send me the file',
    note: '자료를 정중하게 요청할 때 쓰는 표현이에요.'
  },
  {
    id: 'work-05',
    category: 'work',
    en: 'That works for me.',
    ko: '저한텐 괜찮아요.',
    example: 'Friday at two? Yeah, that works for me.',
    exampleKo: '금요일 2시는 어때요? 저한텐 괜찮아요.',
    highlight: 'that works for me',
    note: '일정 제안에 동의할 때 쓰는 표현이에요.'
  },
  {
    id: 'work-06',
    category: 'work',
    en: 'I need a hand with this.',
    ko: '이거 좀 도와주세요.',
    example: 'This report is huge, I need a hand with this.',
    exampleKo: '이 보고서가 너무 방대한데, 좀 도와주세요.',
    highlight: 'need a hand',
    note: '도움을 요청할 때 쓰는 자연스러운 표현이에요.'
  },
  {
    id: 'work-07',
    category: 'work',
    en: "Let's wrap this up.",
    ko: '이제 마무리해요.',
    example: "We're running out of time, let's wrap this up.",
    exampleKo: '시간이 다 됐으니, 이제 마무리해요.',
    highlight: 'wrap this up',
    note: '회의나 작업을 끝낼 때 쓰는 표현이에요.'
  },
  {
    id: 'work-08',
    category: 'work',
    en: 'Keep me posted.',
    ko: '소식 있으면 알려 주세요.',
    example: 'Keep me posted on how the interview goes.',
    exampleKo: '면접 어떻게 되는지 소식 알려 주세요.',
    highlight: 'Keep me posted',
    note: '진행 상황을 공유해 달라고 할 때 써요.'
  },
  {
    id: 'work-09',
    category: 'work',
    en: "I'm swamped today.",
    ko: '오늘 너무 바빠요.',
    example: "Can we do this tomorrow? I'm swamped today.",
    exampleKo: '내일로 미룰 수 있을까요? 오늘 너무 바빠요.',
    highlight: "I'm swamped",
    note: '너무 바빠서 미룰 때 쓰는 구어체 표현이에요.'
  },
  {
    id: 'work-10',
    category: 'work',
    en: 'Sounds good to me.',
    ko: '좋네요, 찬성이에요.',
    example: 'I read the proposal, and it sounds good to me.',
    exampleKo: '제안서 읽어봤는데, 좋네요, 찬성이에요.',
    highlight: 'sounds good to me',
    note: '상대의 의견에 동의할 때 쓰는 표현이에요.'
  },
];
