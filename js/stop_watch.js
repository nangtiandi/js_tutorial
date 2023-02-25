const time_element = document.querySelector('.watch .time');
const start_btn = document.querySelector('#start');
const stop_btn = document.querySelector('#stop');
const reset_btn = document.querySelector('#reset');

let seconds =0;
let interval = null;
// incressing time
function timer(){
   seconds++;
   let hr = Math.floor(seconds / 3600);
   let min = Math.floor((seconds - (hr * 3600)) / 60);
   let sec = seconds % 60;

   if(hr < 10) hr = "0" + hr;
   if(min < 10) min = "0" + min;
   if(sec < 10) sec = "0" + sec;

   time_element.innerText = `${hr}:${min}:${sec}`;
}
function start() {
   if(interval) {
      return;
   }
   interval = setInterval(timer, 1000);
}
function stop() {
   clearInterval(interval);
   interval = null;

}
function reset() {
   stop();
   seconds = 0;
   time_element.innerText = `00:00:00`;
}
start_btn.addEventListener('click',start);
stop_btn.addEventListener('click',stop);
reset_btn.addEventListener('click',reset);