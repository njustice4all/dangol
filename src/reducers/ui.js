import { Record } from 'immutable';

const StateRecord = Record({
  order: false, // 주문 접수 요청
  reject: false, // 배달 거절
  takeTime: false, // 배달 예상소요시간
  orderAccept: true, // 포장, 매장 접수처리
  progressCancel: false, // 주문 처리중에 취소
  orderComplete: false, // 주문이 완료됨 (배달완료)
  sideMenu: false, // 사이드메뉴
  isPop: false, // 팝업 오픈시 true
});

const _openPopup = (state, action) => {
  return state.withMutations(s => s.set(action.ui, true).set('isPop', true));
};

const _closePopup = (state, action) => {
  return state.withMutations(s => s.set(action.ui, false).set('isPop', false));
};

const _toggleSideMenu = (state, action) => {
  return state.set(action.ui, state.get('sideMenu'));
};

export const ui = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'ui/OPEN_POPUP':
      return _openPopup(state, action);
    case 'ui/CLOSE_POPUP':
      return _closePopup(state, action);
    case 'ui/TOGGLE_SIDEMENU':
      return _toggleSideMenu(state, action);
    default:
      return state;
  }
};
