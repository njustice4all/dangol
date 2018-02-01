import $ from 'jquery';
import { DAUM_ADDRESS, DAUM_KEY, SITE_ID, ATY_URI } from '../constants';

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
export const apiGetShopInfo = (shopNo = 1) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_basic.php',
      data: {
        siteId: SITE_ID,
        keyWord: 'GetBasicInfo',
        shop: shopNo,
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
 * 상품정보 가져오기
 */
const data = {
  siteId: SITE_ID,
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
export const apiGetProducts = (shop, search, order, limit, page) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_product.php',
      data: data,
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
        siteId: SITE_ID,
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
