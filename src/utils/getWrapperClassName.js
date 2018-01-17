export default (pathname, status) => {
  // if (!status) return 'content-wrapper';

  switch (status) {
    case 'accept':
      return 'content-wrapper done';
    case 'reject':
      return 'content-wrapper done cancel';
    default:
      return 'content-wrapper';
  }
};
