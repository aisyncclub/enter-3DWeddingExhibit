// Shared content for the Invitique v2 landing.
// Wedding imagery is reused from the existing demo so the page stays cohesive.

export const PHOTOS = [
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/35cebb25-7ff8-4b.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e85d4e93-e5c7-47.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/abc7c6d8-7010-41.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/3211278c-2ddc-43.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/e84c9415-3a76-4a.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/5e49acda-11ff-4f.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/a90ff767-0071-4e.png',
  'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100077952/15be2420-ffdc-44.png',
];

export interface Template {
  name: string;
  kr: string;
  desc: string;
  photo: string;
  href: string;
}

export const TEMPLATES: Template[] = [
  {
    name: 'Blanc',
    kr: '블랑',
    desc: '순백의 미니멀. 사진이 주인공이 되는, 군더더기 없는 청첩장.',
    photo: PHOTOS[1],
    href: '/demo-v2',
  },
  {
    name: 'Lumière',
    kr: '뤼미에르',
    desc: '크림 웜톤에 캐러멜 포인트. 따뜻한 빛이 감도는 에디토리얼.',
    photo: PHOTOS[4],
    href: '/demo-v2',
  },
  {
    name: 'Nuit',
    kr: '뉘이',
    desc: '딥 브라운 × 골드. 밤의 우아함을 담은 다크 엘레강스.',
    photo: PHOTOS[7],
    href: '/demo-v2',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const avatar = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop&dpr=2`;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '사진만 넣었을 뿐인데 잡지 같은 청첩장이 나왔어요. 링크를 받은 하객들이 다들 어디서 만들었냐고 물어봤어요.',
    name: '김서연',
    role: '신부 · 2026.05 결혼',
    avatar: avatar(733872),
  },
  {
    quote:
      '종이 청첩장 대신 모바일로 했는데, RSVP 집계랑 식사 인원 파악이 너무 편했어요. 양가 부모님도 만족하셨어요.',
    name: '박준호',
    role: '신랑 · 2026.04 결혼',
    avatar: avatar(220453),
  },
  {
    quote:
      'Nuit 템플릿이 정말 고급스러워요. 결혼식 분위기랑 딱 맞아서, 청첩장만 봐도 설렌다는 말을 많이 들었어요.',
    name: '이지은',
    role: '신부 · 2026.06 결혼',
    avatar: avatar(1239291),
  },
  {
    quote:
      '10분 만에 만들었는데 외주 맡긴 것 같은 퀄리티예요. 수정도 바로바로 반영돼서 마감 직전에도 든든했어요.',
    name: '최민재',
    role: '신랑 · 2026.05 결혼',
    avatar: avatar(91227),
  },
  {
    quote:
      '방명록이랑 마음 전하기 기능까지 하나로 다 됐어요. 따로 링크 여러 개 보낼 필요 없이 깔끔했습니다.',
    name: '정하늘',
    role: '신부 · 2026.03 결혼',
    avatar: avatar(415829),
  },
];
