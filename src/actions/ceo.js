import { apiSetShop, apiSetProducts, apiAddress, apiLoadMoreAddress } from '../api/ceo';

/**
 * 상점정보 가져옴
 */
const getShop = () => ({ type: 'ceo/GET_SHOP' });
const getShopSuccess = shop => ({ type: 'ceo/GET_SHOP_SUCCESS', shop });
const getShopError = error => ({ type: 'ceo/GET_SHOP_ERROR', error });

export const initGetShop = payload => async dispatch => {
  dispatch(getShop());

  // TODO:
  try {
    if (true) {
      dispatch(getShopSuccess({ shop: {} }));
    } else {
      dispatch(getShopError({ error: true }));
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 상점정보 수정
 */
const setShop = () => ({ type: 'ceo/SET_SHOP' });
const setShopSuccess = (result, shop) => ({ type: 'ceo/SET_SHOP_SUCCESS', result, shop });
const setShopFailure = error => ({ type: 'ceo/SET_SHOP_FAILURE', error });

export const initSetShop = shop => async dispatch => {
  dispatch(setShop());

  // TODO:
  try {
    const response = await apiSetShop(shop);
    const result = await response.json();

    if (!result.msg) {
      dispatch(setShopFailure({ error: true }));
    } else {
      dispatch(setShopSuccess(result, shop));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 상품정보 가져옴
 */
const getProducts = () => ({ type: 'ceo/GET_PRODUCTS' });
const getProductsSuccess = products => ({ type: 'ceo/GET_PRODUCTS_SUCCESS', products });
const getProductsError = error => ({ type: 'ceo/GET_PRODUCTS_ERROR', error });

export const initGetProducts = payload => async dispatch => {
  dispatch(getProducts());

  // TODO:
  try {
    if (tru) {
      dispatch(getProductsSuccess({ products: [] }));
    } else {
      dispatch(getProductsError({ error: true }));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 상품정보 수정
 */
const setProducts = () => ({ type: 'ceo/SET_PRODUCTS' });
const setProductsSuccess = result => ({ type: 'ceo/SET_PRODUCTS_SUCCESS', result });
const setProductsFailure = error => ({ type: 'ceo/SET_PRODUCTS_FAILURE', error });

export const initSetProducts = products => async dispatch => {
  dispatch(setProducts());

  // TODO:
  try {
    const response = await apiSetProducts(products);
    const result = await response.json();

    if (!result.msg) {
      dispatch(setProductsFailure({ error: true }));
    } else {
      dispatch(setProductsSuccess(result));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 상점정보 수정할때 상점주소검색, 다음 api 사용
 */
const reqAddress = query => ({ type: 'ceo/REQ_ADDRESS', query });
const reqAddressSuccess = payload => ({ type: 'ceo/REQ_ADDRESS_SUCCESS', payload });
const reqAddressFailure = error => ({ type: 'ceo/REQ_ADDRESS_FAILURE', error });

export const initRequestAddress = query => async dispatch => {
  dispatch(reqAddress(query));
  const response = await apiAddress(query);

  if (response.status >= 400) {
    dispatch(reqAddressFailure({ error: true }));
  } else {
    const result = await response.json();
    dispatch(reqAddressSuccess(result.results));
  }
};

/**
 * 주소검색 더보기, 다음 api 사용
 */
const reqLoadMore = () => ({ type: 'ceo/REQ_LOAD_MORE' });
const reqLoadMoreSuccess = payload => ({ type: 'ceo/REQ_LOAD_MORE_SUCCESS', payload });
const reqLoadMoreFailure = error => ({ type: 'ceo/REQ_LOAD_MORE_FAILURE', error });

export const initRequestLoadMore = (query, page) => async dispatch => {
  dispatch(reqLoadMore());
  const response = await apiLoadMoreAddress(query, page);

  if (response.status >= 400) {
    dispatch(reqLoadMoreFailure({ error: true }));
  } else {
    const result = await response.json();
    dispatch(reqLoadMoreSuccess(result.results));
  }
};

export const resetAddress = () => ({ type: 'ceo/RESET_ADDRESS' });
