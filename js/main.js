window.onscroll = function () {
  scrolledWindow();
};

function scrolledWindow() {
  const nav = document.querySelector('#main-menu');
  const top = document.body.scrollTop || document.documentElement.scrollTop;
  if (top !== 0) {
    nav.classList.add('scrolled-nav');
  } else {
    nav.classList.remove('scrolled-nav');
  }
}

const OneTestim = {
  init() {
    this.getData();
  },
  getData() {
    $.getJSON('http://46.101.237.11/json/users.json', this.testimData);
  },

  testimData(testims) {
    let testimToShow = '';
    for (let i = 0; i < 5; i += 1) {
      let toShowID = Math.floor(Math.random() * testims.length);
      let testim = testims.splice(toShowID, 1)[0];
      testimToShow += `<div class="active">
      <div class="img"><img src="${testim.picture}" alt="${testim.name}"></div>
      <div class="h4">${testim.name}</div>
      <p>${testim.testimText}</p>
      </div>`;
    }

    $('#testim-content').append(testimToShow);
    window.onload = function () {
      let testim = document.getElementById('testim'),
        testimDots = Array.prototype.slice.call(document.getElementById('testim-dots').children),
        testimContent = Array.prototype.slice.call(document.getElementById('testim-content').children),
        testimLeftArrow = document.getElementById('left-arrow'),
        testimRightArrow = document.getElementById('right-arrow'),
        testimSpeed = 4500,
        currentSlide = 0,
        currentActive = 0,
        testimTimer,
        touchStartPos,
        touchEndPos,
        touchPosDiff,
        ignoreTouch = 30;

      function playSlide(slide) {
        for (let k = 0; k < testimDots.length; k += 1) {
          testimContent[k].classList.remove('active');
          testimContent[k].classList.remove('inactive');
          testimDots[k].classList.remove('active');
        }

        if (slide < 0) {
          slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
          slide = currentSlide = 0;
        }

        if (currentActive !== currentSlide) {
          testimContent[currentActive].classList.add('inactive');
        }
        testimContent[slide].classList.add('active');
        testimDots[slide].classList.add('active');

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function () {
          playSlide(currentSlide += 1);
        }, testimSpeed);
      }

      testimLeftArrow.addEventListener('click', function () {
        playSlide(currentSlide -= 1);
      });

      testimRightArrow.addEventListener('click', function () {
        playSlide(currentSlide += 1);
      });

      for (let l = 0; l < testimDots.length; l += 1) {
        testimDots[l].addEventListener('click', function () {
          playSlide(currentSlide = testimDots.indexOf(this));
        });
      }

      playSlide(currentSlide);

      document.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
          case 37:
            testimLeftArrow.click();
            break;

          case 39:
            testimRightArrow.click();
            break;

          case 39:
            testimRightArrow.click();
            break;

          default:
            break;
        }
      });

      testim.addEventListener('touchstart', function (e) {
        touchStartPos = e.changedTouches[0].clientX;
      });

      testim.addEventListener('touchend', function (e) {
        touchEndPos = e.changedTouches[0].clientX;

        touchPosDiff = touchStartPos - touchEndPos;

        console.log(touchPosDiff);
        console.log(touchStartPos);
        console.log(touchEndPos);

        if (touchPosDiff > 0 + ignoreTouch) {
          testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
          testimRightArrow.click();
        } else {
          return;
        }
      });
    };
  },
};

OneTestim.init();
