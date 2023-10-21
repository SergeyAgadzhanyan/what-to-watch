function hideHeader() {
  const header = document.querySelector('.header');
  if (header) header.classList.add('header__hide');
}

function showHeader() {
  const header = document.querySelector('.header');
  if (header) header.classList.remove('header__hide');
}

function hideFooter() {
  const footer = document.querySelector('.footer');
  if (footer) footer.classList.add('footer__hide');
}

function showFooter() {
  const footer = document.querySelector('.footer');
  if (footer) footer.classList.remove('footer__hide');
}

export {hideHeader, hideFooter, showHeader, showFooter};
