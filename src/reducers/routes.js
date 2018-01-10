const initLocation = { pathname: window.location.pathname, search: '', hash: '' };

const routes = (state = initLocation, action) => {
  return action.type === 'CHANGE_ROUTES' ? action.location : state;
};

export default routes;
