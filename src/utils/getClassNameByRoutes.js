// @flow

type routeObject = {
  hash: string,
  pathname: string,
  search: string,
};

type route = {
  classname: string,
  title: string,
  buttonOpenSideMenu: boolean,
};

export default (routeObject: routeObject, status: string): route => {
  switch (routeObject.pathname) {
    case '/':
      return {
        classname: 'order-manage-wrapper login',
        title: '로그인',
        buttonOpenSideMenu: false,
        detail: false,
      };
    case '/order/reception':
      return {
        classname: 'orderList',
        title: '주문목록',
        buttonOpenSideMenu: true,
        detail: false,
      };
    case '/order/progress':
      return {
        classname: 'orderList',
        title: '주문목록',
        buttonOpenSideMenu: true,
        detail: false,
      };
    case '/order/complete':
      return { classname: 'orderList', title: '주문목록', buttonOpenSideMenu: true, detail: false };
    case '/menus/delivery':
      return {
        classname: 'order-manage-wrapper',
        title: '배달 주문 임시 중단',
        buttonOpenSideMenu: false,
        detail: false,
        buttonClose: true,
      };
    case '/menus/setting':
      return {
        classname: 'order-manage-wrapper setup',
        title: '설정',
        buttonOpenSideMenu: false,
        detail: false,
        buttonClose: true,
      };
    case '/menus/management':
      return {
        classname: 'order-manage-wrapper',
        title: '업소 부관리자 관리',
        buttonOpenSideMenu: false,
        detail: false,
        buttonClose: true,
      };
    case '/menus/management/add':
      return {
        classname: 'order-manage-wrapper add',
        title: '업소 부관리자 등록',
        buttonOpenSideMenu: false,
        detail: false,
        buttonClose: true,
      };
    default:
      if (routeObject.pathname.split('/order/')[1].split('/')[0] === 'complete') {
        return {
          classname: `orderDetail ${status === 'accept' ? 'done' : 'done cancel'}`,
          title: '주문상세',
          buttonOpenSideMenu: false,
          detail: true,
        };
      }
      return {
        classname: 'orderDetail',
        title: '주문상세',
        buttonOpenSideMenu: false,
        detail: true,
      };
  }
};
