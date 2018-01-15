// @flow

type UI = {
  ui: string,
};

export const openPopup = (ui: UI) => ({
  type: 'ui/OPEN_POPUP',
  ui: ui,
});

export const closePopup = (ui: UI) => ({
  type: 'ui/CLOSE_POPUP',
  ui: ui,
});

export const toggleSideMenu = () => ({
  type: 'ui/TOGGLE_SIDEMENU',
});
