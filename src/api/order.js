import $ from 'jquery';

import { SITE_ID, ATY_URI, SESSION_ID, RSAPI } from '../constants';
import Converter from '../utils/Converter';

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

const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

/**
 * 주문목록 가져오기
 */
export const apiGetOrderLists = payload => {
  // return fetch(ATY_URI + '/aty_convert_order.php', {
  //   method: 'post',
  //   headers,
  //   body: Converter.getFormData(data),
  // });

  // FIXME:
  // data.siteId = payload.siteId;
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
      data: {
        siteId: payload.siteId,
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
 * 주문 상세
 */
export const apiGetOrderDetail = payload => {
  return new Promise(function(resolve, reject) {
    // FIXME:
    $.ajax({
      type: 'POST',
      url: RSAPI + '/rsapi',
      data: {
        // siteId: payload.siteId,
        // sessId: payload.session,
        // keyWord: 'admin.order.getOrderDetail',
        // order_idx: payload.no,
        siteId: SITE_ID,
        sessId: SESSION_ID,
        keyWord: 'admin.order.getOrderDetail',
        order_idx: payload.no,
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
 * 처리중 주문
 */
export const apiGetOrderProcess = payload => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
      data: {
        siteId: payload.siteId,
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
          orderState: 'deliveryPrepare',
        },
        order: {
          name: 'order_date',
          sort: '0',
        },
        limit: 20,
        page: 1,
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
 * 처리완료 목록
 */
export const apiGetOrderComplete = payload => {
  data.search.orderState = 'deliveryDone';
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
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
 * 주문대기상태를 처리중으로...
 */
export const apiSetOrderProcess = payload => {
  // FIXME:
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
      data: {
        siteId: payload.siteId,
        sessId: payload.sessionId,
        keyWord: 'SetOrderListDetail',
        idx: payload.results,
        data: {
          state: 'deliveryPrepare',
          sub_state: '',
        },
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
