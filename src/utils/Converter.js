class Convert {
  listsToState = lists => {
    return lists
      .map(list => ({
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
      }))
      .reverse();
  };

  getDetail = payload => {
    return {
      order: payload.order,
      orderDetail: payload.orderDetail[0],
    };
  };

  getFormData = data => {
    const result = [];
    const recursive = (data, parentKey) => {
      const keys = Object.keys(data);
      keys.forEach(key => {
        if (typeof data[key] === 'object') {
          recursive(data[key], key);
          return;
        }

        if (parentKey) {
          result.push(`${parentKey}[${key}]=${data[key]}`);
          return;
        }
        result.push(`${key}=${data[key]}`);
      });
    };

    recursive(data);

    return result.join('&');
  };
}

export default new Convert();
