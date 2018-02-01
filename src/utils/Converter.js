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

  getDetail = (lists, no) => {
    let selected;
    lists.forEach(list => {
      if (list.getIn(['data', 'idx']) === no) {
        selected = list;
      }
    });

    // console.log(selected.toJS());

    // return {
    //   order: {
    //     no: selected.get('no'),
    //     type: selected.get('type'),
    //     date: selected.get('date'),
    //     paymentMethod:
    //   },
    // }
  };
}

export default new Convert();
