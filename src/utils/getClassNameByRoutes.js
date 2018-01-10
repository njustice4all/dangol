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
    // FIXME: loggin일때 classname다름
    case '/':
      return { classname: 'orderList', title: '로그인', buttonOpenSideMenu: true };
    case '/order/reception':
      return { classname: 'orderList', title: '주문목록', buttonOpenSideMenu: false };
    default:
      return { classname: '', title: '', buttonOpenSideMenu: false };
  }
};
