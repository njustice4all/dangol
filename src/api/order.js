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
    sort: '1',
  },
  limit: 10,
  page: 1,
};

/**
 * 주문 더 불러오기
 */
export const apiFetchOrderMore = payload => {
  const newData = {
    ...DATA,
    siteId: payload.siteId,
    page: payload.page,
    search: { ...DATA.search, orderState: payload.type },
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
 * 주문목록 가져오기
 */
export const apiGetOrderLists = payload => {
  // return fetch(ATY_URI + '/aty_convert_order.php', {
  //   method: 'post',
  //   headers,
  //   body: Converter.getFormData(data),
  // });
  const newData = {
    ...DATA,
    siteId: payload.siteId,
    search: { ...DATA.search, orderState: 'payDone' },
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
    search: { ...DATA.search, orderState: ['deliveryPrepare', 'cancelDoing'] },
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
    search: { ...DATA.search, orderState: ['deliveryDone', 'cancelDonePay', 'cancelDoneFree'] },
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
        option: payload.option,
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

/**
 * 주문을 거절함
 */
export const apiSetOrderCancel = payload => {
  const protoType = { sub_state: '', state: 'cancelDonePay' };
  let data = null;
  if (payload.paid) {
    data = { ...protoType, state: 'cancelDoing' };
  } else {
    data = { ...protoType };
  }

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: ATY_URI + '/aty_convert_order.php',
      data: {
        siteId: payload.siteId,
        sessId: payload.sessionId,
        keyWord: 'SetOrderListDetail',
        idx: payload.results,
        data,
        orderNo: payload.orderNo,
        option: payload.option,
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
 * 배달주문 중단상태
 */
export const apiGetPauseOrder = payload => {
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
 * 배달주문 중단
 */
export const apiSetPauseOrder = payload => {
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
