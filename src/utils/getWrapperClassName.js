export default (pathname, status) => {
  if (!status) return 'content-wrapper';

  // switch (status) {
  //   case 'accept':
  //     return 'content-wrapper done';
  //   case 'reject':
  //     return 'content-wrapper done cancel';
  //   default:
  //     return 'content-wrapper';
  // }
  if (status.get('deliveryDone') > 0) {
    return 'content-wrapper done';
  } else if (status.get('cancel') > 0) {
    return 'content-wrapper done cancel';
  } else {
    return 'content-wrapper';
  }
};
