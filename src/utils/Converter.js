import { fromJS } from 'immutable';
import apiGetCoords from '../api/coords';

// const getCoords = async address => {
//   const response = await apiGetCoords({ address });

//   try {
//     if (response.status > 400) {
//       return { lat: null, lng: null };
//     } else {
//       const result = await response.json();
//       return result.results[0].geometry.location;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

class Convert {
  listsToState = (lists, payDone) => {
    if (!lists) {
      return [];
    }

    if (payDone) {
      const newLists = lists.filter(list => list.product[0].state === 'payDone');
      return newLists.map(list => {
        if (list.od_b_addr1) {
          // TODO:
          // const coords = new Promise(resolve => resolve(getCoords(list.od_b_addr1)));
          // coords.then(value => console.log(value));
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
      });
    }

    return lists.map(list => ({
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
    }));
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
          ? [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq')), ...addImage]
          : [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq'))],
      };
    } else {
      result = {
        name: detail.getIn(['info', 'name']),
        price: detail.getIn(['sellinfo', 'price']),
        contents: detail.getIn(['info', 'contents']),
        options: detail.getIn(['stock', 'option_control', 'main']).toJS(),
        mainImage: addImage
          ? [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq')), ...addImage]
          : [...detail.getIn(['info', 'mainImage']).map(image => image.get('seq'))],
      };
    }

    return result;
  };

  toSetShopData = (data, images) => {
    if (typeof images === 'object') {
      return { ...data, mainImage: [...data.mainImage, ...images] };
    }

    return { ...data, mainImage: [...data.mainImage, images] };
  };

  setPossible = (string, protoType) => {
    const split = string.split('');
    const result = protoType.toJS().map((value, index) => {
      if (split[index] === '1') {
        return { ...value, isChecked: true };
      }

      return { ...value, isChecked: false };
    });

    return fromJS(result);
  };

  calWidth = data => {
    if (data) {
      if (data.size < 5) {
        return 500;
      } else if (data.size >= 5 && data.size < 11) {
        return data.size * 100;
      }

      return 1000;
    }

    return 500;
  };
}

export default new Convert();
