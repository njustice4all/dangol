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
