const intersectionObserver = new IntersectionObserver(function (entries) {
  if (entries[0].intersectionRatio <= 0) return;
  searchImage();
  console.log('entries');
});

intersectionObserver.observe(document.querySelector('#anchor'));
