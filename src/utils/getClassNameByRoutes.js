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

export default (routeObject: routeObject): route => {
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
    default:
      return {
        classname: 'orderDetail',
        title: '주문상세',
        buttonOpenSideMenu: false,
        detail: true,
      };
  }
};
