(function () {
  "use strict";

  var swiper = new Swiper('.swiper-container', {
	  slidesPerView: 1,
	  loop: true, //зацикливание при достижении конца
	  autoplay: 3000
  }); //инициализация компонента swiper    
})();