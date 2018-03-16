export default pathname => {
  const html = document.getElementsByTagName('html');
  const body = document.getElementsByTagName('body');
  const root = document.getElementById('root');

  if (
    pathname.split('/').includes('terms') ||
    pathname === '/ceo/products/input' ||
    pathname.split('/').includes('order')
    // pathname === '/ceo/products'
  ) {
    html[0].style.height = '100%';
    body[0].style.height = '100%';
    root.style.height = '100%';
  } else {
    html[0].style.height = 'auto';
    body[0].style.height = 'auto';
    root.style.height = 'auto';
  }
};
