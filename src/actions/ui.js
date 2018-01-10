// @flow

type PopupType = {
  popupType: string,
};

export const openPopup = (popupType: PopupType) => ({
  type: 'ui/OPEN_POPUP',
  popupType: popupType,
});

export const closePopup = (popupType: PopupType) => ({
  type: 'ui/CLOSE_POPUP',
  popupType: popupType,
});
