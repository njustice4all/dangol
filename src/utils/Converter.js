import apiGetCoords from '../api/coords';

// FIXME:
const getCoords = async address => {
  const response = await apiGetCoords({ address });

  try {
    if (response.status > 400) {
      return { lat: null, lng: null };
    } else {
      const result = await response.json();
      return result.results[0].geometry.location;
    }
  } catch (error) {
    console.error(error);
  }
};

class Convert {
  listsToState = (lists, payDone) => {
    if (!lists) {
      return [];
    }

    if (payDone) {
      const newLists = lists.filter(list => list.product[0].state === 'payDone');
      return newLists
        .map(list => {
          if (list.od_b_addr1) {
            //
          }

          return {
            no: list.order_no,
            date: list.order_date,
            type: list.sub_state,
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
          };
        })
        .reverse();
    }

    return lists
      .map(list => ({
        no: list.order_no,
        date: list.order_date,
        type: list.sub_state,
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
    try {
      if (payload.fail) {
        return {
          order: {},
          orderDetail: {},
        };
      } else {
        return {
          order: payload.order,
          orderDetail: payload.orderDetail[0],
        };
      }
    } catch (error) {
      console.error(error);
    }
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

  numberWithCommas = number => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return '';
  };

  toSetProductData = (detail, addImage, idx) => {
    let result = null;
    if (idx) {
      result = {
        modifySEQ: idx,
        name: detail.getIn(['info', 'name']),
        price: detail.getIn(['sellinfo', 'price']),
        contents: detail.getIn(['info', 'contents']),
        options: detail.getIn(['stock', 'option_control', 'main']).toJS(),
        mainImage: addImage
          ? [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq')), addImage]
          : [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq'))],
      };
    } else {
      result = {
        name: detail.getIn(['info', 'name']),
        price: detail.getIn(['sellinfo', 'price']),
        contents: detail.getIn(['info', 'contents']),
        options: detail.getIn(['stock', 'option_control', 'main']).toJS(),
        mainImage: addImage
          ? [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq')), addImage]
          : [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq'))],
      };
    }

    return result;
  };
}

export default new Convert();
