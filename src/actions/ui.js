// @flow

export const openPopup = (ui: string, payload?: any) => ({
  type: 'ui/OPEN_POPUP',
  ui,
  payload,
});

export const closePopup = (ui: string) => ({
  type: 'ui/CLOSE_POPUP',
  ui: ui,
});

export const toggleSideMenu = () => ({
  type: 'ui/TOGGLE_SIDEMENU',
});
