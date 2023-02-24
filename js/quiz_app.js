const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector('.box-info');
const quit_btn = info_box.querySelector('.info-btn .quit');
const continue_btn = info_box.querySelector('.info-btn .continue');
const que_box = document.querySelector('.que_box');
const timeCount = que_box.querySelector('.que-timer .time-sec');
const timeLine = que_box.querySelector('header .time-line');
const timeText = que_box.querySelector('header .time-text');

const optionList = document.querySelector(".option-list");

// ========== start button clicked
start_btn.onclick = () => {
   info_box.classList.add('active') //show info box
}
// ========== quit button clicked
quit_btn.onclick = () => {
   info_box.classList.remove('active') //hide info box
}
// ========== continue button clicked
continue_btn.onclick = () => {
   info_box.classList.remove('active') //remove info box
   que_box.classList.add('active') //continue to quiz box
   showQuestions(0);
   queCounter(1);
   startTimer(15);
   startTimeLine(0);
}
// ============ getting question and options from array
let queCount = 0;
let queNumber = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_que = que_box.querySelector(".next-btn");

const resultBox = document.querySelector('.result-section');
const restart_btn = resultBox.querySelector('.buttons .restart');
const exit_btn = resultBox.querySelector('.buttons .quit');

// restart quiz app
// restart_btn.onclick = ()=> {
//    que_box.classList.add('active');
//    resultBox.classList.remove('active');
//    let queCount = 0;
//    let queNumber = 1;
//    let timeValue = 15;
//    let widthValue = 0;
//    let userScore = 0;
   
//    showQuestions(queCount);
//    queCounter(queNumber);
//    clearInterval(counter);
//    startTimer(timeValue);
//    clearInterval(counterLine);
//    startTimeLine(widthValue);
//    next_que.style.display = "none";
//    timeText.textContent = "Time Left";
// }
exit_btn.onclick = ()=> {
   window.location.reload();
}

next_que.onclick = () => {
   if(queCount < questions.length - 1){
      queCount++;
      queNumber++
      showQuestions(queCount);
      queCounter(queNumber);
      clearInterval(counter);
      startTimer(timeValue);
      clearInterval(counterLine);
      startTimeLine(widthValue);
      next_que.style.display = "none";
      timeText.textContent = "Time Left";
   }else{
      // console.log('questions completed');
      clearInterval(counter);
      clearInterval(counterLine);
      showResultBox();
   }
}

function showQuestions(index) {
   let queText = document.querySelector('.que-text');
   let queTag = "<span>" + questions[index].num + ". " + questions[index].question + "</span>";
   let options = '<div class="option">' + '<span>' + questions[index].options[0] + '</span></div>'
               + '<div class="option">' + '<span>' + questions[index].options[1] + '</span></div>'
               + '<div class="option">' + '<span>' + questions[index].options[2] + '</span></div>'
               + '<div class="option">' + '<span>' + questions[index].options[3] + '</span></div>';
   queText.innerHTML = queTag;
   optionList.innerHTML = options;

   const option = optionList.querySelectorAll('.option');
   for(let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick","optionSelected(this)");
   }
}
function queCounter(index){
   const totalQue = que_box.querySelector('.total-que');
   const queNum = '<span><p>' + index + '</p>Of<p>' + questions.length + '</p>Quesitons</span>';
   totalQue.innerHTML = queNum;
}

let tickIcon = '<i class="fa-solid fa-check"></i>';
let crossIcon = '<i class="fa-solid fa-xmark"></i>';

function optionSelected(answer){
   clearInterval(counter);
   clearInterval(counterLine);
   let userAns = answer.textContent;
   let correctAns = questions[queCount].answer;
   let allOptions = optionList.children.length;
   if( userAns == correctAns){
      userScore +=1;
      // console.log(userScore);

      answer.classList.add('correct');
      // console.log('answer correct');
      answer.insertAdjacentHTML("beforeend",tickIcon);
   }else{
      answer.classList.add('wrong');
      // console.log('answer wrong');
      answer.insertAdjacentHTML("beforeend",crossIcon);

      // checking answer
      for (let i = 0; i < allOptions; i++) {
         if(optionList.children[i].textContent == correctAns){
            optionList.children[i].setAttribute("class","option correct");
            optionList.children[i].insertAdjacentHTML("beforeend",tickIcon);
         }
      }
   }
   // once user selected disabled all option
   for(let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add('disabled');
   }
   next_que.style.display = "block";
}
// time counting
function startTimer(time){
   counter = setInterval(timer,1000);
   function timer() {
      timeCount.textContent = time;
      time--;
      if(time < 9) {
         let addZero = timeCount.textContent;
         timeCount.textContent = "0" + addZero;
      }
      if(time < 0) {
         clearInterval(counter);
         timeCount.textContent = "00";
         timeText.textContent = "Time Off";

         let correctAns = questions[queCount].answer;
         let allOptions = optionList.children.length;

         for (let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAns){
               optionList.children[i].setAttribute("class","option correct");
               optionList.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
         }
         for(let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add('disabled');
         }
         next_que.style.display = "block";
      }
   }
}
function startTimeLine(time){
   counterLine = setInterval(timer,29);
   function timer() {
      time += 1;
      timeLine.style.width = time + "px";
      if(time > 500){
         clearInterval(counterLine);
      }
   }
}
function showResultBox(){
   info_box.classList.remove('active') //remove info box
   que_box.classList.remove('active') //remove que box
   resultBox.classList.add('active');
   const scoreText = resultBox.querySelector('.score-text');

   if(userScore > 3) {
      let scoreTag = '<span>Congrulation!, you got only <p>'+  userScore +'</p>out of <p>' + questions.length + '</p></span>'
      scoreText.innerHTML = scoreTag;
   }else if(userScore > 1) {
      let scoreTag = '<span>nice!, you got only <p>'+  userScore +'</p>out of <p>' + questions.length + '</p></span>'
      scoreText.innerHTML = scoreTag;
   }else {
      let scoreTag = '<span>bad :(, you got only <p>'+  userScore +'</p>out of <p>' + questions.length + '</p></span>'
      scoreText.innerHTML = scoreTag;
   }
}

