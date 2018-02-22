import $ from 'jquery';

import { ATY_URI, RSAPI } from '../constants';
import Converter from '../utils/Converter';

const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

const date = new Date();

// FIXME: start 어제껄로하고 앱이 계속 켜져있으면?
const DATA = {
  keyWord: 'GetOrderList',
  shop: 1,
  search: {
    searchType: '0',
    keyword: '',
    periodType: '0',
    period_msg: '',
    // 어제날짜
    period_start: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate() - 1,
    },
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
export const apiGetOrderLists = payload => {
  // return fetch(ATY_URI + '/aty_convert_order.php', {
  //   method: 'post',
  //   headers,
  //   body: Converter.getFormData(data),
  // });
  const newData = { ...DATA, siteId: payload.siteId };

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
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
 * 주문 상세
 */
export const apiGetOrderDetail = payload => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: 'POST',
      url: RSAPI + '/rsapi',
      data: {
        siteId: payload.siteId,
        sessId: payload.session,
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
  const newData = {
    ...DATA,
    siteId: payload.siteId,
    search: { ...DATA.search, orderState: 'deliveryPrepare' },
  };

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
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
 * 처리완료 목록
 */
export const apiGetOrderComplete = payload => {
  const newData = {
    ...DATA,
    siteId: payload.siteId,
    search: { ...DATA.search, orderState: 'deliveryDone' },
  };

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
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
 * 주문대기상태를 처리중으로...
 */
export const apiSetOrderProcess = payload => {
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
        orderNo: payload.orderNo,
        title: '주문이 접수되었습니다.',
        body: '잠시만기다리세요.',
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
 * 처리중상태를 완료로...
 */
export const apiSetOrderComplete = payload => {
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
          state: 'deliveryDone',
          sub_state: '',
        },
        orderNo: payload.orderNo,
        title: '조리완료',
        body: '주문하신 음식이 나왔습니다.',
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

// FIXME:
/**
 * 배달주문을 처리중 상태로...
 */
export const apiSetDeliveryProcess = payload => {
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
        orderNo: payload.orderNo,
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

// FIXME:
/**
 * 주문을 거절함
 */
export const apiSetOrderCancel = payload => {
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
        orderNo: payload.orderNo,
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
