//TIMER BY EKAM WOOOOOO YESSS SLAY
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = 0;
          // timer = duration; // uncomment this line to reset timer automatically after reaching 0
      }
  }, 1000);
}

window.onload = function () {
  var time = 60 / 2, // your time in seconds here
      display = document.querySelector('#safeTimerDisplay');
  startTimer(time, display);
};

class Timer {

  constructor() {
      this.time = 0;
      this.element = null;
      this.control = true;
      this.callback = null;
      this.timeLimit = 10;
  }

  set(time, id, callback = null) {
      this.time = time;
      this.element = document.getElementById(id);
      this.callback = callback;
  }

  setTimeLimit(time) {
      this.timeLimit = time;
  }

  start(type = 'COUNT_DOWN') {
      this.control = true;

      setTimeout(() => {
          if(type == 'COUNT_DOWN')
              this.countDown();
          else if(type == 'COUNT_UP') 
              this.countUp();
      }, 1000); }

      format() {
          let hours = parseInt(this.time / 3600);
          let timeLeft = this.time - hours * 3600;
          let minutes = parseInt(timeLeft / 60);
          timeLeft = timeLeft - minutes * 60;
          let seconds = timeLeft;
          
          hours = hours.toString();
          minutes = minutes.toString();  seconds = seconds.toString();
  
          if (hours.length == 1)
              hours = '0' + hours;
          if (minutes.length == 1)
              minutes = '0' + minutes;
          if (seconds.length == 1)
              seconds = '0' + seconds;
          
          return hours + ':' + minutes + ':' + seconds;
      }
  
      countDown() {
          if(!this.control)
              return;
          let timerblock = this.element;
          timerblock.innerHTML = this.format();
          timerblock.style.display = 'block';
  
          if (this.time <= 59) {
              timerblock.style.color = 'red';
          }if (this.time <= 0) {
              timerblock.innerHTML = 'Time end!';
              this.callback();
              this.stop();
          }
          else {
              setTimeout(() => {
                  this.countDown();
              }, 1000);
              this.time--;
          }
      }
  
      countUp() {
          if(!this.control)
              return;
          let timerblock = this.element;
          timerblock.innerHTML = this.format(); timerblock.style.display = 'block';
  
          if(this.time >= this.timeLimit) {
              timerblock.innerHTML = 'Timer Limit Exceed!';
              this.callback();
              this.stop();
          }
          else {
              setTimeout(() => {
                  this.countUp();
              }, 1000);
              this.time++;
          }
      }stop() {
          this.control = false;
      }
  }
  