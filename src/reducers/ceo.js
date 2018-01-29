import { fromJS, List } from 'immutable';

const initialState = fromJS({
  address: {
    lists: [],
    page: {},
    query: '',
  },
  shop: {
    seq: '',
    shop: {
      images: [],
      category: '',
      name: '',
      description: '',
      address: {
        zipCode: '',
        firstAddress: '',
        detailAddress: '',
      },
      contact: '',
      openingHours: '',
      closedDays: '',
      possible: [],
    },
  },
  products: [],
  status: {
    isFetching: false,
    error: false,
    msg: '',
  },
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
      .setIn(['address', 'lists'], List(action.payload.juso))
      .setIn(['address', 'page'], action.payload.common)
      .setIn(['status', 'isFetching'], false)
  );
};

const loadMore = (state, action) => {
  return state.withMutations(mutator =>
    mutator
      .updateIn(['address', 'lists'], lists => lists.push(...action.payload.juso))
      .setIn(['address', 'page'], action.payload.common)
      .setIn(['status', 'isFetching'], false)
  );
};

export const ceo = (state = initialState, action) => {
  switch (action.type) {
    case 'ceo/SET_SHOP':
    case 'ceo/SET_PRODUCTS':
    case 'ceo/REQ_ADDRESS':
    case 'ceo/REQ_LOAD_MORE':
      return state.setIn(['status', 'isFetching'], true);
    case 'ceo/SET_SHOP_SUCCESS':
      return state;
    case 'ceo/SET_PRODUCTS_SUCCESS':
    case 'ceo/REQ_ADDRESS_SUCCESS':
      return addressLists(state, action);
    case 'ceo/REQ_LOAD_MORE_SUCCESS':
      return loadMore(state, action);
    case 'ceo/SET_SHOP_FAILURE':
    case 'ceo/REQ_ADDRESS_FAILURE':
    case 'ceo/SET_PRODUCTS_FAILURE':
    case 'ceo/REQ_LOAD_MORE_FAILURE':
      return withError(state, action);
    case 'ceo/RESET_ADDRESS':
      return state;
    default:
      return state;
  }
};
