import { Record } from 'immutable';

const StateRecord = Record({
  order: false, // 주문 접수 요청
  reject: false, // 배달 거절
  takeTime: false, // 배달 예상소요시간
  orderAccept: false, // 포장, 매장 접수처리
  progressCancel: false, // 주문 처리중에 취소
  orderComplete: false, // 주문이 완료됨 (배달완료)
});

export const ui = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'ui/OPEN_POPUP':
      return state;
    case 'ui/CLOSE_POPUP':
      return state;
    default:
      return state;
  }
};
