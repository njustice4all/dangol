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

export default (routeObject: routeObject, status: string, payment: string): route => {
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
    case '/menus/management/addReseller':
      return { classname: 'order-manage-wrapper add', title: '리셀러 등록', goBack: true };
    case '/menus/statistics':
      return { classname: 'order-manage-wrapper add', title: '업소 통계', buttonClose: true };
    case '/menus/admin':
      return {
        classname: 'order-manage-wrapper add',
        title: '계정 정보 수정',
        goBack: true,
      };
    case '/ceo/shop':
      return { classname: 'order-manage-wrapper add', title: '업소 정보 수정', goBack: true };
    case '/ceo/products':
      return { classname: 'order-manage-wrapper add', title: '업소 정보 수정', goBack: true };
    case '/ceo/products/input':
      return { classname: 'order-manage-wrapper add', title: '업소 정보 수정', goBack: true };
    case '/ceo/terms/use':
      return {
        classname: 'order-manage-wrapper add terms',
        title: '약관 및 기본정보 수정',
        goBack: true,
        color: '#fe931f',
      };
    case '/ceo/terms/personal':
      return {
        classname: 'order-manage-wrapper add terms',
        title: '약관 및 기본정보 수정',
        goBack: true,
        color: '#fe931f',
      };
    case '/ceo/terms/agreement':
      return {
        classname: 'order-manage-wrapper add terms',
        title: '약관 및 기본정보 수정',
        goBack: true,
        color: '#fe931f',
      };
    default:
      try {
        if (routeObject.pathname.split('/menus/management/')[0] === '') {
          return {
            classname: 'order-manage-wrapper add',
            title: '업소 부관리자 정보 수정',
            goBack: true,
          };
        }

        if (routeObject.pathname.split('/order/')[1].split('/')[0] === 'complete') {
          return {
            classname: `orderDetail ${status === 'deliveryDone' ? 'done' : 'done cancel'}`,
            title: '주문상세',
            detail: true,
          };
        } else if (
          routeObject.pathname.split('/').includes('progress') &&
          routeObject.pathname.split('/').length > 3
        ) {
          return {
            classname: `orderDetail ${
              payment === 'counter' || payment === 'meetPay' ? 'done' : 'done cancel'
            }`,
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
