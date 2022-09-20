const toTop = document.querySelector('.go-top-button');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 600) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});
