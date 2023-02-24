const intro = document.querySelector('.intro');
const match = document.querySelector('.match');
const play_btn = document.querySelector('.play');

play_btn.onclick = ()=>{
   intro.classList.add('unactive');
   match.classList.add('active');
}
function playMatch() {
   const options = document.querySelectorAll('.options button');
   const computerOptions = ['rock','paper','scissors'];
   const playerHand = document.querySelector('.player-hand');
   const computerHand = document.querySelector('.computer-hand');
   const hands = document.querySelectorAll('.hands img');

   // button click play 
   options.forEach( option => {
      option.addEventListener('click', function(){
         const computerNumber = Math.floor(Math.random() * 3);
         const computerChoice = computerOptions[computerNumber];
         // console.log(computerChoice);

         setTimeout( ()=> {
            computerHands(this.textContent, computerChoice);

            playerHand.src = `./assets/img/${this.textContent}.png`;
            computerHand.src = `./assets/img/${computerChoice}.png`;
         },2000);

         // animation hands
         playerHand.style.animation = 'shakePlayer 2s ease';
         computerHand.style.animation = 'shakeComputer 2s ease';
      });
   });
   hands.forEach( hand => {
      hand.addEventListener('animationend', function() {
         this.style.animation = "";
      })
   })
}
playMatch();
// ======= compare hands function
function computerHands(playerChoice, computerChoice){
   const winner = document.querySelector('.winner');
   if(playerChoice === computerChoice){
      winner.textContent = 'It is a tie.';
      return;
   }
   if(playerChoice === 'rock'){
      if(computerChoice === 'scissors'){
         winner.textContent = "Player Wins";
         player_score++;
         updateScore();
         return;
      }else{
         computer_score++;
         updateScore();
         winner.textContent = 'Computer wins';
         return;
      }
   }
   if(playerChoice === 'paper'){
      if(computerChoice === 'scissors'){
         winner.textContent = "Computer Wins";
         computer_score++;
         updateScore();
         return;
      }else{
         winner.textContent = 'Player wins';
         player_score++;
         updateScore();
         return;
      }
   }
   if(playerChoice === 'scissors'){
      if(computerChoice === 'rock'){
         winner.textContent = "Computer Wins";
         computer_score++;
         updateScore();
         return;
      }else{
         winner.textContent = 'Player wins';
         player_score++;
         updateScore();
         return;
      }
   }
}
// score function
let player_score = 0;
let computer_score = 0;
function updateScore(){
   const  playerScore = document.querySelector('.player-score p');
   const  computerScore = document.querySelector('.computer-score p');
   playerScore.textContent = player_score;
   computerScore.textContent = computer_score;
}