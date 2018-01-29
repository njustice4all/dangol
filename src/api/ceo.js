const API = 'http://van.aty.kr/vanapi';
const URL = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';
const KEY = 'U01TX0FVVEgyMDE3MTEwNzE3MTgwMjEwNzQ2MzY=';

export const apiAddress = query => {
  return fetch(
    `${URL}?currentPage=1&countPerPage=10&keyword=${query}&confmKey=${KEY}&resultType=json`
  );
};

export const apiLoadMoreAddress = (query, page = 1) => {
  return fetch(
    `${URL}?currentPage=${page}&countPerPage=10&keyword=${query}&confmKey=${KEY}&resultType=json`
  );
};

export const apiSetShop = shop => {
  return fetch(`${API}/setShop`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      shop: shop,
    }),
  });
};

export const apiSetProducts = products => {
  return fetch(`${API}/setProduct`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ ...products }),
  });
};
