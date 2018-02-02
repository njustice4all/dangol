class Convert {
  listsToState = lists => {
    return lists.map(list => ({
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
  };

  getDetail = payload => {
    return {
      order: payload.order,
      orderDetail: payload.orderDetail[0],
    };
  };
}

export default new Convert();
