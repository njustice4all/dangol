import $ from 'jquery';

import { SITE_ID, ATY_URI } from '../constants';

const data = {
  siteId: SITE_ID,
  keyWord: 'GetOrderList',
  shop: 1,
  search: {
    searchType: '0',
    keyword: '',
    periodType: '0',
    period_msg: '',
    period_start: '',
    period_end: '',
    memberBuy: '0',
    payMothodCard: '1',
    payMothodPhone: '1',
    payMothodBank: '1',
    payMothodMoney: '1',
    totalPriceStart: '',
    totalPriceEnd: '',
    delivery: '0',
    category: '',
    brand: '',
  },
  order: {
    name: 'order_date',
    sort: '0',
  },
  limit: 20,
  page: 1,
};

/**
 * 주문목록 가져오기
 */
export const apiGetOrderLists = (shop, search, order, limit, page) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      xhrFields: {
        withCredentials: false,
      },
      url: ATY_URI + '/aty_convert_basic.php',
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
