var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 5,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },


    breakpoints: {
      500: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      1000: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1360: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      }
    }
});