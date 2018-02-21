import { fromJS, List, Map, Record } from 'immutable';

const StateRecord = Record({
  shop: Map(),
  products: List(),
  productDetail: Map(),
  status: Map({
    isFetching: false,
    error: false,
    msg: '',
  }),
  address: Map({
    addressLists: List(),
    page: Map(),
    query: '',
  }),
  setProducts: false,
});

const withError = (state, action) => {
  const error = Map({
    isFetching: false,
    error: true,
    msg: action.error,
  });

  return state.set('status', error);
};

const addressLists = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      .setIn(['address', 'addressLists'], List(action.payload.juso))
      .setIn(['address', 'page'], action.payload.common)
      .setIn(['status', 'isFetching'], false)
  );
};

const loadMore = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      .updateIn(['address', 'addressLists'], lists => lists.push(...action.payload.juso))
      .setIn(['address', 'page'], action.payload.common)
      .setIn(['status', 'isFetching'], false)
  );
};

const getShopSuccess = (state, action) => {
  return state.withMutations(mutator =>
    mutator.set('shop', fromJS(action.shop)).setIn(['status', 'isFetching'], false)
  );
};

const getProductsSuccess = (state, action) => {
  let lists = [];
  if (action.products.list) {
    lists = action.products.list;
  }

  return state.withMutations(mutator =>
    mutator.set('products', fromJS(lists)).setIn(['status', 'isFetching'], false)
  );
};

const getProductDetail = (state, action) => {
  return state.withMutations(mutator =>
    mutator.set('productDetail', fromJS(action.payload)).setIn(['status', 'isFetching'], false)
  );
};

const setProductsSuccess = (state, action) => {
  return state.withMutations(mutator =>
    mutator.setIn(['status', 'isFetching'], false).set('setProducts', action.result.success)
  );
};

export const ceo = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'ceo/GET_SHOP':
    case 'ceo/GET_PRODUCTS':
    case 'ceo/SET_SHOP':
    case 'ceo/SET_PRODUCTS':
    case 'ceo/GET_PRODUCT_DETAIL':
    case 'ceo/REQ_ADDRESS':
    case 'ceo/REQ_LOAD_MORE':
      return state.setIn(['status', 'isFetching'], true);
    case 'ceo/SET_SHOP_SUCCESS':
      return state;
    case 'ceo/SET_PRODUCTS_SUCCESS':
      return setProductsSuccess(state, action);
    case 'ceo/GET_SHOP_SUCCESS':
      return getShopSuccess(state, action);
    case 'ceo/GET_PRODUCTS_SUCCESS':
      return getProductsSuccess(state, action);
    case 'ceo/REQ_ADDRESS_SUCCESS':
      return addressLists(state, action);
    case 'ceo/GET_PRODUCT_DETAIL_SUCCESS':
      return getProductDetail(state, action);
    case 'ceo/REQ_LOAD_MORE_SUCCESS':
      return loadMore(state, action);
    case 'ceo/UPLOAD_IMAGE_SUCCESS':
      return state.set('uploadImageSeq', action.payload);
    case 'ceo/CLOSE_MODAL':
      return state.set('setProducts', false);
    case 'ceo/SET_SHOP_FAILURE':
    case 'ceo/REQ_ADDRESS_FAILURE':
    case 'ceo/SET_PRODUCTS_FAILURE':
    case 'ceo/REQ_LOAD_MORE_FAILURE':
    case 'ceo/GET_SHOP_ERROR':
    case 'ceo/GET_PRODUCT_DETAIL_ERROR':
    case 'ceo/GET_PRODUCTS_ERROR':
      return withError(state, action);
    case 'ceo/DEL_PRODUCT_SUCCESS':
      return state;
    case 'ceo/RESET_ADDRESS':
      return new StateRecord();
    default:
      return state;
  }
};
