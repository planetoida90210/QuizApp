const express = require('express');
const path = require('path')

const app = express();

const port = 3000

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})

app.use(express.static(
  path.join(__dirname, 'public')
))

let goodAnswers = 0;
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [
  {
    question: 'What is the best JavaScript framework for front-end?',
    answers: ['React', 'Angular', 'Vue', 'VanillaJS'],
    correctAnswer: 0
  },
  {
    question: 'What is the best JavaScript framework for back-end?',
    answers: ['Meteor', 'Next', 'Express', 'Koa'],
    correctAnswer: 1
  },
  {
    question: 'Which one of this is a JavaScript package manager?',
    answers: ['Node.js', 'TypeScript', 'npm', 'none'],
    correctAnswer: 2
  },
  {
    question: 'Who invented JavaScript?',
    answers: ['James Gosling', 'Bjarne Stroustrup', 'Brendan Eich', 'Graydon Hoare'],
    correctAnswer: 2
  },
]

app.get('/question', (req,res) => {
  if(goodAnswers === questions.length){
    res.json({
      winner: true,
    })
  } else {
    const nextQuestion = questions[goodAnswers];
    const {question, answers} = nextQuestion
    res.json({
      question, answers
    })
  }
})