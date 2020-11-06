const question = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board')
const h2 = document.querySelector('h2')
const callFriend = document.querySelector('#callAFriend')

function fillQuestionElements(data) {
  if(data.winner === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'YOU WIN !!'
    return
  }
  if(data.looser === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'YOU LOOSE !!';
    return
  }
  question.innerText = data.question
 for (const i in data.answers) {
   const answerElement = document.querySelector(`#answer${Number(i) + 1}`)
   answerElement.innerText = data.answers[i]
 }

}

function showNextQuestion () {
  fetch('/question', {
    method: 'GET',
  })
  .then(res => res.json())
  .then(data =>{
    fillQuestionElements(data)
  })
}
showNextQuestion();

const goodAnswersSpan = document.querySelector('#good-answers')

function handleAnswerFeedback(data){
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex){
  fetch(`/answer/${answerIndex}`, {
    method: 'POST',
  })
  .then(res => res.json())
  .then(data =>{
    handleAnswerFeedback(data)
  })
}

const buttons = document.querySelectorAll('.answer-btn')

for( const button of buttons ) {
  button.addEventListener('click', (e) => {
   const answerIndex = e.target.dataset.answer
   sendAnswer(answerIndex)
  })
}


function callAFriend() {
  fetch('/help/friend', {
      method: 'GET',
  })
      .then(r => r.json())
      .then(data => {
         console.log(data)
      });
}

document.querySelector('#callAFriend').addEventListener('click', callAFriend);
