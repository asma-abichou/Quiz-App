import {QuizQuestion} from './QuizQuestion.js';

let actualQuestionIndex = parseInt(localStorage.getItem("actual_question"));
let numberOfQuestion = localStorage.getItem('NumberOfQuestion');

let question = new QuizQuestion(actualQuestionIndex);
question.getQuestionData(actualQuestionIndex + 1)
question.checkIfQuestionIsAnswered(actualQuestionIndex + 1)
question.enableButtonIfAnswerChecked()
question.confirmButtonClickEvent(actualQuestionIndex + 1)

question.moveToNextQuestion()
/*question.moveToGetScore()*/

//
/*
When we click on next question button :
1- we remove the old question and replace it with the next question
2- we remove the old answers and replace it with the next answers
3- we hide the next Question button and show the confirm button
 */
