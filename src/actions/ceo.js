import {
  apiGetShopInfo,
  apiGetShopDetail,
  apiGetProducts,
  apiDelProduct,
  apiSetShop,
  apiAddress,
  apiLoadMoreAddress,
  apiGetProductDetail,
  apiSetProduct,
  apiGetManagers,
  apiSetManager,
  apiDeleteManager,
  apiGetTerms,
  apiSetTerms,
  apiStatistics,
} from '../api/ceo';
import apiUploadImage from '../api/image';
import Converter from '../utils/Converter';

/**
 * 상점정보 가져옴
 */
const getShop = () => ({ type: 'ceo/GET_SHOP' });
const getShopSuccess = shop => ({ type: 'ceo/GET_SHOP_SUCCESS', shop });
const getShopError = error => ({ type: 'ceo/GET_SHOP_ERROR', error });

export const initGetShopInfo = payload => async dispatch => {
  dispatch(getShop());

  if (!payload.siteId) {
    return;
  }

  const response = await apiGetShopInfo(payload);

  try {
    if (!response) {
      dispatch(getShopError({ error: true }));
    } else {
      dispatch(getShopSuccess(response));
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 상점정보 수정
 */
const setShop = () => ({ type: 'ceo/SET_SHOP' });
const setShopSuccess = payload => ({ type: 'ceo/SET_SHOP_SUCCESS', payload });
const setShopFailure = error => ({ type: 'ceo/SET_SHOP_FAILURE', error });

export const initSetShop = payload => async dispatch => {
  dispatch(setShop());

  try {
    const response = await apiSetShop(payload);

    if (!response) {
      dispatch(setShopFailure({ error: true }));
    } else {
      dispatch(setShopSuccess(response));
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

  const response = await apiGetProducts(payload);

  try {
    if (!response) {
      dispatch(getProductsError({ error: true }));
    } else {
      dispatch(getProductsSuccess(response));
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

export const initSetProducts = payload => async dispatch => {
  dispatch(setProducts());

  try {
    const response = await apiSetProduct(payload);

    if (!response) {
      dispatch(setProductsFailure({ error: true }));
    } else {
      dispatch(setProductsSuccess(response));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 상품 삭제
 */
export const initDelProduct = payload => async dispatch => {
  const response = await apiDelProduct(payload);

  if (!response.success) {
    dispatch({ type: 'ceo/DEL_PRODUCT_ERROR' });
  } else {
    dispatch({ type: 'ceo/DEL_PRODUCT_SUCCESS' });
    dispatch(initGetProducts(payload));
  }
};

/**
 * 상품 디테일정보
 */
const getProductDetail = () => ({ type: 'ceo/GET_PRODUCT_DETAIL' });
const getProductDetailSuccess = payload => ({ type: 'ceo/GET_PRODUCT_DETAIL_SUCCESS', payload });
const getProductDetailError = error => ({ type: 'ceo/GET_PRODUCT_DETAIL_ERROR', error });

export const initGetProductDetail = payload => async dispatch => {
  dispatch(getProductDetail());

  const response = await apiGetProductDetail(payload);

  try {
    if (!response) {
      dispatch(getProductDetailError({ error: true }));
    } else {
      dispatch(getProductDetailSuccess(response));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 이미지 업로드
 */
export const initUploadImage = payload => async dispatch => {
  dispatch({ type: 'ceo/UPLOAD_IMAGE' });

  let response = null;

  if (payload.formData.length > 1) {
    const promiseData = payload.formData.map(form => {
      return new Promise(resolve => {
        resolve(apiUploadImage(form));
      });
    });

    await Promise.all(promiseData).then(values => {
      response = { msg: 'imgUpOK', success_seq: values.map(value => value.success_seq) };
    });
  } else {
    response = await apiUploadImage(payload.formData[0]);
  }

  try {
    if (response.msg !== 'imgUpOK') {
      console.log('img upload error');
    } else {
      if (payload.shop) {
        const result = Converter.toSetShopData(payload.result, response.success_seq);
        dispatch(initSetShop({ result, siteId: payload.siteId }));
        return;
      }

      const result = Converter.toSetProductData(
        payload.productDetail,
        typeof response.success_seq === 'object' ? response.success_seq : [response.success_seq],
        payload.idx
      );
      dispatch(initSetProducts({ result, siteId: payload.siteId }));
      payload.goBack();
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

  try {
    if (response.status >= 400) {
      dispatch(reqAddressFailure({ error: true }));
    } else {
      const result = await response.json();
      dispatch(reqAddressSuccess(result.results));
    }
  } catch (error) {
    console.error(error);
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

/**
 * 부관리자 정보 조회
 */
const getManagers = () => ({ type: 'ceo/GET_MANAGERS' });
const getManagersSuccess = payload => ({ type: 'ceo/GET_MANAGERS_SUCCESS', payload });
const getManagersError = error => ({ type: 'ceo/GET_MANAGERS_ERROR', error });

export const initGetManagers = payload => async dispatch => {
  dispatch(getManagers());

  const response = await apiGetManagers(payload);
  const result = JSON.parse(response);

  try {
    if (!result.success) {
      dispatch(getManagersError(result));
      return { success: false };
    } else {
      const result = JSON.parse(response);

      const users = result.users.filter(user => {
        if (payload.ceo) {
          return user.role === 'ceo';
        } else if (payload.getAll) {
          return user;
        }
        return user.role !== 'ceo';
      });

      dispatch(getManagersSuccess({ users }));
      return { success: true };
    }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

/**
 * 부관리자 수정/추가
 */
const setManager = () => ({ type: 'ceo/SET_MANAGER' });
const setManagerSuccess = payload => ({ type: 'ceo/SET_MANAGER_SUCCESS', payload });
const setManagerError = error => ({ type: 'ceo/SET_MANAGER_ERROR', error });

export const initSetManager = payload => async dispatch => {
  dispatch(setManager());

  const response = await apiSetManager(payload);
  const result = JSON.parse(response);

  try {
    if (!result.success) {
      dispatch(setManagerError({ error: true }));
    } else {
      dispatch(setManagerSuccess(response));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 부관리자 삭제
 */
const deleteManager = () => ({ type: 'ceo/DELETE_MANAGER' });
const deleteManagerSuccess = payload => ({ type: 'ceo/DELETE_MANAGER_SUCCESS', payload });
const deleteManagerError = error => ({ type: 'ceo/DELETE_MANAGER_ERROR', error });

export const initDeleteManager = payload => async dispatch => {
  dispatch(deleteManager());

  const response = await apiDeleteManager(payload);
  const result = JSON.parse(response);

  try {
    if (!result.success) {
      dispatch(deleteManagerError({ error: true }));
    } else {
      dispatch(initGetManagers({ id: payload.id, secret: payload.secret }));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 약관 조회
 */
const getTerms = () => ({ type: 'ceo/GET_TERMS' });
const getTermsSuccess = payload => ({ type: 'ceo/GET_TERMS_SUCCESS', payload });
const getTermsError = error => ({ type: 'ceo/GET_TERMS_ERROR', error });

export const initGetTerms = payload => async dispatch => {
  dispatch(getTerms());

  const response = await apiGetTerms(payload);

  try {
    if (!response) {
      dispatch(getTermsError({ error: true }));
    } else {
      dispatch(getTermsSuccess(response.list));
      return { list: response.list };
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 약관 수정
 */
const setTerms = () => ({ type: 'ceo/SET_TERMS' });
const setTermsSuccess = payload => ({ type: 'ceo/SET_TERMS_SUCCESS', payload });
const setTermsError = error => ({ type: 'ceo/SET_TERMS_ERROR', error });

export const initSetTerms = payload => async dispatch => {
  dispatch(setTerms());

  const response = await apiSetTerms(payload);

  try {
    if (!response) {
      dispatch(setTermsError({ error: true }));
    } else {
      dispatch(setTermsSuccess({ success: true }));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 통계
 */
const getStatistics = () => ({ type: 'ceo/GET_STATISTICS' });
const getStatisticsSuccess = payload => ({ type: 'ceo/GET_STATISTICS_SUCCESS', payload });
const getStatisticsError = error => ({ type: 'ceo/GET_STATISTICS_ERROR', error });

export const fetchStatistics = payload => async dispatch => {
  dispatch(getStatistics());

  const response = await apiStatistics(payload);

  try {
    if (!response) {
      dispatch(getStatisticsError({ error: true }));
    } else {
      dispatch(getStatisticsSuccess(response));
    }
  } catch (error) {
    console.error(error);
  }
};
