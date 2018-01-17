export const orderLists = [
  {
    no: 'OERG30903',
    date: '15:49',
    type: 'delivery',
    address: '서울특별시 강남구 삼성로 81길 31, 4층 402호',
    distance: '1.5km',
    takeTime: '20분',
    coords: {
      lat: 37.511474,
      lng: 127.053677,
    },
    request: '빨리 와 주세요~',
  },
  {
    no: 'OERG30903',
    date: '15:44',
    type: 'order',
    tableNo: '25',
    request: '제발 연유라떼에 연유좀 빼주세요',
  },
  {
    no: 'OERG30903',
    date: '15:30',
    type: 'package',
    pickupAfter: '30분',
    request: '30분있다가 포장 꼭',
  },
  {
    no: 'OERG30903',
    date: '15:49',
    type: 'delivery',
    address: '서울특별시 강남구 삼성로 81길 31, 4층 402호',
    distance: '1.5km',
    takeTime: '20분',
    coords: {
      lat: 37.511474,
      lng: 127.053677,
    },
    request: '빨리 와 주세요~',
  },
  {
    no: 'OERG30903',
    date: '15:44',
    type: 'order',
    tableNo: '25',
    request: '제발 연유라떼에 연유좀 빼주세요',
  },
  {
    no: 'OERG30903',
    date: '15:30',
    type: 'package',
    pickupAfter: '30분',
    request: '30분있다가 포장 꼭',
  },
  {
    no: 'OERG30903',
    date: '15:49',
    type: 'delivery',
    address: '서울특별시 강남구 삼성로 81길 31, 4층 402호',
    distance: '1.5km',
    takeTime: '20분',
    coords: {
      lat: 37.511474,
      lng: 127.053677,
    },
    request: '빨리 와 주세요~',
  },
  {
    no: 'OERG30903',
    date: '15:44',
    type: 'order',
    tableNo: '25',
    request: '제발 연유라떼에 연유좀 빼주세요',
  },
  {
    no: 'OERG30903',
    date: '15:30',
    type: 'package',
    pickupAfter: '30분',
    request: '30분있다가 포장 꼭',
  },
];

export const orderDetail = {
  order: {
    no: 'OERG30903',
    type: 'delivery',
    date: '2018-01-10 09:30',
    paymentMethod: '만나서결제 / 카드',
    totalPay: 21000,
    // 주문상태 reject or accept
    status: 'reject',
    /**
     * 주문상태에따른 옵션
     * reject - noResources private tooFar busy
     * accept - 30, 40... 분
     */
    option: '',
  },
  customer: {
    phone: '010-1234-5678',
    address: '서울특별시 삼성로 81길 31, 4층',
    coords: {
      lat: 37.503854,
      lng: 127.065077,
    },
    request: '카드로 계산하겠습니다.',
  },
  products: [
    {
      name: '반반치킨(후아리드 + 양념)',
      quantity: 1,
      price: 18000,
    },
    {
      name: '코카콜라',
      quantity: 2,
      price: 1000,
    },
    {
      name: '소스',
      quantity: 2,
      price: 500,
    },
  ],
};

// shop이 될 수 있음
export const info = {
  name: '김아티',
  address: '서울특별시 강남구 삼성로81길 31',
};

export const orderDoneLists = [
  {
    no: 'OERG30903',
    date: '15:49',
    type: 'delivery',
    address: '서울특별시 강남구 삼성로 81길 31, 4층 402호',
    distance: '1.5km',
    takeTime: '20분',
    coords: {
      lat: 37.511474,
      lng: 127.053677,
    },
    request: '빨리 와 주세요~',
    status: 'accept',
  },
  {
    no: 'OERG30903',
    date: '15:44',
    type: 'order',
    tableNo: '25',
    request: '제발 연유라떼에 연유좀 빼주세요',
    status: 'reject',
  },
  {
    no: 'OERG30903',
    date: '15:30',
    type: 'package',
    pickupAfter: '30분',
    request: '30분있다가 포장 꼭',
    status: 'accept',
  },
  {
    no: 'OERG30903',
    date: '15:49',
    type: 'delivery',
    address: '서울특별시 강남구 삼성로 81길 31, 4층 402호',
    distance: '1.5km',
    takeTime: '20분',
    coords: {
      lat: 37.511474,
      lng: 127.053677,
    },
    request: '빨리 와 주세요~',
    status: 'reject',
  },
  {
    no: 'OERG30903',
    date: '15:44',
    type: 'order',
    tableNo: '25',
    request: '제발 연유라떼에 연유좀 빼주세요',
    status: 'accept',
  },
  {
    no: 'OERG30903',
    date: '15:30',
    type: 'package',
    pickupAfter: '30분',
    request: '30분있다가 포장 꼭',
    status: 'reject',
  },
];
