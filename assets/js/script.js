// Preloader

function PageLoad() {
  var width = 100,
    perfData = window.performance.timing,
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime / 500) % 50) * 70;

  // Percentage Increment Animation
  var PercentageID = $('#precent'),
    start = 1,
    end = 100,
    durataion = time;
  animateValue(PercentageID, start, end, durataion);

  function animateValue(id, start, end, duration) {
    var range = end - start,
      current = start,
      increment = end > start ? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);

    var timer = setInterval(function () {
      current += increment;
      $(obj).text(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}

$(document).ready(function () {
  // preloder
  PageLoad();

  // change-navigation-color
  $(window).scroll(function () {
    if ($(document).scrollTop() > 200) {
      $('.navbar').addClass('nav__color__change');
    } else {
      $('.navbar').removeClass('nav__color__change');
    }
  });

  // Smooth scrolling
  var scrollLink = $('.scroll');
  scrollLink.click(function (e) {
    let elem = $(this.hash)
    if (elem.length) {
      e.preventDefault();
      $('body,html').animate(
        {
          scrollTop: elem.offset().top,
        },
        1000
      );
    }
  });

  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  // service slider
  $('.service__slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  });

  // skill count
  $('.skill__progress').waypoint(
    function () {
      $('.progress-value span').each(function () {
        $(this)
          .prop('Counter', 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 3000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
      $('.skill__progress_item').addClass('js-animation');
      this.destroy();
    },
    { offset: '80%' }
  );

  // Testimonial slider
  $('.testimonial__slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  });

  // Modal Popup
  $('.popup-button').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  var portfolioGrid = $('.portfolio-item-grid').masonry({
    itemSelector: '.portfolio-item',
  });

  portfolioGrid.imagesLoaded().progress(function () {
    portfolioGrid.masonry('layout');
  });
});

function initializeMap() {
  var lat = $('#map').data('lat');
  var lon = $('#map').data('lon');
  var map = L.map('map').setView([lat, lon], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([lat, lon]).addTo(map);
}

if ($('#map').length > 0) {
  initializeMap();
}
