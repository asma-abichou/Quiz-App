import {QuizQuestion} from './QuizQuestion.js';

let actualQuestionIndex = parseInt(localStorage.getItem("actual_question"));

let question = new QuizQuestion(actualQuestionIndex);

question.getQuestionData(actualQuestionIndex + 1)
question.checkIfQuestionIsAnswered(actualQuestionIndex + 1)
question.countDownTimer()
question.enableButtonIfAnswerChecked()
question.confirmButtonClickEvent(actualQuestionIndex + 1)
question.moveToNextQuestion()
