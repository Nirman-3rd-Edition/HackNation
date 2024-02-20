'use strict';

// navbar variables
const navbarNav = document.querySelector('.navbar-nav');
const navbarToggleBtn = document.querySelector('.nav-toggle-btn');

//counter script
document.addEventListener("DOMContentLoaded", () => {
  function counter(id, start, end, duration){
      let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration /  range)),
      timer = setInterval(() => {
          current += increment;
          obj.textContent = current;
          if(current == end){
              clearInterval(timer);
          }
      }, step);
  }
  counter("count1", 0, 228, 2000);
  counter("count2", 0, 86, 1500);
  counter("count3", 0, 120, 2000);
  counter("count4", 0, 310, 1750);
});

// navbar toggle functionality
navbarToggleBtn.addEventListener('click', function () {

  navbarNav.classList.toggle('active');
  this.classList.toggle('active');

});