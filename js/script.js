window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //tabs

  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a = 1) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent();

  function showTabContent(el) {
    hideTabContent(0);
    tabContent[el].classList.add('show');
    tabContent[el].classList.remove('hide');
  }

  info.addEventListener('click', function (event) {
    for (let i = 0; i < tab.length; i++) {
      if (event.target == tab[i]) {
        showTabContent(i);
        break;
      }
    }
  });

  //timer
  let deadline = '2030-04-30T21:22:05';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / (1000 * 60 * 60));
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id);
    let hours = timer.getElementsByClassName('hours');
    let minutes = timer.getElementsByClassName('minutes');
    let seconds = timer.getElementsByClassName('seconds');
    let timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hours[0].textContent = t.hours;
      if (hours[0].textContent.length < 2) {
        hours[0].textContent = '0' + t.hours;
      }
      minutes[0].textContent = t.minutes;
      if (minutes[0].textContent.length < 2) {
        minutes[0].textContent = '0' + t.minutes;
      }
      seconds[0].textContent = t.seconds;
      if (seconds[0].textContent.length < 2) {
        seconds[0].textContent = '0' + t.seconds;
      }
      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours[0].textContent = '00';
        minutes[0].textContent = '00';
        seconds[0].textContent = '00';
      }
    }
  }

  setClock('timer', deadline);

  //modal

  let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

  more.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  //form JSON

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо',
    failure: 'Ошибка'
  };

  let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.after(statusMessage);

    let request = new XMLHttpRequest();

    request.open('POST', 'https://httpbin.org/post');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function (value, key) {
      obj[key] = value;
    });

    let json = JSON.stringify(obj);
    request.send(json);
    request.addEventListener('readystatechange', function (event) {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status === 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  });

  //form FormData + Promise
  function formMain() {
    let form = document.getElementById('form'),
      input = form.querySelectorAll('input');
    let message = {
      loading: 'Загрузка...',
      success: 'Спасибо',
      failure: 'Ошибка'
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      form.after(statusMessage);
      let formData = new FormData(form);


      function postData(data) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();
          request.open('POST', 'https://httpbin.org/post');
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status === 200) {
              resolve();
            } else {
              reject();
            }
          };
          request.send(data);
        });
      }

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }

      postData(formData)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.failure)
        .finally(clearInput);
    });
  }
  formMain();

  //slider

  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlides(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function () {
    plusSlides(-1);
  });

  next.addEventListener('click', function () {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', function (event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
        currentSlides(i);
      }
    }
  });
});