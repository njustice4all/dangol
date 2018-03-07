// @flow

export const openPopup = (ui: string, payload?: any, order?: string) => ({
  type: 'ui/OPEN_POPUP',
  ui,
  payload,
  order,
});

export const closePopup = (ui: string) => ({
  type: 'ui/CLOSE_POPUP',
  ui: ui,
});

export const toggleSideMenu = () => ({
  type: 'ui/TOGGLE_SIDEMENU',
});
