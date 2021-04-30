window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //tabs

  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

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
      seconds = Math.floor((t/1000) % 60),
      minutes = Math.floor((t/1000/60) % 60),
      hours = Math.floor(t/(1000*60*60));
      return {
        'total':t,
        'hours':hours,
        'minutes':minutes,
        'seconds':seconds
      };
  }

  function setClock (id, endtime) {
    let timer = document.getElementById(id);
    let hours = timer.getElementsByClassName('hours');
    let minutes = timer.getElementsByClassName('minutes');
    let seconds = timer.getElementsByClassName('seconds');
    let timeInterval = setInterval(updateClock, 1000);

    function updateClock () {
      let t = getTimeRemaining(endtime);
      hours[0].textContent = t.hours;
      if (hours[0].textContent.length < 2) {
        hours[0].textContent ='0'+ t.hours;
      }
      minutes[0].textContent = t.minutes;
      if (minutes[0].textContent.length < 2) {
        minutes[0].textContent ='0'+ t.minutes;
      }
      seconds[0].textContent = t.seconds;
      if (seconds[0].textContent.length < 2) {
        seconds[0].textContent ='0'+ t.seconds;
      }
      if(t.total<=0) {
        clearInterval(timeInterval);
        hours[0].textContent = '00';
        minutes[0].textContent = '00';
        seconds[0].textContent = '00';
      }
    }
  }

  setClock('timer', deadline);
});