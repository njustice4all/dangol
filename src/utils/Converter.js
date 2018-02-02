class Convert {
  // TODO: unshift는 테스트용
  listsToState = lists => {
    const results = lists.map(list => ({
      no: list.order_no,
      date: list.order_date,
      type: list.order_state,
      address: `${list.od_b_addr1}, ${list.od_b_addr2}`,
      distance: '',
      takeTime: '',
      coords: {
        lat: null,
        lng: null,
      },
      request: list.od_b_message,
      tableNo: list.table_idx,
      data: { ...list },
    }));

    results.unshift(
      ...[
        {
          no: 1111111,
          date: '2018-02-03 18:20:39',
          type: 'delivery',
          address: '경기도 남양주시 화도읍',
          distance: '',
          takeTime: '',
          coords: {
            lat: null,
            lng: null,
          },
          request: '지금당장 주세요',
          tableNo: 9999,
        },
        {
          no: 1111111,
          date: '2018-02-03 18:20:39',
          type: 'package',
          address: '경기도 남양주시 화도읍',
          distance: '',
          takeTime: '',
          coords: {
            lat: null,
            lng: null,
          },
          request: '지금당장 주세요',
          tableNo: 9999,
        },
      ]
    );

    return results;
  };

  getDetail = payload => {
    return {
      // order: {
      //   no: payload.order.order_no,
      //   type: 'delivery',
      //   // type: payload.order.order_state,
      //   date: payload.order.order_date,
      //   paymentMethod: payload.order.app_btn,
      //   totalPay: payload.order.totalprice,
      //   status: 'accept',
      //   option: '',
      // },
      // customer: {
      //   phone: `${payload.order.od_b_hp1}-${payload.order.od_b_hp2}-${payload.order.od_b_hp3}`,
      //   address: payload.order.od_b_addr1 + payload.order.od_b_addr2,
      //   coords: {
      //     lat: null,
      //     lng: null,
      //   },
      //   request: payload.order.od_b_message,
      // },
      // products: [],
      order: payload.order,
      orderDetail: payload.orderDetail[0],
    };
  };
}

export default new Convert();
