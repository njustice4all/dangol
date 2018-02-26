import $ from 'jquery';
import { DAUM_ADDRESS, DAUM_KEY, ATY_URI, ATY_DGP } from '../constants';

const DATA = {
  keyWord: 'GetProductList',
  shop: 1,
  search: {
    searchType: '0',
    keyword: '',
    periodType: '0',
    period_msg: '',
    period_start: '',
    period_end: '',
    customPriceStart: '',
    customPriceEnd: '',
    feeStart: '',
    feeEnd: '',
    stockType: '0',
    stockStart: '',
    stockEnd: '',
    option: '0',
    point: '0',
    delivery: '0',
    salePC: '0',
    saleMobile: '0',
    deliveryFree: '1',
    deliveryFix: '1',
    deliveryPrice: '1',
    deliveryWeight: '1',
    category: '',
    brand: '',
  },
  order: {
    name: 'regdate',
    sort: '1',
  },
  limit: 20,
  page: 1,
};

/**
 * 주소검색
 */
export const apiAddress = query => {
  return fetch(
    `${DAUM_ADDRESS}?currentPage=1&countPerPage=10&keyword=${query}&confmKey=${DAUM_KEY}&resultType=json`
  );
};

/**
 * 주소검색 더읽기
 */
export const apiLoadMoreAddress = (query, page = 1) => {
  return fetch(
    `${DAUM_ADDRESS}?currentPage=${page}&countPerPage=10&keyword=${query}&confmKey=${DAUM_KEY}&resultType=json`
  );
};

/**
 * 상점정보 가져오기
 */
export const apiGetShopInfo = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_basic.php',
      data: {
        siteId: payload.siteId,
        keyWord: 'GetBasicInfo_Dgp',
        shop: 1,
      },
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(console.error('login error'));
      },
    });
  });
};

/**
 * 상품정보 가져오기
 */
export const apiGetProducts = payload => {
  const newData = { ...DATA, siteId: payload.siteId };

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_product.php',
      data: newData,
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};

/**
 * 상품삭제
 */
export const apiDelProduct = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_product.php',
      data: {
        siteId: payload.siteId,
        keyWord: 'DelProductItem',
        idx: payload.idx,
      },
      success: result => {
        resolve({ success: true });
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};

/**
 * 상품수정
 */
export const apiSetProduct = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_product.php',
      data: {
        siteId: payload.siteId,
        keyWord: 'AddProductItem_Dgp',
        data: payload.result,
      },
      success: result => {
        resolve({ success: true });
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};

/**
 * 상점 수정
 */
export const apiSetShop = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_basic.php',
      data: {
        siteId: payload.siteId,
        keyWord: 'SetBasicInfo_Dgp',
        setData: payload.result,
        shop_idx: 1,
      },
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};

/**
 * 상품 디테일정보
 */
export const apiGetProductDetail = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_product.php',
      data: {
        siteId: payload.siteId,
        keyWord: 'GetProductItem',
        shop: 1,
        idx: payload.idx,
      },
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};

/**
 * 부관리자 정보 조회
 */
export const apiGetManagers = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_DGP + '/memberGet',
      data: {
        id: payload.id,
        secret: payload.secret,
      },
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};

/**
 * 부관리자 수정/추가
 */
export const apiSetManager = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_DGP + '/memberSet',
      data: {
        id: payload.id,
        secret: payload.secret,
        userId: payload.userId,
        userPw: payload.userPw,
        userName: payload.userName,
        userRole: payload.userRole,
      },
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};

/**
 * 부관리자 삭제
 */
export const apiDeleteManager = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_DGP + '/memberDel',
      data: {
        id: payload.id,
        secret: payload.secret,
        userId: payload.member,
      },
      success: result => {
        resolve(result);
      },
      error: error => {
        reject(error);
      },
    });
  });
};

/**
 * 약관 조회
 */
export const apiGetTerms = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_basic.php',
      data: {
        siteId: payload.siteId,
        keyWord: 'GetBasicItem',
        shop: 1,
        data: payload.lists,
      },
      success: result => {
        resolve(result);
      },
      error: error => {
        reject(error);
      },
    });
  });
};

/**
 * 약관 수정
 */
export const apiSetTerms = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_basic.php',
      data: {
        siteId: payload.siteId,
        keyWord: 'SetBasicItem',
        shop: 1,
        data: payload.data,
      },
      success: result => {
        resolve(result);
      },
      error: error => {
        reject(error);
      },
    });
  });
};
