// @flow

type routeObject = {
  hash: string,
  pathname: string,
  search: string,
};

type route = {
  classname: string,
  title: string,
};

export default (routeObject: routeObject, status: string): route => {
  switch (routeObject.pathname) {
    case '/':
      return { classname: 'order-manage-wrapper login', title: '로그인' };
    case '/order/reception':
      return { classname: 'orderList', title: '주문목록', buttonOpenSideMenu: true };
    case '/order/progress':
      return { classname: 'orderList', title: '주문목록', buttonOpenSideMenu: true };
    case '/order/complete':
      return { classname: 'orderList', title: '주문목록', buttonOpenSideMenu: true };
    case '/menus/delivery':
      return { classname: 'order-manage-wrapper', title: '배달 주문 임시 중단', buttonClose: true };
    case '/menus/setting':
      return { classname: 'order-manage-wrapper setup', title: '설정', buttonClose: true };
    case '/menus/management':
      return { classname: 'order-manage-wrapper', title: '업소 부관리자 관리', buttonClose: true };
    case '/menus/management/add':
      return { classname: 'order-manage-wrapper add', title: '업소 부관리자 등록', goBack: true };
    case '/menus/admin':
      return {
        classname: 'order-manage-wrapper add',
        title: '사장님 계정 정보 수정',
        goBack: true,
      };
    case '/ceo/shop':
      return { classname: 'order-manage-wrapper add', title: '업소 정보 수정', goBack: true };
    case '/ceo/products':
      return { classname: 'order-manage-wrapper add', title: '업소 정보 수정', goBack: true };
    case '/ceo/terms/use':
      return {
        classname: 'order-manage-wrapper add',
        title: '약관 및 기본정보 수정',
        goBack: true,
        color: '#fe931f',
      };
    case '/ceo/terms/personal':
      return {
        classname: 'order-manage-wrapper add',
        title: '약관 및 기본정보 수정',
        goBack: true,
        color: '#fe931f',
      };
    case '/ceo/terms/agreement':
      return {
        classname: 'order-manage-wrapper add',
        title: '약관 및 기본정보 수정',
        goBack: true,
        color: '#fe931f',
      };
    default:
      try {
        if (routeObject.pathname.split('/order/')[1].split('/')[0] === 'complete') {
          return {
            classname: `orderDetail ${status === 'accept' ? 'done' : 'done cancel'}`,
            title: '주문상세',
            detail: true,
          };
        }
      } catch (error) {
        console.log(error);
      }

      return { classname: 'orderDetail', title: '주문상세', detail: true };
  }
};
